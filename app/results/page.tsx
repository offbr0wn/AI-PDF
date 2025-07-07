"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { PDFViewer } from "@/components/pdf-viewer";
import { ReceiptDisplay } from "@/components/receipt-display";
import { FlightTicketDisplay } from "@/components/flight-ticket-display";
import { DocumentDisplay } from "@/components/document-display";
import { AISummary } from "@/components/ai-summary";
import { ProUpgradeModal } from "@/components/pro-upgrade-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Download,
  Share2,
  FileText,
  CheckCircle,
  Sparkles,
  Crown,
  Lock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ExportDropdown } from "@/components/export-dropdown";
import { UploadHistory } from "@/components/upload-history";
import { GetDocumentByIdQuery } from "@/hooks/tanstack-hooks";

// Mock user data - in real app this would come from auth context
const mockUser = {
  id: "user_123",
  name: "John Doe",
  email: "john@example.com",
  plan: "pro", // Changed to "pro" to show Pro experience
  documentsProcessed: 47,
  monthlyLimit: null, // Unlimited for Pro
  upgradeDate: "2025-01-01T00:00:00Z",
};

// Mock data for different document types
const mockDocuments = {
  receipt: {
    id: "pdf_receipt_123",
    filename: "grocery_receipt_2025.pdf",
    uploadDate: "2025-01-06T10:30:00Z",
    size: "9.63 KB",
    pages: 1,
    status: "completed",
    type: "receipt",
    previewImage: "/placeholder.svg?height=200&width=150",
    metadata: {
      merchant: {
        name: "Fresh Market Grocery",
        address: "123 Main Street, New York City, NY 10012",
        phone: "(555) 867-5309",
        email: "info@freshmarket.com",
      },
      transaction: {
        date: "2025-01-06",
        time: "10:30:00",
        amount: 47.83,
        currency: "USD",
        paymentMethod: "Credit Card",
        transactionId: "TXN123456789",
      },
      items: [
        {
          name: "Organic Bananas",
          quantity: 2,
          price: 3.99,
          category: "Produce",
        },
        { name: "Whole Milk", quantity: 1, price: 4.29, category: "Dairy" },
        {
          name: "Bread - Whole Wheat",
          quantity: 1,
          price: 2.99,
          category: "Bakery",
        },
        {
          name: "Chicken Breast",
          quantity: 1.5,
          price: 12.99,
          category: "Meat",
        },
        { name: "Tomatoes", quantity: 3, price: 5.97, category: "Produce" },
        { name: "Olive Oil", quantity: 1, price: 8.99, category: "Pantry" },
        { name: "Greek Yogurt", quantity: 2, price: 6.98, category: "Dairy" },
      ],
      tax: 3.83,
      subtotal: 44.0,
    },
    aiSummary: {
      overview:
        "This grocery receipt from Fresh Market Grocery shows a well-balanced shopping trip focused on healthy, fresh ingredients. The total spending of $47.83 reflects typical weekly grocery expenses for 1-2 people.",
      keyInsights: [
        "Strong emphasis on fresh produce and dairy products (47% of total spending)",
        "Organic and premium product choices indicate health-conscious shopping",
        "Balanced nutrition across all major food groups",
        "Spending pattern suggests meal planning and home cooking",
      ],
      recommendations: [
        "Consider buying bananas in larger quantities for better value",
        "Look for seasonal produce to reduce costs",
        "Your protein-to-produce ratio is excellent for a balanced diet",
      ],
      categoryBreakdown: {
        Produce: 22,
        Dairy: 25,
        Meat: 29,
        Pantry: 20,
        Bakery: 4,
      },
    },
  },
  flight: {
    id: "pdf_flight_124",
    filename: "boarding_pass_AA1234.pdf",
    uploadDate: "2025-01-05T14:20:00Z",
    size: "2.1 MB",
    pages: 1,
    status: "completed",
    type: "flight_ticket",
    previewImage: "/placeholder.svg?height=200&width=300",
    metadata: {
      passenger: {
        name: "John Smith",
        confirmationCode: "ABC123",
        frequentFlyer: "AA1234567",
      },
      flight: {
        airline: "American Airlines",
        flightNumber: "AA1234",
        aircraft: "Boeing 737-800",
        date: "2025-01-15",
        departure: {
          airport: "JFK",
          city: "New York",
          time: "08:30",
          gate: "B12",
          terminal: "4",
        },
        arrival: {
          airport: "LAX",
          city: "Los Angeles",
          time: "11:45",
          gate: "C7",
          terminal: "6",
        },
        duration: "5h 15m",
        class: "Economy",
        seat: "14A",
      },
      booking: {
        pnr: "XYZ789",
        ticketNumber: "0012345678901",
        price: 299.99,
        currency: "USD",
      },
    },
    aiSummary: {
      overview:
        "Cross-country flight from New York to Los Angeles with American Airlines. This is a popular business route with good timing for both departure and arrival.",
      keyInsights: [
        "Morning departure (8:30 AM) allows for full day arrival in LA",
        "Window seat (14A) provides great views during transcontinental flight",
        "Boeing 737-800 is a reliable aircraft for this route",
        "Price of $299.99 is competitive for this route and timing",
      ],
      recommendations: [
        "Arrive at JFK Terminal 4 at least 2 hours before departure",
        "Consider TSA PreCheck for faster security screening",
        "Bring entertainment for 5+ hour flight duration",
        "Stay hydrated during long flight",
      ],
      travelTips: [
        "JFK Terminal 4 has excellent dining options if you arrive early",
        "LAX Terminal 6 can be busy - allow extra time for ground transportation",
        "Time zone change: arrive 3 hours earlier local time",
      ],
    },
  },
  document: {
    id: "pdf_doc_125",
    filename: "financial_report_2025.pdf",
    uploadDate: "2025-01-04T09:15:00Z",
    size: "2.4 MB",
    pages: 12,
    status: "completed",
    type: "document",
    previewImage: "/placeholder.svg?height=200&width=150",
    metadata: {
      title: "Annual Financial Report 2025",
      author: "Finance Department",
      subject: "Company Financial Performance",
      keywords: ["finance", "annual report", "revenue", "expenses"],
      creationDate: "2025-01-04",
      modificationDate: "2025-01-04",
      producer: "Microsoft Word",
      creator: "John Doe",
    },
    aiSummary: {
      overview:
        "Comprehensive annual financial report containing 12 pages of detailed financial analysis and performance metrics. The document appears to be professionally prepared by the Finance Department.",
      keyInsights: [
        "Document contains structured financial data and analysis",
        "Professional formatting suggests board-level presentation",
        "Keywords indicate focus on revenue and expense analysis",
        "Recent creation date suggests current financial period reporting",
      ],
      recommendations: [
        "Consider adding executive summary for quick overview",
        "Ensure all financial data is properly audited",
        "Add visual charts for better data presentation",
      ],
      documentStructure: [
        "Executive Summary",
        "Revenue Analysis",
        "Expense Breakdown",
        "Profit & Loss Statement",
        "Future Projections",
      ],
    },
  },
};

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [currentDocument, setCurrentDocument] = useState(mockDocuments.receipt);
  const [documentId, setDocumentId] = useState("");
  const [showProModal, setShowProModal] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const { data } = GetDocumentByIdQuery(documentId);

  useEffect(() => {
    // Check if user has access to results page
    if (mockUser.plan === "pro") {
      setHasAccess(true);
    } else {
      // Free users get limited access or need to upgrade
      if (mockUser.documentsProcessed >= mockUser?.monthlyLimit) {
        setShowProModal(true);
      } else {
        setHasAccess(true);
      }
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getDocumentTypeDisplay = (type: string) => {
    switch (type) {
      case "receipt":
        return {
          label: "Receipt",
          color: "bg-green-100 text-green-700 border-green-200",
        };
      case "flight_ticket":
        return {
          label: "Flight Ticket",
          color: "bg-blue-100 text-blue-700 border-blue-200",
        };
      case "document":
        return {
          label: "Document",
          color: "bg-purple-100 text-purple-700 border-purple-200",
        };
      default:
        return {
          label: "Unknown",
          color: "bg-gray-100 text-gray-700 border-gray-200",
        };
    }
  };

  const isPro = mockUser.plan === "pro";

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-pink-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Processing your document...
              </h3>
              <p className="text-sm text-slate-600">
                Analyzing content and extracting information
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-pink-50">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-lg mx-4">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Upgrade to Pro Required
              </h3>
              <p className="text-slate-600 mb-6">
                You&apos;ve reached your monthly limit of{" "}
                {mockUser.monthlyLimit} documents. Upgrade to Pro for unlimited
                processing and advanced AI insights.
              </p>
              <Button
                onClick={() => setShowProModal(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white gap-2"
              >
                <Crown className="h-4 w-4" />
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const documentType = getDocumentTypeDisplay(data?.documentType);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-pink-50">
      <Header />

      <main className="flex-1 container py-6">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Upload
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-slate-800">
                  {currentDocument.type === "receipt" && "Receipt Analysis"}
                  {currentDocument.type === "flight_ticket" &&
                    "Flight Information"}
                  {currentDocument.type === "document" && "Document Analysis"}
                </h1>
                <Badge variant="secondary" className={documentType.color}>
                  {documentType.label}
                </Badge>
                {isPro && (
                  <Badge
                    variant="secondary"
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-none"
                  >
                    <Crown className="h-3 w-3 mr-1" />
                    Pro
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600">
                Processed on{" "}
                {new Date(currentDocument.uploadDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 border-green-200"
            >
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            {isPro ? (
              <ExportDropdown documentData={currentDocument} />
            ) : (
              <Button
                size="sm"
                className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
              >
                <Download className="h-4 w-4" />
                Export Data
              </Button>
            )}
          </div>
        </div>

        {/* Pro Features Banner for Free Users */}
        {!isPro && (
          <Card className="mb-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Crown className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Unlock Advanced AI Insights
                    </h3>
                    <p className="text-sm text-slate-600">
                      Get detailed AI summaries, recommendations, and unlimited
                      document processing with Pro
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => setShowProModal(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white gap-2"
                >
                  <Crown className="h-4 w-4" />
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Document Type Switcher for Demo */}
        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-slate-700">
                Demo Document Types:
              </span>
              <div className="flex gap-2">
                <Button
                  variant={
                    currentDocument.type === "receipt" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCurrentDocument(mockDocuments.receipt)}
                >
                  Receipt
                </Button>
                <Button
                  variant={
                    currentDocument.type === "flight_ticket"
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() => setCurrentDocument(mockDocuments.flight)}
                >
                  Flight Ticket
                </Button>
                <Button
                  variant={
                    currentDocument.type === "document" ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCurrentDocument(mockDocuments.document)}
                >
                  Document
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Document Content Section */}
          <div className="xl:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="content"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  PDF Content
                </TabsTrigger>
                <TabsTrigger
                  value="raw"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  Raw Data
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
                >
                  <div className="flex items-center gap-1">
                    AI Insights
                    {!isPro && <Lock className="h-3 w-3" />}
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* File Info and Preview */}
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        File Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* PDF Preview */}
                      <div className="text-center">
                        <div className="relative mx-auto w-32 h-40 bg-slate-100 rounded-lg border-2 border-slate-200 overflow-hidden">
                          <Image
                            src={
                              currentDocument.previewImage || "/placeholder.svg"
                            }
                            alt="PDF Preview"
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                            <FileText className="h-8 w-8 text-slate-600" />
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 w-full"
                        >
                          View Full PDF
                        </Button>
                      </div>

                      {/* Metadata */}
                      <div className="space-y-3 pt-4 border-t border-slate-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Filename:</span>
                          <span className="font-medium text-slate-800 truncate ml-2">
                            {currentDocument.filename}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Size:</span>
                          <span className="font-medium text-slate-800">
                            {currentDocument.size}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Pages:</span>
                          <span className="font-medium text-slate-800">
                            {currentDocument.pages}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Uploaded:</span>
                          <span className="font-medium text-slate-800">
                            {new Date(
                              currentDocument.uploadDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Type:</span>
                          <Badge
                            variant="secondary"
                            className={`${documentType.color} text-xs`}
                          >
                            {documentType.label}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Document-specific content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* AI Summary - Always visible but with different content based on plan */}
                    <AISummary
                      data={currentDocument.aiSummary}
                      isPro={isPro}
                      onUpgrade={() => setShowProModal(true)}
                    />

                    {/* Document Details */}
                    {currentDocument.type === "receipt" && (
                      <ReceiptDisplay data={currentDocument.metadata} />
                    )}
                    {currentDocument.type === "flight_ticket" && (
                      <FlightTicketDisplay data={currentDocument.metadata} />
                    )}
                    {currentDocument.type === "document" && (
                      <DocumentDisplay data={currentDocument.metadata} />
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="content" className="mt-4">
                <PDFViewer filename={currentDocument.filename} />
              </TabsContent>

              <TabsContent value="raw" className="mt-4">
                <Card className="bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Raw Extracted Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                      <pre className="text-sm text-slate-700 font-mono">
                        {JSON.stringify(currentDocument.metadata, null, 2)}
                      </pre>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        Download JSON
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="mt-4">
                {isPro ? (
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        Advanced AI Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {currentDocument.type === "receipt" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">
                                Spending Analysis
                              </h4>
                              <p className="text-blue-700 text-sm">
                                This grocery receipt shows a balanced shopping
                                pattern with emphasis on fresh produce and dairy
                                products. Total spending of $47.83 is within
                                typical grocery budget ranges.
                              </p>
                            </div>
                            <div className="p-4 bg-green-50 rounded-lg">
                              <h4 className="font-semibold text-green-800 mb-2">
                                Category Breakdown
                              </h4>
                              <p className="text-green-700 text-sm">
                                Produce (22%), Dairy (25%), Meat (29%), Pantry
                                (20%), Bakery (4%). Good balance of food groups.
                              </p>
                            </div>
                          </div>
                        )}
                        {currentDocument.type === "flight_ticket" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">
                                Flight Summary
                              </h4>
                              <p className="text-blue-700 text-sm">
                                Cross-country flight from New York to Los
                                Angeles. Morning departure with comfortable
                                arrival time. Economy class booking with window
                                seat preference.
                              </p>
                            </div>
                            <div className="p-4 bg-purple-50 rounded-lg">
                              <h4 className="font-semibold text-purple-800 mb-2">
                                Travel Tips
                              </h4>
                              <p className="text-purple-700 text-sm">
                                5+ hour flight duration suggests bringing
                                entertainment. Early morning departure
                                recommended to arrive at airport 2 hours prior.
                              </p>
                            </div>
                          </div>
                        )}
                        {currentDocument.type === "document" && (
                          <div className="space-y-3">
                            <div className="p-4 bg-blue-50 rounded-lg">
                              <h4 className="font-semibold text-blue-800 mb-2">
                                Document Analysis
                              </h4>
                              <p className="text-blue-700 text-sm">
                                This appears to be a comprehensive financial
                                report with 12 pages of detailed analysis.
                                Created by the Finance Department for annual
                                review purposes.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">
                        Pro Feature
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Advanced AI insights are available for Pro users. Get
                        detailed analysis, recommendations, and smart
                        categorization.
                      </p>
                      <Button
                        onClick={() => setShowProModal(true)}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white gap-2"
                      >
                        <Crown className="h-4 w-4" />
                        Upgrade to Pro
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* History Sidebar */}
          <div className="xl:col-span-1">
            <UploadHistory
              currentFileId={currentDocument.id}
              setCurrentFileId={setDocumentId}
            />
          </div>
        </div>
      </main>

      {/* Pro Upgrade Modal */}
      <ProUpgradeModal
        isOpen={showProModal}
        onClose={() => setShowProModal(false)}
        onUpgrade={() => {
          // Handle upgrade logic
          setShowProModal(false);
          // In real app, this would redirect to payment or update user plan
        }}
      />
    </div>
  );
}
