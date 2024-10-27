"use client";

import {
  deletePagamento,
  updatePriceFacoltativo,
} from "@/actions/actions.clinica";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  costoFacoltativo: number | null;
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
  {
    id: "costoFacoltativo",
    header: "CostoFacoltativo",
    cell: ({ row, getValue }) => {
      return (
        <form action={updatePriceFacoltativo} className="flex gap-x-3">
          <input type="hidden" name="idPrestazione" value={row.original.id} />
          <Input
            name="newPrice"
            type="string"
            defaultValue={row.original.costoFacoltativo ?? 0}
          />
          <Button>Imposta prezzo</Button>
        </form>
      );
    },
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
  {
    id: "costoFacoltativo",
    header: "CostoFacoltativo",
    cell: ({ row, getValue }) => {
      return (
        <form action={updatePriceFacoltativo} className="flex gap-x-3">
          <input type="hidden" name="idPrestazione" value={row.original.id} />
          <Input
            name="newPrice"
            type="string"
            defaultValue={row.original.costoFacoltativo ?? 0}
          />
          <Button>Imposta prezzo</Button>
        </form>
      );
    },
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
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <Button
          type="button"
          className="bg-red-500 text-white font-bold"
          onClick={() => deletePagamento(row.original.id)}
        >
          X
        </Button>
      );
    },
  },
];
