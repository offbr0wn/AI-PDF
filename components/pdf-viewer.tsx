"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Download,
  Copy,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Table,
  FileText,
  List,
} from "lucide-react"

type Document = {
  id: string
  name: string
  date: string
  size: string
  pages: number
  summary: string
}

type PdfViewerProps = {
  document: Document
}

export function PdfViewer({ document }: PdfViewerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [matches, setMatches] = useState<number[]>([])
  const [currentMatch, setCurrentMatch] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Sample parsed content - in a real app, this would come from your parsing service
  const parsedContent = {
    text: `# ${document.name}\n\nThis is the parsed content of the PDF document. The document contains ${document.pages} pages and was uploaded on ${document.date}.\n\n## Executive Summary\n\n${document.summary}\n\n## Additional Content\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.\n\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\n\n## Data Analysis\n\nThe analysis shows significant trends in the quarterly results. The first quarter showed a 15% increase in revenue compared to the previous year. The second quarter maintained this growth with an additional 12% increase.\n\n## Recommendations\n\n1. Continue the current marketing strategy which has shown positive results
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
  }

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setMatches([])
      setCurrentMatch(0)
      return
    }

    const content = contentRef.current
    if (!content) return

    // Clear previous highlights
    const oldHighlights = content.querySelectorAll(".bg-yellow-200")
    oldHighlights.forEach((el) => {
      const parent = el.parentNode
      if (parent) {
        parent.replaceChild(document.createTextNode(el.textContent || ""), el)
        parent.normalize()
      }
    })

    // Simple text search and highlight
    const text = content.innerHTML
    const regex = new RegExp(searchQuery, "gi")
    const newText = text.replace(regex, (match) => `<span class="bg-yellow-200">${match}</span>`)
    content.innerHTML = newText

    // Count matches
    const newHighlights = content.querySelectorAll(".bg-yellow-200")
    setMatches(Array.from({ length: newHighlights.length }, (_, i) => i + 1))
    setCurrentMatch(newHighlights.length > 0 ? 1 : 0)

    // Scroll to first match
    if (newHighlights.length > 0) {
      newHighlights[0].scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [searchQuery])

  // Navigate between search matches
  const navigateMatches = (direction: "next" | "prev") => {
    if (matches.length === 0) return

    let newMatch = currentMatch
    if (direction === "next") {
      newMatch = currentMatch === matches.length ? 1 : currentMatch + 1
    } else {
      newMatch = currentMatch === 1 ? matches.length : currentMatch - 1
    }
    setCurrentMatch(newMatch)

    const highlights = contentRef.current?.querySelectorAll(".bg-yellow-200")
    if (highlights && highlights.length > 0) {
      highlights[newMatch - 1].scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  // Handle zoom
  const handleZoom = (action: "in" | "out" | "reset") => {
    if (action === "in") {
      setZoomLevel((prev) => Math.min(prev + 10, 200))
    } else if (action === "out") {
      setZoomLevel((prev) => Math.max(prev - 10, 50))
    } else {
      setZoomLevel(100)
    }
  }

  // Handle page navigation
  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1)
    } else if (direction === "next" && currentPage < document.pages) {
      setCurrentPage((prev) => prev + 1)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold truncate max-w-[300px] sm:max-w-[500px]">{document.name}</h2>
          <p className="text-sm text-muted-foreground">
            {document.pages} pages • {document.size} • Uploaded on {document.date}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Copy Text
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search in document..."
            className="pl-8 pr-24"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {matches.length > 0 && (
            <div className="absolute right-2.5 top-2.5 text-xs text-muted-foreground">
              {currentMatch} of {matches.length}
            </div>
          )}
        </div>
        <Button variant="ghost" size="icon" disabled={matches.length === 0} onClick={() => navigateMatches("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" disabled={matches.length === 0} onClick={() => navigateMatches("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center justify-between bg-muted p-2 rounded-md">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled={currentPage === 1} onClick={() => handlePageChange("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {document.pages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            disabled={currentPage === document.pages}
            onClick={() => handlePageChange("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => handleZoom("out")} disabled={zoomLevel <= 50}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm w-16 text-center">{zoomLevel}%</span>
          <Button variant="ghost" size="icon" onClick={() => handleZoom("in")} disabled={zoomLevel >= 200}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleZoom("reset")}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="text">
        <TabsList>
          <TabsTrigger value="text">
            <FileText className="h-4 w-4 mr-2" />
            Text
          </TabsTrigger>
          <TabsTrigger value="tables">
            <Table className="h-4 w-4 mr-2" />
            Tables
          </TabsTrigger>
          <TabsTrigger value="forms">
            <List className="h-4 w-4 mr-2" />
            Forms
          </TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card>
            <CardContent className="p-6">
              <div ref={contentRef} className="prose max-w-none" style={{ fontSize: `${zoomLevel}%` }}>
                {parsedContent.text.split("\n\n").map((paragraph, index) => {
                  if (paragraph.startsWith("# ")) {
                    return (
                      <h1 key={index} className="text-2xl font-bold mt-0">
                        {paragraph.substring(2)}
                      </h1>
                    )
                  } else if (paragraph.startsWith("## ")) {
                    return (
                      <h2 key={index} className="text-xl font-bold mt-4">
                        {paragraph.substring(3)}
                      </h2>
                    )
                  } else if (paragraph.startsWith("1. ")) {
                    return (
                      <ol key={index} className="list-decimal pl-5 mt-2">
                        {paragraph.split("\n").map((item, i) => (
                          <li key={i} className="mt-1">
                            {item.substring(3)}
                          </li>
                        ))}
                      </ol>
                    )
                  } else {
                    return (
                      <p key={index} className="mt-2">
                        {paragraph}
                      </p>
                    )
                  }
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tables">
          <Card>
            <CardContent className="p-6">
              {parsedContent.tables.map((table, tableIndex) => (
                <div key={tableIndex} className="mb-8 last:mb-0">
                  <h3 className="text-lg font-medium mb-2">{table.title}</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-muted">
                          {table.headers.map((header, index) => (
                            <th key={index} className="border px-4 py-2 text-left">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-background" : "bg-muted/50"}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="border px-4 py-2">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardContent className="p-6">
              {parsedContent.forms.map((form, formIndex) => (
                <div key={formIndex} className="mb-8 last:mb-0">
                  <h3 className="text-lg font-medium mb-4">{form.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {form.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="border rounded-md p-3">
                        <div className="text-sm text-muted-foreground">{field.label}</div>
                        <div className="font-medium mt-1">{field.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
