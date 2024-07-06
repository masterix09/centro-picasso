"use client";
import { DataTable } from "@/app/(dashboard)/prestazioniLista/data-table";
import { Button } from "@/components/ui/button";
import { EModalType } from "@/enum/types";
import { useStore } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

export type TOperatore = {
  id: string;
  nome: string | null;
  cognome: string | null;
  colorAgenda: string | null;
};

type Props = {
  data: TOperatore[];
};

const TabellaOperatoriLista = ({ data }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const { setModalOpen, setModalType } = useStore((state) => state);

  const handleClick = (type: EModalType) => {
    setModalOpen(true);
    setModalType(type);
  };

  const columns: ColumnDef<TOperatore>[] = [
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
    {
      id: "actions",
      header: "actions",
      cell: ({ row, getValue }) => {
        return (
          <div className="w-full flex gap-x-3">
            <Button
              type="button"
              className="bg-red-500"
              onClick={() => {
                router.push(
                  pathName +
                    "?" +
                    createQueryString("idOperatore", row.original.id)
                );
                handleClick(EModalType.ELIMINA_OPERATORE);
              }}
            >
              Elimina
            </Button>
            <Button
              type="button"
              onClick={async () => {
                router.push(
                  pathName +
                    "?" +
                    createQueryString("idOperatore", row.original.id)
                );
                handleClick(EModalType.MODIFICA_OPERATORE);
              }}
            >
              Modifica
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TabellaOperatoriLista;
