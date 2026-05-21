// utils.js
export const hasUploadedDocuments = () => {
  const data = localStorage.getItem("documentsUploaded");
  return data === "true";
};