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
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

const ModalDeletePrestazione = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const searchParams = useSearchParams();
  const idPrestazione = searchParams.get("idPrestazione") ?? "";
  const [isPending, startTransition] = useTransition();

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
          disabled={isPending}
          onClick={() => {
            startTransition(async () => {
              deletePrestazioneById(idPrestazione);
              handleCloseModal();
            });
          }}
        >
          {isPending ? "Loading" : "Elimina"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDeletePrestazione;
