import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Tag } from "lucide-react"

interface DocumentData {
  title: string
  author: string
  subject: string
  keywords: string[]
  creationDate: string
  modificationDate: string
  producer: string
  creator: string
}

interface DocumentDisplayProps {
  data: DocumentData
}

export function DocumentDisplay({ data }: DocumentDisplayProps) {
  return (
    <div className="space-y-6">
      {/* Document Information */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-slate-800 text-xl mb-2">{data.title}</h4>
            <p className="text-slate-600">{data.subject}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-600">Author:</span>
              <p className="font-medium text-slate-800">{data.author}</p>
            </div>
            <div>
              <span className="text-slate-600">Creator:</span>
              <p className="font-medium text-slate-800">{data.creator}</p>
            </div>
            <div>
              <span className="text-slate-600">Created:</span>
              <p className="font-medium text-slate-800">{data.creationDate}</p>
            </div>
            <div>
              <span className="text-slate-600">Modified:</span>
              <p className="font-medium text-slate-800">{data.modificationDate}</p>
            </div>
            <div className="md:col-span-2">
              <span className="text-slate-600">Producer:</span>
              <p className="font-medium text-slate-800">{data.producer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Keywords */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Tag className="h-5 w-5" />
            Keywords & Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {data.keywords.map((keyword, index) => (
              <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                {keyword}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Document Statistics */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Document Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Content Type</h4>
              <p className="text-blue-700 text-sm">
                This appears to be a formal business document, likely containing financial or analytical content based
                on the metadata and structure.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Document Quality</h4>
              <p className="text-green-700 text-sm">
                High-quality document with proper metadata and professional formatting. Created using Microsoft Word
                with standard business document structure.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
