import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DocumentRow } from "./document-row";
import { Document } from "@/store/use-documents-store";

interface DocumentsTableProps {
  documents: Document[];
}

export const DocumentsTable = ({ documents }: DocumentsTableProps) => {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>&nbsp;</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
          </TableRow>
        </TableHeader>
        {documents.length === 0 ? (
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4} className="h-24 text-muted-foreground text-center">
                No documents found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {documents.map((document) => (
              <DocumentRow key={document._id} document={document} />
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};
