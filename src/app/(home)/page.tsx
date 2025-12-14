"use client";

import { Navbar } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { DocumentsTable } from "./documents-table";

import { useDocumentsStore } from "@/store/use-documents-store";
import { useSearchParam } from "@/hooks/use-search-param";

const Home = () => {
  const [search] = useSearchParam();
  const documents = useDocumentsStore((state) => state.documents);

  const filteredDocuments = search
    ? documents.filter((doc) =>
        doc.title.toLowerCase().includes(search.toLowerCase())
      )
    : documents;

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />
        <DocumentsTable documents={filteredDocuments} />
      </div>
    </div>
  );
};

export default Home;
