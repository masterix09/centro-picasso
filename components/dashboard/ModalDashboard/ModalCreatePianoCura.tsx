"use client";
import { createPianoCura } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EFetchLabel } from "@/enum/types";
import { useStore } from "@/store/store";
import React from "react";

const ModalCreatePianoCura = ({
  idCliente,
}: // handleCloseModal,
{
  idCliente: string | null;
  // handleCloseModal: () => void;
}) => {
  const { setFetchLabel } = useStore();
  const onSubmit = async (formData: FormData) => {
    const titolo = formData.get("titolo");
    const res = await createPianoCura(
      titolo?.toString() ?? "",
      idCliente ?? ""
    );

    // if (res === "ok") {
    //   toast({
    //     title: "Piano cura creato.",
    //     description: "Piano cura creato correttamente.",
    //   });
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh Oh! Errore nella creazione.",
    //     description: "Errore nella creazione del piano cura. Riprova",
    //   });
    // }
    setFetchLabel(EFetchLabel.LISTA_PIANO_CURA);
    // handleCloseModal();
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Crea un nuovo piano di cura</AlertDialogTitle>
        <form
          action={onSubmit}
          className="w-full flex flex-col gapy-3 md:flex-row gap-x-3"
        >
          <Input
            type="text"
            name="titolo"
            id="titolo"
            placeholder="nome piano di cura"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
};

export default ModalCreatePianoCura;
