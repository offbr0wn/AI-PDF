"use client"

import { useState, useEffect } from "react"
import { DocumentViewer } from "@/components/document-viewer"
import { DocumentsList } from "@/components/documents-list"
import { DocumentSkeleton } from "@/components/document-skeleton"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample document type
type Document = {
  id: string
  name: string
  date: string
  size: string
  pages: number
  summary: string
  status: "pending" | "processing" | "completed" | "failed"
  content: {
    text: string
    tables: Array<{
      title: string
      headers: string[]
      rows: string[][]
    }>
    forms: Array<{
      name: string
      fields: Array<{
        label: string
        value: string
      }>
    }>
  }
}

export function ResultsView() {
  // Sample documents data
  const documents: Document[] = [
    {
      id: "1",
      name: "Financial_Report_2025.pdf",
      date: "May 10, 2025",
      size: "2.4 MB",
      pages: 12,
      status: "completed",
      summary:
        "Annual financial report with quarterly breakdowns, profit and loss statements, and projections for 2026.",
      content: {
        text: `# Financial Report 2025\n\nThis is the parsed content of the PDF document. The document contains 12 pages and was uploaded on May 10, 2025.\n\n## Executive Summary\n\nAnnual financial report with quarterly breakdowns, profit and loss statements, and projections for 2026.\n\n## Additional Content\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.\n\n## Data Analysis\n\nThe analysis shows significant trends in the quarterly results. The first quarter showed a 15% increase in revenue compared to the previous year. The second quarter maintained this growth with an additional 12% increase.\n\n## Recommendations\n\n1. Continue the current marketing strategy which has shown positive results
2. Invest in expanding the product line based on customer feedback
3. Consider entering new markets in the upcoming fiscal year
4. Optimize the supply chain to reduce costs by approximately 8%`,
        tables: [
          {
            title: "Quarterly Financial Results",
            headers: ["Quarter", "Revenue", "Expenses", "Profit", "Growth"],
            rows: [
              ["Q1 2025", "$1,245,000", "$780,000", "$465,000", "+15%"],
              ["Q2 2025", "$1,390,000", "$810,000", "$580,000", "+12%"],
              ["Q3 2025", "$1,420,000", "$850,000", "$570,000", "+8%"],
              ["Q4 2025", "$1,550,000", "$920,000", "$630,000", "+10%"],
            ],
          },
        ],
        forms: [
          {
            name: "Document Approval Form",
            fields: [
              { label: "Document ID", value: "FIN-2025-Q4-001" },
              { label: "Approval Date", value: "April 28, 2025" },
              { label: "Approved By", value: "Jane Smith, CFO" },
              { label: "Department", value: "Finance" },
              { label: "Status", value: "Approved" },
            ],
          },
        ],
      },
    },
    {
      id: "2",
      name: "Contract_Agreement.pdf",
      date: "May 8, 2025",
      size: "1.8 MB",
      pages: 8,
      status: "processing",
      summary:
        "Legal contract between parties outlining terms, conditions, and obligations for the software licensing agreement.",
      content: {
        text: `# Contract Agreement\n\nThis is the parsed content of the PDF document. The document contains 8 pages and was uploaded on May 8, 2025.\n\n## Executive Summary\n\nLegal contract between parties outlining terms, conditions, and obligations for the software licensing agreement.\n\n## Additional Content\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.`,
        tables: [],
        forms: [],
      },
    },
    {
      id: "3",
      name: "Product_Specifications.pdf",
      date: "May 5, 2025",
      size: "3.2 MB",
      pages: 15,
      status: "pending",
      summary:
        "Technical specifications for product line including dimensions, materials, and manufacturing requirements.",
      content: {
        text: `# Product Specifications\n\nThis is the parsed content of the PDF document. The document contains 15 pages and was uploaded on May 5, 2025.\n\n## Executive Summary\n\nTechnical specifications for product line including dimensions, materials, and manufacturing requirements.`,
        tables: [],
        forms: [],
      },
    },
    {
      id: "4",
      name: "Meeting_Minutes.pdf",
      date: "May 3, 2025",
      size: "0.9 MB",
      pages: 4,
      status: "failed",
      summary: "Minutes from the quarterly board meeting discussing strategic initiatives and market expansion plans.",
      content: {
        text: `# Meeting Minutes\n\nThis is the parsed content of the PDF document. The document contains 4 pages and was uploaded on May 3, 2025.\n\n## Executive Summary\n\nMinutes from the quarterly board meeting discussing strategic initiatives and market expansion plans.`,
        tables: [],
        forms: [],
      },
    },
  ]

  const [currentDocumentId, setCurrentDocumentId] = useState(documents[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const currentDocument = documents.find((doc) => doc.id === currentDocumentId) || documents[0]

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Simulate loading when changing documents
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [currentDocumentId])

  // Close sidebar on mobile by default
  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isDesktop])

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-brand-secondary/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-brand-accent/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-8 relative z-10">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-gradient-ocean flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-ocean">Document Analysis</h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 ml-1">
            View and analyze your parsed PDF documents with advanced tools
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          {/* Main content - Document Viewer */}
          <div
            className={cn(
              "flex-1 transition-all duration-300 ease-in-out",
              sidebarOpen && isDesktop ? "lg:mr-[380px]" : "",
            )}
          >
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
              {isLoading ? (
                <DocumentSkeleton />
              ) : (
                <DocumentViewer document={currentDocument} status={currentDocument.status} />
              )}
            </div>
          </div>

          {/* Toggle sidebar button */}
          <Button
            variant="secondary"
            size="icon"
            className="fixed bottom-6 right-6 z-40 rounded-full h-12 w-12 shadow-lg lg:hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <ArrowRightFromLine className="h-5 w-5 text-brand-primary" />
            ) : (
              <ArrowLeftFromLine className="h-5 w-5 text-brand-primary" />
            )}
          </Button>

          {/* Desktop toggle button */}
          <Button
            variant="secondary"
            size="icon"
            className="fixed top-1/2 -translate-y-1/2 z-40 rounded-full h-12 w-12 shadow-lg hidden lg:flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ right: sidebarOpen ? "380px" : "0" }}
          >
            {sidebarOpen ? (
              <ArrowRightFromLine className="h-5 w-5 text-brand-primary" />
            ) : (
              <ArrowLeftFromLine className="h-5 w-5 text-brand-primary" />
            )}
          </Button>

          {/* Sidebar - Documents List */}
          <div
            className={cn(
              "fixed inset-y-0 right-0 z-30 w-[320px] sm:w-[380px] bg-white dark:bg-slate-800 shadow-xl border-l border-slate-200 dark:border-slate-700 transform transition-transform duration-300 ease-in-out pt-8",
              sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-[calc(100%-16px)]",
            )}
          >
            <DocumentsList
              documents={documents}
              currentDocumentId={currentDocumentId}
              onSelectDocument={(id) => {
                setCurrentDocumentId(id)
                if (!isDesktop) {
                  setSidebarOpen(false)
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
