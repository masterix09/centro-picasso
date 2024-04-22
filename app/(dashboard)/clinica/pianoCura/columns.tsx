"use client";

import { updateStatusPrestazione } from "@/actions/actions.clinica";
import ModalDataAppuntamento from "@/components/dashboard/ModalDashboard/pianoCuraPrestazione/ModalDataAppuntamento";
import ModalDeletePrestazionePianoCura from "@/components/dashboard/ModalDashboard/pianoCuraPrestazione/ModalDeletePrestazionePianoCura";
import ModalImpostaOrario from "@/components/dashboard/ModalDashboard/pianoCuraPrestazione/ModalImpostaOrario";
import ModalDeletePrestazione from "@/components/dashboard/ModalDashboard/prestazioni/ModalDeletePrestazione";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useStore } from "@/store/store";
import { EStatusPrestazione } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TPrestazione = {
  id: string;
  nome: string;
  categoria: string;
  dente: string;
  stato: string;
};

export const columns: ColumnDef<{
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
                // toast({
                //   title: "Stato aggiornato.",
                //   description:
                //     "Stato della prestazione aggiornato correttamente.",
                // });
                // setFetchLabel(EFetchLabel.LISTA_PRESTAZIONI_PIANO_CURA);
              } else throw new Error();
            } catch (error) {
              // toast({
              //   variant: "destructive",
              //   title: "Uh Oh! Errore nello stato.",
              //   description:
              //     "Lo stato della prestazione non e' stato aggiornato correttamente. Riprova",
              // });
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
            <ModalDeletePrestazionePianoCura idPrestazione={row.original.id} />
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
