"use client";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import React from "react";
import ModalCreatePagamento from "../ModalDashboard/ModalCreatePagamento";

const ButtonCreatePagamento = ({ idPiano }: { idPiano: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button">Crea pagamento</Button>
      </AlertDialogTrigger>
      <ModalCreatePagamento idPiano={idPiano} />
    </AlertDialog>
  );
};

export default ButtonCreatePagamento;
