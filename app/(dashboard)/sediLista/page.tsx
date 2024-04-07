"use client";
import { ESede, TSede, columns } from "./columns";
import { DataTable } from "../prestazioniLista/data-table";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { db } from "@/lib/db";
import { EFetchLabel, EModalType } from "@/enum/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { TPrestazioneLista } from "../prestazioniLista/page";
import { useEffect, useState } from "react";
import { useStore } from "@/store/store";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { getSede } from "@/actions/actions.clinica";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") router.push("/login");

  const [data, setData] = useState<TSede[]>([]);

  const { setIdSede, setModalOpen, setModalType, setFetchLabel, fetchLabel } =
    useStore((state) => state);
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
                setIdSede(row.original.id);
                handleClick(EModalType.ELIMINA_SEDE);
              }}
            >
              Elimina
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIdSede(row.original.id);
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

  useEffect(() => {
    getSede().then((data) => setData(data));
  }, []);

  useEffect(() => {
    if (fetchLabel === EFetchLabel.LISTA_SEDI) {
      getSede().then((data) => setData(data));
      setFetchLabel(EFetchLabel.NULL);
    }
  }, [fetchLabel, setFetchLabel]);

  // const data: TSede[] = await db.sede.findMany();
  return (
    <div className="container py-6">
      <div className="w-full">
        <ButtonModal type={EModalType.CREATE_SEDE} value="Crea sede" />
      </div>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
