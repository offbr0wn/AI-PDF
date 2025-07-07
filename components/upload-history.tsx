"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye, Trash2, Upload } from "lucide-react";
import { useState } from "react";
import {
  DeleteDocumentMutation,
  GetUserDocumentsQuery,
} from "@/hooks/tanstack-hooks";
import { useAuth } from "@clerk/nextjs";

interface UploadHistoryProps {
  currentFileId: string;
  setCurrentFileId: (id: string) => void;
}

interface Document {
  id: string;
  status: string;
  createdAt: string;
  metadata: {
    fileName: string;
    size: string;
  };
}

export function UploadHistory({
  currentFileId,
  setCurrentFileId,
}: UploadHistoryProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { userId } = useAuth();
  const { data: userDocuments } = GetUserDocumentsQuery(userId ?? "");
  const { mutateAsync: deleteDocument } = DeleteDocumentMutation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };
  const handleDelete = async (fileId: string) => {
    await deleteDocument({ fileId, userId: userId ?? "" });
  };
  return (
    <Card className="bg-white/80 backdrop-blur-sm h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Upload History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {userDocuments?.map((file: Document) => (
          <div
            key={file.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              file.id === currentFileId
                ? "bg-blue-50 border-blue-200"
                : hoveredItem === file.id
                ? "bg-slate-50 border-slate-300"
                : "bg-white border-slate-200"
            }`}
            onMouseEnter={() => setHoveredItem(file.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="h-4 w-4 text-blue-600" />
              </div>

              <div className="flex-1 min-w-0">
                <h4
                  className="font-medium text-slate-800 text-sm truncate"
                  title={file?.metadata?.fileName}
                >
                  {file?.metadata?.fileName}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className={`text-xs ${getStatusColor(file.status)}`}
                  >
                    {file.status}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {file.metadata?.size} MB
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action buttons - show on hover or for current file */}
            {(hoveredItem === file.id || file.id === currentFileId) &&
              file.status === "completed" && (
                <div className="flex items-center gap-1 mt-3 pt-2 border-t border-slate-100">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => setCurrentFileId(file.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs"
                  >
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(file.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}

            {/* Retry button for failed uploads */}
            {file.status === "failed" && (
              <div className="mt-3 pt-2 border-t border-slate-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs w-full"
                >
                  <Upload className="h-3 w-3 mr-1" />
                  Retry Upload
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="pt-3 border-t border-slate-200">
          <Button variant="outline" size="sm" className="w-full gap-2">
            <Upload className="h-4 w-4" />
            Upload New File
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
