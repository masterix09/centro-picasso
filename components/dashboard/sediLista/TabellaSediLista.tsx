"use client";
import { DataTable } from "@/app/(dashboard)/prestazioniLista/data-table";
import { TSede } from "@/app/(dashboard)/sediLista/columns";
import { Button } from "@/components/ui/button";
import { EModalType } from "@/enum/types";
import { useStore } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

type Props = {
  data: TSede[];
};

const TabellaSediLista = ({ data }: Props) => {
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
  const columns: ColumnDef<TSede>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
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
                  pathName + "?" + createQueryString("idSede", row.original.id)
                );
                handleClick(EModalType.ELIMINA_SEDE);
              }}
            >
              Elimina
            </Button>
            <Button
              type="button"
              onClick={() => {
                router.push(
                  pathName + "?" + createQueryString("idSede", row.original.id)
                );
                handleClick(EModalType.MODIFICA_SEDE);
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

export default TabellaSediLista;
