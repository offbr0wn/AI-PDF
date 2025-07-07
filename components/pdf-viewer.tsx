"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ZoomIn, ZoomOut, RotateCw, Maximize2 } from "lucide-react"
import { useState } from "react"

interface PDFViewerProps {
  filename: string
}

export function PDFViewer({ }: PDFViewerProps) {
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50))
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">PDF Preview</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} disabled={zoom <= 50}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-slate-600 min-w-[60px] text-center">{zoom}%</span>
            <Button variant="outline" size="sm" onClick={handleZoomIn} disabled={zoom >= 200}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border border-slate-200 rounded-lg bg-white min-h-[600px] flex items-center justify-center relative overflow-hidden">
          {/* Mock PDF content */}
          <div
            className="bg-white shadow-lg transition-transform duration-300"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              width: "210mm",
              height: "297mm",
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <div className="p-8 h-full flex flex-col">
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-slate-800 mb-2">FINANCIAL REPORT 2025</h1>
                <p className="text-slate-600">TechCorp Industries</p>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-2">EXECUTIVE SUMMARY</h2>
                  <p className="text-slate-600 leading-relaxed">
                    This report presents the financial performance for the fiscal year 2025. Our company has achieved
                    significant growth across all key metrics...
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-800 mb-2">REVENUE ANALYSIS</h2>
                  <div className="space-y-1 text-slate-600">
                    <p>
                      <strong>Total Revenue:</strong> $2,450,000
                    </p>
                    <p>
                      <strong>Growth Rate:</strong> 15.2% YoY
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded">
                  <h3 className="font-semibold text-slate-800 mb-2">Key Revenue Streams</h3>
                  <ul className="space-y-1 text-slate-600">
                    <li>• Product Sales: $1,800,000</li>
                    <li>• Services: $650,000</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm text-slate-600">
          <span>Page 1 of 12</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
