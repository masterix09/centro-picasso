"use client";
import {
  deletePrestazionePianoCuraById,
  getPrestazioneAgendaById,
  setOrarioArrivo,
  setOrarioUscita,
} from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { EFetchLabel } from "@/enum/types";

const formSchema = z.object({
  orario: z.string().min(2).max(50),
});

const ModalDeletePrestazionePianoCura = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idPrestazione, setFetchLabel } = useStore((state) => state);
  const { toast } = useToast();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina prestazione</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questa prestazione</p>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={async () => {
            try {
              const result = await deletePrestazionePianoCuraById(
                idPrestazione
              );
              handleCloseModal();

              if (result === "ok") {
                setFetchLabel(EFetchLabel.LISTA_PRESTAZIONI_PIANO_CURA);
                toast({
                  title: "Eliminazione con successo",
                  description: "Prestazione eliminata con successo",
                });
              } else throw new Error();
            } catch (error) {
              toast({
                variant: "destructive",
                title: "Uh oh! Eliminazione errata",
                description:
                  "Eliminazione non avvenuta con successo. Chiudi la modale e riprova",
              });
            }
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDeletePrestazionePianoCura;
