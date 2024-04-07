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
import { EFetchLabel, EModalType } from "@/enum/types";
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
import { useToast } from "@/components/ui/use-toast";

export const dynamic = "force-dynamic";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");
  const {
    idPiano,
    setIdPrestazione,
    setModalOpen,
    setModalType,
    fetchLabel,
    setFetchLabel,
  } = useStore((state) => state);

  const [data, setData] = useState<TPrestazione[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (idPiano) {
      console.log("normale");
      fetch(`/api/getPrestazione/${idPiano}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => setData(data));
    }
  }, [idPiano]);

  useEffect(() => {
    if (fetchLabel === EFetchLabel.LISTA_PRESTAZIONI_PIANO_CURA) {
      if (idPiano) {
        console.log("secondo fetch");
        fetch(`/api/getPrestazione/${idPiano}`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((data) => setData(data));
      }
      setFetchLabel(EFetchLabel.NULL);
    }
  }, [fetchLabel, idPiano, setFetchLabel]);

  const handleClick = (type: EModalType) => {
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
            onValueChange={async (value) => {
              try {
                const result = await updateStatusPrestazione(
                  row.original.id,
                  value
                );
                if (result === "ok") {
                  toast({
                    title: "Stato aggiornato.",
                    description:
                      "Stato della prestazione aggiornato correttamente.",
                  });
                  setFetchLabel(EFetchLabel.LISTA_PRESTAZIONI_PIANO_CURA);
                } else throw new Error();
              } catch (error) {
                toast({
                  variant: "destructive",
                  title: "Uh Oh! Errore nello stato.",
                  description:
                    "Lo stato della prestazione non e' stato aggiornato correttamente. Riprova",
                });
              }
            }}
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
