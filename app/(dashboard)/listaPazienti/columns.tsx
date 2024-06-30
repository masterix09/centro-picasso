"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Paziente = {
  id: string;
  nome: string | null;
  cognome: string | null;
  codice_fiscale: string | null;
  data_nascita: string | null;
};

export const columns: ColumnDef<Paziente>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "cognome",
    header: "Cognome",
  },
  {
    accessorKey: "codice_fiscale",
    header: "CF",
  },
  {
    accessorKey: "data_nascita",
    header: "Data Nascita",
  },
];
