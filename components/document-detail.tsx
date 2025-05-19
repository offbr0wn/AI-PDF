"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, Copy, FileText } from "lucide-react"

type DocumentDetailProps = {
  documentId: string
}

export function DocumentDetail({ documentId }: DocumentDetailProps) {
  // Sample document data - in a real app, fetch this data based on the ID
  const document = {
    id: documentId,
    name: "Receipt from Example, LLC",
    date: "2025-03-18",
    uploadedDate: "18/03/2025, 13:44:33",
    size: "9.63 KB",
    type: "application/pdf",
    pages: 1,
    status: "Processed",
    uniqueId: "j977nekkb7...",
    merchant: {
      name: "Example, LLC",
      address: "123 Fake Street, New York City, NY 10012",
      contact: "(555) 867-5309",
    },
    transaction: {
      date: "2024-03-25",
      amount: "20.12 USD",
      items: [
        { name: "Product A", quantity: 1, price: "15.99 USD" },
        { name: "Service Fee", quantity: 1, price: "4.13 USD" },
      ],
      subtotal: "15.99 USD",
      tax: "4.13 USD",
      total: "20.12 USD",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/results" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back to Receipts
          </Link>
        </div>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-semibold">{document.name}</h1>
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {document.status}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - File information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-lg font-medium mb-4">File Information</h2>
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Uploaded</p>
                    <p>{document.uploadedDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p>{document.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p>{document.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ID</p>
                    <p className="truncate">{document.uniqueId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-lg font-medium mb-4">Receipt Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-base font-medium text-muted-foreground mb-4">Merchant Information</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Name</p>
                        <p className="font-medium">{document.merchant.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p>{document.merchant.address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contact</p>
                        <p>{document.merchant.contact}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-base font-medium text-muted-foreground mb-4">Transaction Details</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-medium">{document.transaction.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Amount</p>
                        <p className="font-medium">{document.transaction.amount}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-base font-medium flex items-center gap-1">
                    <span className="text-primary">✨</span> AI Summary
                  </h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy summary</span>
                  </Button>
                </div>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted-foreground"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h3 className="text-base font-medium">AI summary is a PRO level feature</h3>
                  <div className="mt-4">
                    <Button variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Upgrade to Unlock
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - PDF preview */}
          <div>
            <Card className="text-center">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="p-6">
                  <FileText className="h-16 w-16 text-blue-500 mx-auto" />
                </div>
                <h3 className="text-base font-medium mb-2">PDF Preview</h3>
                <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full mt-4">View PDF</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
