"use client";

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TPrestazione = {
  id: string;
  nome: string;
  categoria: string;
  dente: string;
  stato: string;
};

export const columns: ColumnDef<TPrestazione>[] = [
  {
    accessorKey: "nome",
    header: "Prestazione",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "denteId",
    header: "Dente",
  },
  {
    accessorKey: "status",
    header: "Stato",
  },
];
