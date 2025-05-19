"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FileText, Search, Calendar, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

type Document = {
  id: string
  name: string
  date: string
  size: string
  pages: number
  summary: string
}

type PreviousDocumentsProps = {
  documents: Document[]
  currentDocumentId: string
  onSelectDocument: (id: string) => void
}

export function PreviousDocuments({ documents, currentDocumentId, onSelectDocument }: PreviousDocumentsProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold mb-2">Previous Documents</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search documents..." className="pl-8" />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {documents.map((doc) => (
            <Button
              key={doc.id}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left h-auto p-3 space-y-1",
                doc.id === currentDocumentId ? "bg-muted" : "",
              )}
              onClick={() => onSelectDocument(doc.id)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="bg-muted rounded-md p-2 shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{doc.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{doc.date}</span>
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    <span>{doc.pages} pages</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{doc.summary}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t text-center">
        <p className="text-sm text-muted-foreground">Showing {documents.length} documents</p>
      </div>
    </div>
  )
}
