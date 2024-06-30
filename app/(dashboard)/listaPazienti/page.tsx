"use client";

import { getListaPazienti } from "@/actions/actions.listaPazienti";
import { DataTable } from "./data-table";
import { Paziente } from "./columns";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { EFetchLabel, EModalType } from "@/enum/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default function Page() {
  const [data, setData] = useState<Paziente[]>([]);
  // const data = await getListaPazienti();

  const {
    setIdCliente,
    setModalOpen,
    setModalType,
    setFetchLabel,
    fetchLabel,
  } = useStore((state) => state);

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
                setIdCliente(row.original.id);
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

  useEffect(() => {
    if (data.length === 0) getListaPazienti().then((data) => setData(data));
  }, [data]);

  useEffect(() => {
    if (fetchLabel === EFetchLabel.LISTA_PAZIENTE) {
      getListaPazienti().then((data) => setData(data));
      setFetchLabel(EFetchLabel.NULL);
    }
  }, [fetchLabel, setFetchLabel]);

  return (
    <div className="min-h-screen p-4">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
