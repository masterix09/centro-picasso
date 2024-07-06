"use client";
import { Paziente } from "@/app/(dashboard)/listaPazienti/columns";
import { DataTable } from "@/app/(dashboard)/listaPazienti/data-table";
import { Button } from "@/components/ui/button";
import { EModalType } from "@/enum/types";
import { useStore } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

type Props = {
  data: Paziente[];
};

const TabellaListaPAzienti = ({ data }: Props) => {
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
  const columns: ColumnDef<Paziente>[] = [
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
                    createQueryString("idCliente", row.original.id)
                );
                handleClick(EModalType.ELIMINA_PAZIENTE);
              }}
            >
              Elimina
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="min-h-screen p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default TabellaListaPAzienti;
