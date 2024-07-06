"use client";

import { deleteSedeById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { EFetchLabel } from "@/enum/types";
import { useStore } from "@/store/store";
import { useSearchParams } from "next/navigation";
import React from "react";

const ModalDeleteSede = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const searchParams = useSearchParams();
  const idSede = searchParams.get("idSede") ?? "";
  const { setFetchLabel } = useStore((state) => state);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina sede</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questa sede?</p>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={async () => {
            const res = await deleteSedeById(idSede);
            if (res === "ok") {
              toast({
                title: "Eliminazione sede.",
                description: "Sede eliminata correttamente.",
              });
            } else {
              toast({
                variant: "destructive",
                title: "Uh Oh! Errore nell eliminazione.",
                description: "Errore nella eliminazione della sede. Riprova",
              });
            }
            setFetchLabel(EFetchLabel.LISTA_SEDI);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDeleteSede;
