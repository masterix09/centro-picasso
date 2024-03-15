"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TPrestazione } from "../clinica/pianoCura/columns";
import { TPrestazioneLista } from "./page";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<TPrestazioneLista>[] = [
  {
    accessorKey: "nome",
    header: "Prestazione",
  },
  {
    accessorKey: "categoria",
    header: "Categoria",
  },
  {
    accessorKey: "costoDefault",
    header: "Costo Default",
  },
  {
    accessorKey: "costoGentile",
    header: "Costo Gentile",
  },
  {
    accessorKey: "forWho",
    header: "Appartenenza",
  },
];
