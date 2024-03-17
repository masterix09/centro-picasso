"use client";
import { ESede, TOperatore } from "./columns";
import { DataTable } from "../prestazioniLista/data-table";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { db } from "@/lib/db";
import { EModalType } from "@/enum/types";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { getOperatore, getOperatoreById } from "@/actions/actions.clinica";
import { useEffect, useState } from "react";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status === "unauthenticated") router.push("/login");
  const [data, setData] = useState<TOperatore[]>([]);

  const { setIdOperatore, setModalOpen, setModalType } = useStore(
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
                setIdOperatore(row.original.id);
                handleClick(EModalType.ELIMINA_OPERATORE);
              }}
            >
              Elimina
            </Button>
            <Button
              type="button"
              onClick={async () => {
                setIdOperatore(row.original.id);
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

  useEffect(() => {
    if (data.length === 0) getOperatore().then((data) => setData(data));
  }, [data]);

  return (
    <div className="container py-6">
      <div className="w-full">
        <ButtonModal
          type={EModalType.CREATE_OPERATORE}
          value="Crea operatore"
        />
      </div>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
