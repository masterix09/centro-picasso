"use client";

import ModalDeleteDocumento from "@/components/dashboard/ModalDashboard/documento/ModalDeleteDocumento";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TDocument = {
  id: string;
  nome: string;
  createdAt: string;
};

export const columns: ColumnDef<TDocument>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "createdAt",
    header: "Creato il",
  },
  {
    id: "actions",
    header: "actions",
    cell: ({ row }) => {
      return (
        <div className="w-full flex gap-x-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button type="button" className="bg-red-500">
                Elimina
              </Button>
            </AlertDialogTrigger>
            <ModalDeleteDocumento idDocumento={row.original.id} />
          </AlertDialog>
        </div>
      );
    },
  },
];
