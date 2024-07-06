import { DataTable } from "@/app/(dashboard)/clinica/pianoCura/data-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { toast } from "@/components/ui/use-toast";
import { updateStatusPrestazione } from "@/actions/actions.clinica";
import { EStatusPrestazione } from "@/types";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ModalDeletePrestazionePianoCura from "../ModalDashboard/pianoCuraPrestazione/ModalDeletePrestazionePianoCura";
import ModalDataAppuntamento from "../ModalDashboard/pianoCuraPrestazione/ModalDataAppuntamento";
import ModalImpostaOrario from "../ModalDashboard/pianoCuraPrestazione/ModalImpostaOrario";

type Props = {
  data: {
    status: string | null;
    id: string;
    nome: string | null;
    categoria: string | null;
    denteId: string | null;
    costoDefault: number | null;
    costoGentile: number | null;
  }[];
};

const TabellaPianoCura = ({ data }: Props) => {
  const columns: ColumnDef<{
    status: string | null;
    id: string;
    nome: string | null;
    categoria: string | null;
    denteId: string | null;
    costoDefault: number | null;
    costoGentile: number | null;
  }>[] = [
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
      cell: ({ row }) => {
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
                  // setFetchLabel(EFetchLabel.LISTA_PRESTAZIONI_PIANO_CURA);
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button" className="bg-red-500">
                  Elimina
                </Button>
              </AlertDialogTrigger>
              <ModalDeletePrestazionePianoCura
                idPrestazione={row.original.id}
              />
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button">Data</Button>
              </AlertDialogTrigger>
              <ModalDataAppuntamento idPrestazione={row.original.id} />
            </AlertDialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button type="button">Ora</Button>
              </AlertDialogTrigger>
              <ModalImpostaOrario idPrestazione={row.original.id} />
            </AlertDialog>
          </div>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={data} />;
};

export default TabellaPianoCura;
