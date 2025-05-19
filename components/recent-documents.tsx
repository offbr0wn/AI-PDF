"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download, Trash2, Search, FileText } from "lucide-react"

type Document = {
  id: string
  name: string
  date: string
  size: string
  pages: number
}

export function RecentDocuments() {
  const [searchQuery, setSearchQuery] = useState("")

  const documents: Document[] = [
    { id: "1", name: "Financial_Report_2025.pdf", date: "May 10, 2025", size: "2.4 MB", pages: 12 },
    { id: "2", name: "Contract_Agreement.pdf", date: "May 8, 2025", size: "1.8 MB", pages: 8 },
    { id: "3", name: "Product_Specifications.pdf", date: "May 5, 2025", size: "3.2 MB", pages: 15 },
    { id: "4", name: "Meeting_Minutes.pdf", date: "May 3, 2025", size: "0.9 MB", pages: 4 },
  ]

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <section className="py-16 md:py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 z-0"></div>

      <div className="container px-4 md:px-6 relative z-10">
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-gray-900">Recent Documents</CardTitle>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-600/60" />
                <Input
                  type="search"
                  placeholder="Search documents..."
                  className="pl-9 border-gray-300 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-4 bg-gray-100">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  All Documents
                </TabsTrigger>
                <TabsTrigger value="recent" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                  Recently Processed
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-600"
                >
                  Favorites
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {filteredDocuments.length > 0 ? (
                  <div className="rounded-md border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-12 gap-2 p-4 text-sm font-medium text-gray-500 border-b border-gray-200 bg-gray-50">
                      <div className="col-span-5 md:col-span-6">Document</div>
                      <div className="col-span-3 md:col-span-2">Date</div>
                      <div className="col-span-2 hidden md:block">Size</div>
                      <div className="col-span-1 hidden md:block">Pages</div>
                      <div className="col-span-4 md:col-span-1 text-right">Actions</div>
                    </div>

                    {filteredDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="grid grid-cols-12 gap-2 p-4 items-center text-sm border-b last:border-0 border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="col-span-5 md:col-span-6 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center">
                            <FileText className="h-4 w-4 text-blue-600" />
                          </div>
                          <span className="font-medium truncate text-gray-900">{doc.name}</span>
                        </div>
                        <div className="col-span-3 md:col-span-2 text-gray-500">{doc.date}</div>
                        <div className="col-span-2 hidden md:block text-gray-500">{doc.size}</div>
                        <div className="col-span-1 hidden md:block text-gray-500">{doc.pages}</div>
                        <div className="col-span-4 md:col-span-1 flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            title="View"
                            className="h-8 w-8 text-gray-500 hover:text-blue-600"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Download"
                            className="h-8 w-8 text-gray-500 hover:text-blue-600"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            className="h-8 w-8 text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <FileText className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {searchQuery ? "Try a different search term" : "Upload a PDF to get started"}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No recently processed documents</h3>
                  <p className="text-sm text-gray-500 mt-1">Documents processed in the last 7 days will appear here</p>
                </div>
              </TabsContent>

              <TabsContent value="favorites">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No favorite documents</h3>
                  <p className="text-sm text-gray-500 mt-1">Mark documents as favorites to access them quickly</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
