import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteDocument,
  getDocumentById,
  getUserDocuments,
  processPdfFile,
  uploadFileToS3,
} from "./api-hooks";

export const UploadS3Mutation = () =>
  useMutation({
    mutationFn: (formData: FormData) => {
      return uploadFileToS3(formData);
    },
  });

export const ProcessPDFMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => {
      return processPdfFile(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-documents"] });
    },
  });
};

export const GetUserDocumentsQuery = (userId: string) =>
  useQuery({
    queryKey: ["user-documents"],
    queryFn: () => getUserDocuments(userId),
    select: (data) => data.documents,
  });

export const DeleteDocumentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ fileId, userId }: { fileId: string; userId: string }) => {
      return deleteDocument(fileId, userId);
    },
    retry: 1,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-documents"] });
    },
  });
};

export const GetDocumentByIdQuery = (documentId: string) =>
  useQuery({
    queryKey: ["documentId", documentId],
    queryFn: () => getDocumentById(documentId),
  });
