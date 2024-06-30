import { deletePaziente } from "@/actions/actions.listaPazienti";
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
import React from "react";

const ModalDeletePaziente = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idCliente, setFetchLabel } = useStore((state) => state);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina paziente</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questo paziente?</p>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={async () => {
            const res = await deletePaziente(idCliente);
            if (res === "ok") {
              toast({
                title: "Eliminazione paziente.",
                description: "Paziente eliminato correttamente.",
              });
            } else {
              toast({
                variant: "destructive",
                title: "Uh Oh! Errore nell eliminazione.",
                description: "Errore nella eliminazione del paziente. Riprova",
              });
            }
            setFetchLabel(EFetchLabel.LISTA_PAZIENTE);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDeletePaziente;
