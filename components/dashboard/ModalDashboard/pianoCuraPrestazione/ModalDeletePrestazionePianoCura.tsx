"use client";
import { deletePrestazionePianoCuraById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast, useToast } from "@/components/ui/use-toast";
import React from "react";
import { z } from "zod";

const ModalDeletePrestazionePianoCura = ({
  idPrestazione,
}: {
  idPrestazione: string;
}) => {
  // const { idPrestazione, setFetchLabel } = useStore((state) => state);
  const { toast } = useToast();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina prestazione</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questa prestazione</p>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={async () => {
            try {
              const result = await deletePrestazionePianoCuraById(
                idPrestazione
              );
              // handleCloseModal();

              if (result === "ok") {
                // setFetchLabel(EFetchLabel.LISTA_PRESTAZIONI_PIANO_CURA);
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
