"use client";
import ArcateBody from "@/components/dashboard/PianoDiCura/ArcateBody";
import DentiTable from "@/components/dashboard/PianoDiCura/DentiTable";
import { DataTable } from "./data-table";
// import { TPrestazione, columns } from "./columns";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { ColumnDef } from "@tanstack/react-table";
import { EModalType } from "@/enum/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EStatusPrestazione } from "@/types";
import { updateStatusPrestazione } from "@/actions/actions.clinica";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");
  const { idPiano, setIdPrestazione, setModalOpen, setModalType } = useStore(
    (state) => state
  );

  const [data, setData] = useState<TPrestazione[]>([]);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const router = useRouter();

  useEffect(() => {
    if (idPiano) {
      fetch(`/api/getPrestazione/${idPiano}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => setData(data));
    }
  }, [idPiano]);

  const handleClick = (type: EModalType) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("modalOpen", "true");
    // params.set("modalType", type);
    // router.replace(`${pathname}?${params.toString()}`);
    setModalOpen(true);
    setModalType(type);
  };

  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.
  type TPrestazione = {
    id: string;
    nome: string;
    categoria: string;
    dente: string;
    status: string;
  };

  const columns: ColumnDef<TPrestazione>[] = [
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
      accessorKey: "status",
      header: "Stato",
      cell: ({ row, getValue }) => {
        return (
          <Select
            onValueChange={(value) =>
              updateStatusPrestazione(row.original.id, value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={`${row.original.status}`} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Prescritto">Prescritto</SelectItem>
              <SelectItem value="In corso">
                {EStatusPrestazione["In corso"]}
              </SelectItem>
              <SelectItem value="Completato">
                {EStatusPrestazione.Completato}
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
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
                handleClick(EModalType.ELIMINA_PRESTAZIONE_PIANOCURA);
              }}
            >
              Elimina
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIdPrestazione(row.original.id);
                handleClick(EModalType.IMPOSTA_DATA_APPUNTAMENTO);
              }}
            >
              Data
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIdPrestazione(row.original.id);
                handleClick(EModalType.IMPOSTA_ORARIO_APPUNTAMENTO);
              }}
            >
              Ora
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex w-full h-full flex-col md:flex-row gap-6">
        <div>
          <DentiTable />
        </div>
        <div>
          <ArcateBody />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
