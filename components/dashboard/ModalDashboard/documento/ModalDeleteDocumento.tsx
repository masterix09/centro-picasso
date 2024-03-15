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
import { useStore } from "@/store/store";
import React from "react";

const ModalDeleteDocumento = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idDocumento } = useStore((state) => state);

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
          onClick={() => {
            deleteDocumentoById(idDocumento);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDeleteDocumento;
