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
import React from "react";

const ModalCreatePianoCura = ({
  idCliente,
  handleCloseModal,
}: {
  idCliente: string | null;
  handleCloseModal: () => void;
}) => {
  const onSubmit = (formData: FormData) => {
    const titolo = formData.get("titolo");
    console.log("titolo => ", titolo);
    createPianoCura(titolo?.toString() ?? "", idCliente ?? "");
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
          {/* <Button type="submit">Invia</Button> */}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseModal}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogHeader>
    </AlertDialogContent>
  );
};

export default ModalCreatePianoCura;
