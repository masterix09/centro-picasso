"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TPrestazionePreventivo = {
  id: string;
  nome: string | null;
  categoria: string | null;
  denteId: string | null;
  costoGentile: number | null;
  costoDefault: number | null;
  status: string | null;
};

export type TPagamentiPreventivo = {
  id: string;
  createdAt: string | null;
  note: string | null;
  importo: number | null;
};

export const columnsGentile: ColumnDef<TPrestazionePreventivo>[] = [
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
    accessorKey: "costoGentile",
    header: "CostoGentile",
  },
];

export const columnsDefault: ColumnDef<TPrestazionePreventivo>[] = [
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
    accessorKey: "costoDefault",
    header: "CostoDefault",
  },
];

export const columnsPagamenti: ColumnDef<TPagamentiPreventivo>[] = [
  {
    accessorKey: "createdAt",
    header: "Data",
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    accessorKey: "importo",
    header: "Importo",
  },
];
