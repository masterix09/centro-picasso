import { deleteOperatoreById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EFetchLabel } from "@/enum/types";
import { useStore } from "@/store/store";
import React from "react";

const ModalEliminaOperatore = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idOperatore, setFetchLabel } = useStore((state) => state);

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
          onClick={() => {
            deleteOperatoreById(idOperatore);
            setFetchLabel(EFetchLabel.LISTA_OPERATORI);
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
