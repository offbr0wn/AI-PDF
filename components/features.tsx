import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileSearch, FileText, Table, Download, Search, Zap } from "lucide-react"

export function Features() {
  return (
    <section className="py-16 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-white z-0"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-3">Powerful PDF parsing features</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Extract and analyze data from your PDF documents with our advanced parsing tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-200 transition-colors">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-gray-900">Text Extraction</CardTitle>
              <CardDescription className="text-gray-500">
                Extract all text content from your PDF documents with high accuracy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our advanced OCR technology ensures accurate text extraction even from scanned documents and images.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-3 group-hover:bg-teal-200 transition-colors">
                <Table className="h-6 w-6 text-teal-600" />
              </div>
              <CardTitle className="text-gray-900">Table Recognition</CardTitle>
              <CardDescription className="text-gray-500">
                Automatically detect and extract tables from your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Convert tables from PDFs into structured data formats like CSV, Excel, or JSON for further analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-3 group-hover:bg-purple-200 transition-colors">
                <FileSearch className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-gray-900">Form Data Extraction</CardTitle>
              <CardDescription className="text-gray-500">Extract data from forms and fillable PDFs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Automatically identify form fields and extract their values, perfect for processing applications and
                surveys.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-3 group-hover:bg-red-200 transition-colors">
                <Search className="h-6 w-6 text-red-600" />
              </div>
              <CardTitle className="text-gray-900">Smart Search</CardTitle>
              <CardDescription className="text-gray-500">
                Powerful search functionality across all your documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Find exactly what you&apos;re looking for with full-text search capabilities and content highlighting.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center mb-3 group-hover:bg-yellow-200 transition-colors">
                <Download className="h-6 w-6 text-yellow-600" />
              </div>
              <CardTitle className="text-gray-900">Multiple Export Formats</CardTitle>
              <CardDescription className="text-gray-500">Export parsed data in various formats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Download your extracted data in TXT, CSV, Excel, JSON, or XML formats to suit your workflow needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-md hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-200 transition-colors">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-gray-900">Batch Processing</CardTitle>
              <CardDescription className="text-gray-500">Process multiple documents at once</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Save time by uploading and processing multiple PDF files in a single operation with our batch processing
                feature.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
