"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Calendar,
  FileIcon,
  Layers,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Loader2,
} from "lucide-react"

type Document = {
  id: string
  name: string
  date: string
  size: string
  pages: number
  summary: string
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

type DocumentViewerProps = {
  document: Document
  status: "pending" | "processing" | "completed" | "failed"
}

export function DocumentViewer({ document, status }: DocumentViewerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(100)
  const [matches, setMatches] = useState<number[]>([])
  const [currentMatch, setCurrentMatch] = useState(0)
  const [progress, setProgress] = useState(0)
  const contentRef = useRef<HTMLDivElement>(null)

  // Simulate progress for processing documents
  useEffect(() => {
    if (status === "processing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 5
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [status])

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
    const newText = text.replace(
      regex,
      (match) =>
        `<span class="bg-brand-yellow/30 dark:bg-brand-yellow/20 dark:text-white px-1 rounded">${match}</span>`,
    )
    content.innerHTML = newText

    // Count matches
    const newHighlights = content.querySelectorAll(".bg-brand-yellow\\/30, .dark\\:bg-brand-yellow\\/20")
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

    const highlights = contentRef.current?.querySelectorAll(".bg-brand-yellow\\/30, .dark\\:bg-brand-yellow\\/20")
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

  // Render status badge
  const renderStatusBadge = () => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-status-pending/10 text-status-pending border-status-pending/20 dark:bg-status-pending/20 dark:text-status-pending/90 dark:border-status-pending/30 flex items-center gap-1"
          >
            <Clock className="h-3 w-3" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge
            variant="outline"
            className="bg-status-processing/10 text-status-processing border-status-processing/20 dark:bg-status-processing/20 dark:text-status-processing/90 dark:border-status-processing/30 flex items-center gap-1"
          >
            <Loader2 className="h-3 w-3 animate-spin" />
            Processing
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-status-completed/10 text-status-completed border-status-completed/20 dark:bg-status-completed/20 dark:text-status-completed/90 dark:border-status-completed/30 flex items-center gap-1"
          >
            <CheckCircle2 className="h-3 w-3" />
            Completed
          </Badge>
        )
      case "failed":
        return (
          <Badge
            variant="outline"
            className="bg-status-failed/10 text-status-failed border-status-failed/20 dark:bg-status-failed/20 dark:text-status-failed/90 dark:border-status-failed/30 flex items-center gap-1"
          >
            <AlertTriangle className="h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return null
    }
  }

  // Render content based on status
  const renderContent = () => {
    switch (status) {
      case "pending":
        return (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-status-pending/20 flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-status-pending" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Document Pending Processing</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mb-6">
              This document is in the queue and will be processed shortly. Processing typically takes 1-2 minutes
              depending on document size and complexity.
            </p>
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">Process Now</Button>
          </div>
        )
      case "processing":
        return (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-status-processing/20 flex items-center justify-center mb-6">
              <Loader2 className="h-8 w-8 text-status-processing animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Processing Document</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mb-6">
              We're currently extracting and analyzing the content from your document. This should only take a moment.
            </p>
            <div className="w-full max-w-md mb-2">
              <Progress value={progress} className="h-2" />
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">{progress}% complete</p>
          </div>
        )
      case "failed":
        return (
          <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-status-failed/20 flex items-center justify-center mb-6">
              <AlertTriangle className="h-8 w-8 text-status-failed" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Processing Failed</h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-md mb-6">
              We encountered an error while processing this document. This could be due to file corruption, password
              protection, or unsupported content.
            </p>
            <div className="flex gap-3">
              <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white">Try Again</Button>
              <Button variant="outline" className="border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5">
                View Details
              </Button>
            </div>
          </div>
        )
      case "completed":
        return (
          <>
            {/* Content tabs */}
            <Tabs defaultValue="text" className="flex-1">
              <TabsList className="p-0 h-12 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 rounded-none">
                <TabsTrigger
                  value="text"
                  className="flex-1 h-12 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:border-b-2 data-[state=active]:border-brand-primary data-[state=active]:shadow-none"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Text
                </TabsTrigger>
                <TabsTrigger
                  value="tables"
                  className="flex-1 h-12 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:border-b-2 data-[state=active]:border-brand-primary data-[state=active]:shadow-none"
                >
                  <Table className="h-4 w-4 mr-2" />
                  Tables
                </TabsTrigger>
                <TabsTrigger
                  value="forms"
                  className="flex-1 h-12 rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:border-b-2 data-[state=active]:border-brand-primary data-[state=active]:shadow-none"
                >
                  <List className="h-4 w-4 mr-2" />
                  Forms
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="m-0 p-0 flex-1">
                <div className="p-6 md:p-8 bg-white dark:bg-slate-800 h-[calc(100vh-280px)] overflow-auto">
                  <div
                    ref={contentRef}
                    className="prose dark:prose-invert max-w-none"
                    style={{ fontSize: `${zoomLevel}%` }}
                  >
                    {document.content.text.split("\n\n").map((paragraph, index) => {
                      if (paragraph.startsWith("# ")) {
                        return (
                          <h1 key={index} className="text-2xl font-bold mt-0 text-slate-900 dark:text-white">
                            {paragraph.substring(2)}
                          </h1>
                        )
                      } else if (paragraph.startsWith("## ")) {
                        return (
                          <h2 key={index} className="text-xl font-bold mt-6 text-slate-800 dark:text-slate-100">
                            {paragraph.substring(3)}
                          </h2>
                        )
                      } else if (paragraph.startsWith("1. ")) {
                        return (
                          <ol key={index} className="list-decimal pl-5 mt-4 text-slate-700 dark:text-slate-300">
                            {paragraph.split("\n").map((item, i) => (
                              <li key={i} className="mt-1">
                                {item.substring(3)}
                              </li>
                            ))}
                          </ol>
                        )
                      } else {
                        return (
                          <p key={index} className="mt-4 text-slate-700 dark:text-slate-300">
                            {paragraph}
                          </p>
                        )
                      }
                    })}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tables" className="m-0 p-0 flex-1">
                <div className="p-6 md:p-8 bg-white dark:bg-slate-800 h-[calc(100vh-280px)] overflow-auto">
                  {document.content.tables.length > 0 ? (
                    document.content.tables.map((table, tableIndex) => (
                      <div key={tableIndex} className="mb-8 last:mb-0">
                        <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white">{table.title}</h3>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-brand-primary/5 dark:bg-brand-primary/20">
                                {table.headers.map((header, index) => (
                                  <th
                                    key={index}
                                    className="border-b border-slate-200 dark:border-slate-600 px-4 py-3 text-left text-sm font-medium text-brand-primary dark:text-brand-primary/90"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rowIndex) => (
                                <tr
                                  key={rowIndex}
                                  className={
                                    rowIndex % 2 === 0
                                      ? "bg-white dark:bg-slate-800"
                                      : "bg-slate-50 dark:bg-slate-700/30"
                                  }
                                >
                                  {row.map((cell, cellIndex) => (
                                    <td
                                      key={cellIndex}
                                      className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 text-sm text-slate-700 dark:text-slate-300"
                                    >
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <Table className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">No tables found</h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                        This document doesn't contain any tables or they couldn't be extracted.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="forms" className="m-0 p-0 flex-1">
                <div className="p-6 md:p-8 bg-white dark:bg-slate-800 h-[calc(100vh-280px)] overflow-auto">
                  {document.content.forms.length > 0 ? (
                    document.content.forms.map((form, formIndex) => (
                      <div key={formIndex} className="mb-8 last:mb-0">
                        <h3 className="text-lg font-medium mb-4 text-slate-900 dark:text-white flex items-center gap-2">
                          {form.name}
                          <Badge
                            variant="outline"
                            className="ml-2 bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20 dark:bg-brand-secondary/20 dark:text-brand-secondary/90 dark:border-brand-secondary/30"
                          >
                            Form
                          </Badge>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {form.fields.map((field, fieldIndex) => (
                            <div
                              key={fieldIndex}
                              className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50"
                            >
                              <div className="text-sm text-slate-500 dark:text-slate-400">{field.label}</div>
                              <div className="font-medium mt-1 text-slate-900 dark:text-white">{field.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center py-12">
                      <List className="h-12 w-12 text-slate-300 dark:text-slate-600 mb-4" />
                      <h3 className="text-lg font-medium text-slate-900 dark:text-white">No forms found</h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-1 max-w-md">
                        This document doesn't contain any forms or they couldn't be extracted.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      {/* Document header */}
      <div className="p-6 md:p-8 border-b border-slate-200 dark:border-slate-700 bg-linear-to-r from-white to-brand-primary/5 dark:from-slate-800 dark:to-brand-primary/10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-ocean flex items-center justify-center shadow-md">
              <FileIcon className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-[300px]">
                  {document.name}
                </h2>
                {renderStatusBadge()}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mt-1">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{document.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Layers className="h-3.5 w-3.5" />
                  <span>{document.pages} pages</span>
                </div>
                <div>{document.size}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5 disabled:opacity-50"
              disabled={status !== "completed"}
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 sm:flex-none border-brand-primary/20 text-brand-primary hover:bg-brand-primary/5 disabled:opacity-50"
              disabled={status !== "completed"}
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy Text
            </Button>
          </div>
        </div>
      </div>

      {/* Search bar - only show for completed documents */}
      {status === "completed" && (
        <>
          <div className="p-4 md:px-8 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-primary/60" />
                <Input
                  type="search"
                  placeholder="Search in document..."
                  className="pl-9 pr-24 border-slate-300 dark:border-slate-600 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {matches.length > 0 && (
                  <div className="absolute right-3 top-2.5 text-xs bg-brand-primary/10 dark:bg-brand-primary/20 px-2 py-0.5 rounded text-brand-primary dark:text-brand-primary/90">
                    {currentMatch} of {matches.length}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                disabled={matches.length === 0}
                onClick={() => navigateMatches("prev")}
                className="text-brand-primary dark:text-brand-primary/90 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                disabled={matches.length === 0}
                onClick={() => navigateMatches("next")}
                className="text-brand-primary dark:text-brand-primary/90 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Page navigation and zoom controls - only show for completed documents */}
          <div className="p-2 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => handlePageChange("prev")}
                className="h-8 w-8 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                Page {currentPage} of {document.pages}
              </span>
              <Button
                variant="ghost"
                size="icon"
                disabled={currentPage === document.pages}
                onClick={() => handlePageChange("next")}
                className="h-8 w-8 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom("out")}
                disabled={zoomLevel <= 50}
                className="h-8 w-8 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm w-14 text-center text-slate-600 dark:text-slate-300">{zoomLevel}%</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom("in")}
                disabled={zoomLevel >= 200}
                className="h-8 w-8 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleZoom("reset")}
                className="h-8 w-8 text-slate-600 dark:text-slate-300 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
              >
                <RotateCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Render content based on status */}
      {renderContent()}
    </div>
  )
}
