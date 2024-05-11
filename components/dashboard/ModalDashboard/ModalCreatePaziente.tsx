"use client";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EFetchLabel, ESesso, EStatusStepper } from "@/enum/types";
import StepperForm, { TStepper } from "../common/StepperForm";
import AnagraficaPaziente from "./createPaziente/AnagraficaPaziente";
import DettagliContattoPaziente from "./createPaziente/DettagliContattoPaziente";
import AltreInfoPaziente from "./createPaziente/AltreInfoPaziente";
import { onSubmitCreatePaziente } from "@/lib/utils";
import { useStore } from "@/store/store";
import Image from "next/image";
import loaderImg from "@/public/animation.gif";

export const formSchemaCreatePaziente = z.object({
  nome: z.string().min(2, "Inserisci almeno 2 caratteri").max(50),
  cognome: z.string().min(2, "Inserisci almeno 2 caratteri").max(50),
  sesso: z.string().min(2),
  dataNascita: z.date({
    required_error: "Data di nascita richiesta.",
  }),
  straniero: z.boolean(),
  luogoNascita: z.string().min(4, "Inserisci almeno 4 caratteri"),
  cf: z.string().min(9, "Inserisci almeno 10 caratteri"),
  indirizzo: z.string().min(5, "Inserisci almeno 5 caratteri"),
  cap: z
    .string()
    .min(5, "Inserisci almeno 5 caratteri")
    .max(5, "Numero di caratteri massimo consentito 5"),
  citta: z.string().min(4, "Inserisci almeno 4 caratteri"),
  email: z.string().email("Non e una mail valida").min(2),
  cellulare: z.string().min(9, "Inserisci almeno 9 caratteri").max(11),
  telefono: z.string().min(9, "Inserisci almeno 9 caratteri").max(11),
  professione: z.string().min(4, "Inserisci almeno 4 caratteri"),
  richiamo: z.string().min(2),
  motivo: z.string().min(2, "Inserisci almeno 2 caratteri"),
  listino: z.string().min(2),
});

const ModalCreatePaziente = () => {
  const { setFetchLabel } = useStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchemaCreatePaziente>>({
    resolver: zodResolver(formSchemaCreatePaziente),
    defaultValues: {
      cap: "",
      cf: "",
      citta: "",
      cognome: "",
      indirizzo: "",
      luogoNascita: "",
      nome: "",
      straniero: false,
      sesso: ESesso.MASCHIO,
      email: "",
      professione: "",
      richiamo: "",
      motivo: "",
      listino: "",
    },
  });

  const [stepper, setStepper] = useState<TStepper[]>([
    { name: "Step 1", href: "#", status: EStatusStepper.CURRENT },
    { name: "Step 2", href: "#", status: EStatusStepper.UPCOMING },
    { name: "Step 3", href: "#", status: EStatusStepper.UPCOMING },
  ]);

  const handleSubmit = (values: z.infer<typeof formSchemaCreatePaziente>) => {
    setLoading(true);
    onSubmitCreatePaziente(values);
    setFetchLabel(EFetchLabel.LISTA_PAZIENTI);
    setLoading(false);
  };

  if (loading) {
    return (
      <Image
        src={loaderImg}
        alt="loader"
        priority
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  }
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Crea un nuovo paziente</AlertDialogTitle>
      </AlertDialogHeader>
      <StepperForm
        stepper={stepper}
        setStepper={setStepper}
        form={form}
        formSchema={formSchemaCreatePaziente}
        submitMethod={handleSubmit}
      >
        {stepper.at(0)?.status === EStatusStepper.CURRENT && (
          <AnagraficaPaziente form={form} />
        )}
        {stepper.at(1)?.status === EStatusStepper.CURRENT && (
          <DettagliContattoPaziente form={form} />
        )}
        {stepper.at(2)?.status === EStatusStepper.CURRENT && (
          <AltreInfoPaziente form={form} />
        )}
      </StepperForm>

      <AlertDialogFooter>
        <AlertDialogCancel
          onClickCapture={() => {
            form.reset();
            setStepper([
              { name: "Step 1", href: "#", status: EStatusStepper.CURRENT },
              { name: "Step 2", href: "#", status: EStatusStepper.UPCOMING },
              { name: "Step 3", href: "#", status: EStatusStepper.UPCOMING },
            ]);
          }}
        >
          Cancel
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalCreatePaziente;
