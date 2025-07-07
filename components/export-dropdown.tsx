"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  FileImage,
  Mail,
  Database,
  Crown,
  Sparkles,
  ChevronDown,
} from "lucide-react"
import { toast } from "sonner"



export function ExportDropdown() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast("Export Complete")

    setIsExporting(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          className="gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
          disabled={isExporting}
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exporting..." : "Export"}
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-yellow-500" />
          Pro Export Options
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Raw Data Exports */}
        <DropdownMenuLabel className="text-xs text-slate-500 font-normal">Raw Data</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileJson className="h-4 w-4 text-blue-500" />
          <div className="flex-1">
            <div className="font-medium">JSON</div>
            <div className="text-xs text-slate-500">Structured data format</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileSpreadsheet className="h-4 w-4 text-green-500" />
          <div className="flex-1">
            <div className="font-medium">CSV</div>
            <div className="text-xs text-slate-500">Spreadsheet compatible</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <Database className="h-4 w-4 text-orange-500" />
          <div className="flex-1">
            <div className="font-medium">XML</div>
            <div className="text-xs text-slate-500">Structured markup</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Document Exports */}
        <DropdownMenuLabel className="text-xs text-slate-500 font-normal">Documents</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileText className="h-4 w-4 text-red-500" />
          <div className="flex-1">
            <div className="font-medium">PDF Report</div>
            <div className="text-xs text-slate-500">Formatted document</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <div className="flex-1">
            <div className="font-medium">Word Document</div>
            <div className="text-xs text-slate-500">Editable format</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileText className="h-4 w-4 text-slate-500" />
          <div className="flex-1">
            <div className="font-medium">Plain Text</div>
            <div className="text-xs text-slate-500">Simple text format</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* AI-Enhanced Exports */}
        <DropdownMenuLabel className="text-xs text-slate-500 font-normal flex items-center gap-1">
          <Sparkles className="h-3 w-3 text-yellow-500" />
          AI-Enhanced
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileText className="h-4 w-4 text-purple-500" />
          <div className="flex-1">
            <div className="font-medium flex items-center gap-1">
              Smart Report
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                AI
              </Badge>
            </div>
            <div className="text-xs text-slate-500">PDF with AI insights</div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
          <FileSpreadsheet className="h-4 w-4 text-green-600" />
          <div className="flex-1">
            <div className="font-medium flex items-center gap-1">
              Excel Analysis
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 text-xs">
                AI
              </Badge>
            </div>
            <div className="text-xs text-slate-500">Spreadsheet with charts</div>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sharing Options */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="gap-2">
            <Mail className="h-4 w-4 text-blue-500" />
            Email Export
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
              <div className="flex-1">
                <div className="font-medium">Summary Email</div>
                <div className="text-xs text-slate-500">Key insights only</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport()} className="gap-2">
              <div className="flex-1">
                <div className="font-medium">Full Report Email</div>
                <div className="text-xs text-slate-500">Complete analysis</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="gap-2 text-slate-500">
          <FileImage className="h-4 w-4" />
          <div className="flex-1">
            <div className="font-medium">Custom Templates</div>
            <div className="text-xs text-slate-400">Coming soon</div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
