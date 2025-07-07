export const uploadFileToS3 = async (formData: FormData) => {
  const res = await fetch("/api/upload-pdf", {
    method: "POST",
    body: formData,
  });
  return await res.json();
};

export const processPdfFile = async (formData: FormData) => {
  const res = await fetch("/api/process-pdf", {
    method: "POST",
    body: formData,
  });

  return await res.json();
};

export const getUserDocuments = async (userId: string) => {
  const res = await fetch(`/api/user/document/${userId}`);
  return await res.json();
};

export const deleteDocument = async (fileId: string, userId: string) => {
  console.log("hi");
  const res = await fetch(`/api/user/document/${userId}`, {
    method: "DELETE",
    body: JSON.stringify({ fileId }),
  });
  return await res.json();
};

export const getDocumentById = async (documentId: string) => {
  const res = await fetch(`/api/user/get-document/${documentId}`);

  return await res.json();
};
