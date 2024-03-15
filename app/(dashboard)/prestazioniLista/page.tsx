"use client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { db } from "@/lib/db";
import { EModalType } from "@/enum/types";
import { ColumnDef } from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import { getPrestazioniList } from "@/actions/actions.clinica";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export type TPrestazioneLista = {
  id: string;
  nome: string | null;
  categoria: string | null;
  costoDefault: number | null;
  costoGentile: number | null;
  forWho: string | null;
  sedeId?: string;
};

export default function Page() {
  const [data, setData] = useState<TPrestazioneLista[]>([]);

  const { setIdPrestazione, setModalOpen, setModalType } = useStore(
    (state) => state
  );

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();

  const handleClick = (type: EModalType) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("modalOpen", "true");
    // params.set("modalType", type);
    // router.replace(`${pathname}?${params.toString()}`);
    setModalOpen(true);
    setModalType(type);
  };

  const columns: ColumnDef<TPrestazioneLista>[] = [
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
                setIdPrestazione(row.original.id);
                handleClick(EModalType.ELIMINA_PRESTAZIONE);
              }}
            >
              Elimina
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIdPrestazione(row.original.id);
                handleClick(EModalType.MODIFICA_PRESTAZIONE);
              }}
            >
              Modifica
            </Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getPrestazioniList().then((data) => setData(data));
  }, []);

  // const data: TPrestazioneLista[] = await db.prestazioniLista.findMany();

  return (
    <div className="container py-6">
      <div className="w-full">
        <ButtonModal
          type={EModalType.CREATE_PRESTAZIONE}
          value="Crea prestazione"
        />
      </div>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
