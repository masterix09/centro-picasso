"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { TDocument, columns } from "./columns";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EModalType } from "@/enum/types";
import { db } from "@/lib/db";
import { getDocument } from "@/actions/actions.clinica";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");
  const { idDocumento, setIdDocumento, setModalOpen, setModalType } = useStore(
    (state) => state
  );

  const handleClick = (type: EModalType) => {
    setModalOpen(true);
    setModalType(type);
  };

  const columns: ColumnDef<TDocument>[] = [
    {
      accessorKey: "nome",
      header: "Nome",
    },
    {
      accessorKey: "createdAt",
      header: "Creato il",
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
                setIdDocumento(row.original.id);
                handleClick(EModalType.ELIMINA_DOCUMENTO);
              }}
            >
              Elimina
            </Button>
          </div>
        );
      },
    },
  ];

  const { idPiano } = useStore((state) => state);
  const [data, setData] = useState<TDocument[]>([]);

  useEffect(() => {
    if (idPiano) {
      getDocument(idPiano).then((data) => setData(data));
    }
  }, [idPiano]);

  return (
    <>
      <div className="w-full">
        <ButtonModal
          value="Crea documento"
          type={EModalType.CREATE_DOCUMENTO}
        />
      </div>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
