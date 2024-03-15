"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TPrestazione } from "../clinica/pianoCura/columns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export enum ESede {
  SANTANTIMO = "SANT'ANTIMO",
  GIUGLIANO = "GIUGLIANO",
  AVERSA = "AVERSA",
}

export type TOperatore = {
  // id: string;
  // nome: string;
  // cognome: string;
  // color: string;
  // sede: ESede[];

  id: string;
  nome: string | null;
  cognome: string | null;
  colorAgenda: string | null;
  // sede: string | null;
};

export const columns: ColumnDef<TOperatore>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "cognome",
    header: "Cognome",
  },
  {
    accessorKey: "colorAgenda",
    header: "Colore",
  },
  {
    accessorKey: "sede",
    header: "Sede",
  },
];
