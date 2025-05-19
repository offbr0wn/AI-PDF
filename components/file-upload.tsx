"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileUp, Check, AlertCircle, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type UploadStatus = "idle" | "uploading" | "success" | "error" | "processing"

export function FileUpload() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle")
  const [progress, setProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files: FileList) => {
    // Simulate file upload
    setUploadStatus("uploading")
console.log("Uploading file...",files[0])
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("processing")

          // Simulate processing
          setTimeout(() => {
            setUploadStatus("success")
          }, 2000)

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const resetUpload = () => {
    setUploadStatus("idle")
    setProgress(0)
  }

  return (
    <Card
      className={cn(
        "border-2 border-dashed transition-all duration-300 shadow-md bg-white/90 backdrop-blur-sm rounded-xl",
        dragActive ? "border-blue-500 shadow-lg shadow-blue-100" : "border-slate-200 hover:border-blue-200",
      )}
    >
      <CardContent className="p-6 md:p-8">
        {uploadStatus === "idle" && (
          <div
            className="flex flex-col items-center justify-center gap-4 py-8"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="rounded-full bg-blue-50 p-6">
              <FileUp className="h-10 w-10 text-blue-600" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-slate-800">Drag and drop your PDF here</p>
              <p className="text-sm text-slate-500 mt-1">or click to browse files (max 10MB)</p>
            </div>
            <div className="relative">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".pdf"
                onChange={handleChange}
              />
              <Button
                variant="outline"
                size="lg"
                className="border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-300"
              >
                Browse files
              </Button>
            </div>
          </div>
        )}

        {uploadStatus === "uploading" && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Progress value={progress} className="w-full max-w-md h-2 bg-slate-100" />
            <p className="text-sm text-slate-500">Uploading... {progress}%</p>
          </div>
        )}

        {uploadStatus === "processing" && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
            <p className="text-sm text-slate-500">Processing your document...</p>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="rounded-full bg-green-50 p-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-slate-800">Document uploaded successfully!</p>
              <p className="text-sm text-slate-500 mt-1">Your document has been processed and is ready to view.</p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300">
                View results
              </Button>
              <Button
                variant="outline"
                onClick={resetUpload}
                className="border-slate-300 text-slate-700 hover:bg-slate-100"
              >
                Upload another
              </Button>
            </div>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="rounded-full bg-red-50 p-6">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium text-slate-800">Upload failed</p>
              <p className="text-sm text-slate-500 mt-1">
                There was an error processing your document. Please try again.
              </p>
            </div>
            <Button variant="outline" onClick={resetUpload} className="border-red-200 text-red-600 hover:bg-red-50">
              Try again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
