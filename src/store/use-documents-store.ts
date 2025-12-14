import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Document {
  _id: string;
  title: string;
  initialContent?: string;
  content?: string;
  _creationTime: number;
}

interface DocumentsState {
  documents: Document[];
  createDocument: (title: string, initialContent?: string) => string;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  getDocument: (id: string) => Document | undefined;
}

const generateId = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const useDocumentsStore = create<DocumentsState>()(
  persist(
    (set, get) => ({
      documents: [],
      createDocument: (title: string, initialContent?: string) => {
        const id = generateId();
        const newDocument: Document = {
          _id: id,
          title,
          initialContent,
          _creationTime: Date.now(),
        };
        set((state) => ({
          documents: [newDocument, ...state.documents],
        }));
        return id;
      },
      updateDocument: (id: string, updates: Partial<Document>) => {
        set((state) => ({
          documents: state.documents.map((doc) =>
            doc._id === id ? { ...doc, ...updates } : doc
          ),
        }));
      },
      deleteDocument: (id: string) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc._id !== id),
        }));
      },
      getDocument: (id: string) => {
        return get().documents.find((doc) => doc._id === id);
      },
    }),
    {
      name: "documents-storage",
    }
  )
);
