"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  FileText,
  Calendar,
  Clock,
  ArrowUpDown,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Loader2,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Document = {
  id: string
  name: string
  date: string
  size: string
  pages: number
  summary: string
  status: "pending" | "processing" | "completed" | "failed"
}

type DocumentsListProps = {
  documents: Document[]
  currentDocumentId: string
  onSelectDocument: (id: string) => void
}

export function DocumentsList({ documents, currentDocumentId, onSelectDocument }: DocumentsListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "name">("date")

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  // Render status icon
  const renderStatusIcon = (status: "pending" | "processing" | "completed" | "failed") => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-status-pending" />
      case "processing":
        return <Loader2 className="h-4 w-4 text-status-processing animate-spin" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-status-completed" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-status-failed" />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 md:px-8 pb-4 bg-linear-to-r from-white to-brand-primary/5 dark:from-slate-800 dark:to-brand-primary/10 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg bg-gradient-ocean flex items-center justify-center shadow-md">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Documents</h2>
        </div>
        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-brand-primary/60" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-9 border-slate-300 dark:border-slate-600 focus-visible:ring-brand-primary/30 focus-visible:border-brand-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs border-slate-300 dark:border-slate-600",
                sortBy === "date"
                  ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20 dark:bg-brand-primary/20 dark:text-brand-primary/90 dark:border-brand-primary/30"
                  : "",
              )}
              onClick={() => setSortBy("date")}
            >
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Date
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "h-8 text-xs border-slate-300 dark:border-slate-600",
                sortBy === "name"
                  ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20 dark:bg-brand-primary/20 dark:text-brand-primary/90 dark:border-brand-primary/30"
                  : "",
              )}
              onClick={() => setSortBy("name")}
            >
              <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
              Name
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="h-8 text-xs text-brand-primary dark:text-brand-primary/90">
            <Filter className="h-3.5 w-3.5 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 md:px-6">
        <div className="space-y-3 pr-2 py-4">
          {sortedDocuments.length > 0 ? (
            sortedDocuments.map((doc) => (
              <div
                key={doc.id}
                className={cn(
                  "group rounded-xl border transition-all duration-200 cursor-pointer overflow-hidden",
                  doc.id === currentDocumentId
                    ? "border-brand-primary/30 dark:border-brand-primary/50 bg-brand-primary/5 dark:bg-brand-primary/10 shadow-md"
                    : "border-slate-200 dark:border-slate-700 hover:border-brand-primary/20 dark:hover:border-brand-primary/30 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                )}
                onClick={() => onSelectDocument(doc.id)}
              >
                <div className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "rounded-lg p-2 shrink-0 transition-colors",
                        doc.id === currentDocumentId
                          ? "bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary dark:text-brand-primary/90"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:bg-brand-primary/5 dark:group-hover:bg-brand-primary/10 group-hover:text-brand-primary dark:group-hover:text-brand-primary/90",
                      )}
                    >
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-slate-900 dark:text-white truncate">{doc.name}</div>
                        <div className="ml-2 shrink-0">{renderStatusIcon(doc.status)}</div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{doc.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{doc.pages} pages</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">{doc.summary}</p>
                    </div>
                  </div>
                </div>
                {doc.id === currentDocumentId && (
                  <div className="h-1 bg-gradient-ocean animate-shimmer bg-size-[200%_100%]"></div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <FileText className="h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-medium text-slate-900 dark:text-white">No documents found</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {searchQuery ? "Try a different search term" : "Upload a document to get started"}
              </p>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? "s" : ""}
          </span>
          <Badge variant="outline" className="bg-gradient-ocean text-white border-none font-medium shadow-sm">
            PDF Parser Pro
          </Badge>
        </div>
      </div>
    </div>
  )
}
