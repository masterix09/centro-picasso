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
import { useSearchParams } from "next/navigation";
import React, { useTransition } from "react";

const ModalDeletePaziente = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const searchParams = useSearchParams();
  const idCliente = searchParams.get("idCliente") ?? "";
  const { setFetchLabel } = useStore((state) => state);
  const [isPending, startTransition] = useTransition();
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
          disabled={isPending}
          onClick={async () => {
            startTransition(async () => {
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
                  description:
                    "Errore nella eliminazione del paziente. Riprova",
                });
              }
              setFetchLabel(EFetchLabel.LISTA_PAZIENTE);
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

export default ModalDeletePaziente;
