"use client";

import { TPrestazioneLista } from "@/app/(dashboard)/prestazioniLista/page";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { onSubmitCreatePrestazione } from "@/lib/utils";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { CheckedState } from "@radix-ui/react-checkbox";
import React, { useEffect, useState } from "react";
import StepperForm, { TStepper } from "../common/StepperForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EStatusStepper } from "@/enum/types";
import AggiungiPrestazione from "./createPrestazione/AggiungiPrestazione";
import AppuntamentoPrestazione from "./createPrestazione/AppuntamentoPrestazione";
import { useStore } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";
import { useRouter, useSearchParams } from "next/navigation";

const formSchemaAddPrestazioni = z.object({
  sede: z.string().min(2),
  operatore: z.string().min(2),
  prestazioni: z.array(z.string().min(2)),
});

const ModalAddPrestazionePianoCura = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchemaAddPrestazioni>>({
    resolver: zodResolver(formSchemaAddPrestazioni),
    defaultValues: {
      operatore: "",
      sede: "",
      prestazioni: [],
    },
  });

  const [prestazioni, setPrestazioni] = useState<TPrestazioneLista[]>([]);

  const searchParams = useSearchParams();
  const idPiano = searchParams.get("idPiano");

  const { idDente } = useStore((state) => state);

  const addPrestazione = (value: CheckedState, item: TPrestazioneLista) => {
    if (value === true) {
      setPrestazioni([...prestazioni, item]);
    }
    if (value === false) {
      const prestazioniFilter = prestazioni.filter((obj) => obj.id !== item.id);
      setPrestazioni(prestazioniFilter);
    }
  };

  // const handleAddPrestazioniToPianoCura = async () => {};

  const [stepper, setStepper] = useState<TStepper[]>([
    { name: "Step 1", href: "#", status: EStatusStepper.CURRENT },
    { name: "Step 2", href: "#", status: EStatusStepper.UPCOMING },
    // { name: "Step 3", href: "#", status: EStatusStepper.UPCOMING },
  ]);

  const { toast } = useToast();

  async function prestazioneFunction() {
    const values: z.infer<typeof formSchemaAddPrestazioni> = {
      operatore: form.watch("operatore"),
      prestazioni: form.watch("prestazioni"),
      sede: form.watch("sede"),
    };

    try {
      const result = await onSubmitCreatePrestazione(
        values,
        idPiano ?? "",
        idDente ?? ""
      );

      if (result === "ok") {
        toast({
          title: "Prestazione aggiunta",
          description: "Prestazione aggiunta con successo",
        });
        // redirect("clinica/pianoCura", RedirectType.replace);
      } else throw new Error();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Qualcosa è andato storto.",
        description: "Prestazione non aggiunta. Chiudi la modale e riprova",
      });
    }
  }

  // TIME PICKER INPUT

  const [dateInizio, setDateInizio] = React.useState<Date>();
  const [dateFine, setDateFine] = React.useState<Date>();
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Aggiungi prestazioni</AlertDialogTitle>
      </AlertDialogHeader>
      <StepperForm
        stepper={stepper}
        setStepper={setStepper}
        form={form}
        formSchema={formSchemaAddPrestazioni}
        // submitMethod={onSubmitCreatePrestazione}
        submitMethod={prestazioneFunction}
      >
        {stepper.at(0)?.status === EStatusStepper.CURRENT && (
          <AggiungiPrestazione form={form} />
        )}
        {stepper.at(1)?.status === EStatusStepper.CURRENT && (
          <AppuntamentoPrestazione
            form={form}
            dateInizio={dateInizio}
            setDateInizio={setDateInizio}
            dateFine={dateFine}
            setDateFine={setDateFine}
          />
        )}
      </StepperForm>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalAddPrestazionePianoCura;
