"use client";

import { deleteDocumentoById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/store/store";
import React from "react";

const ModalDeleteDocumento = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idDocumento } = useStore((state) => state);
  const { toast } = useToast();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina documento</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questo documento?</p>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={async () => {
            try {
              const result = await deleteDocumentoById(idDocumento);
              handleCloseModal();
              if (result === "ok") {
                toast({
                  title: "Eliminazione con successo.",
                  description:
                    "Il tuo documento e' stato eliminato con successo.",
                });
              } else throw new Error();
            } catch (error) {
              toast({
                variant: "destructive",
                title: "Uh oh! Qualcosa e' andato storto.",
                description:
                  "Eliminazione non riuscita. Chiudi la modale e riprova",
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

export default ModalDeleteDocumento;
