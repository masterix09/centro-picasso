"use client";
import { deletePrestazioneById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import React from "react";

const ModalDeletePrestazione = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idPrestazione } = useStore((state) => state);

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina prestazione</AlertDialogTitle>
      </AlertDialogHeader>
      <p>Sicuro di voler eliminare questa prestazione?</p>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={() => {
            deletePrestazioneById(idPrestazione);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDeletePrestazione;
