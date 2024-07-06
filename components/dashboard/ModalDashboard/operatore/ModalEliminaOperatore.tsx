import { deleteOperatoreById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import React from "react";

const ModalEliminaOperatore = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const searchParams = useSearchParams();
  const idOperatore = searchParams.get("idOperatore") ?? "";

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina operatore</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questo operatore?</p>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={async () => {
            const res = await deleteOperatoreById(idOperatore);
            if (res === "ok") {
              toast({
                title: "Eliminazione operatore.",
                description: "Operatore eliminato correttamente.",
              });
            } else {
              toast({
                variant: "destructive",
                title: "Uh Oh! Errore nell eliminazione.",
                description:
                  "Errore nella eliminazione dell operatore. Riprova",
              });
            }
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalEliminaOperatore;
