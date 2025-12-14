"use client";

import { useParams } from "next/navigation";
import { Document } from "./document";
import { useDocumentsStore } from "@/store/use-documents-store";

const DocumentIdPage = () => {
  const params = useParams();
  const documentId = params.documentId as string;
  const document = useDocumentsStore((state) => state.getDocument(documentId));

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Document not found</p>
      </div>
    );
  }

  return <Document document={document} />;
};

export default DocumentIdPage;
