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
import { EFetchLabel } from "@/enum/types";
import { useStore } from "@/store/store";
import React from "react";

const ModalDeleteSede = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idSede, setFetchLabel } = useStore((state) => state);

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
          onClick={() => {
            deleteSedeById(idSede);
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
