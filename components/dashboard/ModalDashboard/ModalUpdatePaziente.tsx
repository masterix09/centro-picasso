"use client";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EFetchLabel, ESesso, EStatusStepper } from "@/enum/types";
import StepperForm, { TStepper } from "../common/StepperForm";
import AnagraficaPaziente from "./createPaziente/AnagraficaPaziente";
import DettagliContattoPaziente from "./createPaziente/DettagliContattoPaziente";
import AltreInfoPaziente from "./createPaziente/AltreInfoPaziente";
import {
  cn,
  onSubmitCreatePaziente,
  onSubmitUpdatePaziente,
} from "@/lib/utils";
import { useStore } from "@/store/store";
import Image from "next/image";
import loaderImg from "@/public/animation.gif";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams, useSearchParams } from "next/navigation";
import { getPazienteById } from "@/actions/actions.clinica";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { it } from "date-fns/locale/it";

export const formSchemaCreatePaziente = z.object({
  nome: z.string().min(2, "Inserisci almeno 2 caratteri").max(50),
  cognome: z.string().min(2, "Inserisci almeno 2 caratteri").max(50),
  sesso: z.string().min(2),
  dataNascita: z.date(),
  straniero: z.boolean(),
  luogoNascita: z.string(),
  cf: z.string(),
  indirizzo: z.string(),
  cap: z.string(),
  citta: z.string(),
  email: z.string(),
  cellulare: z.string().default(""),
  telefono: z.string().default(""),
  professione: z.string(),
  richiamo: z.string().min(2),
  motivo: z.string(),
  listino: z.string().min(2),
});

const ModalUpdatePaziente = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { setFetchLabel } = useStore((state) => state);
  const [loading, setLoading] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();

  const [data, setData] = useState<{
    CAP: string | null;
    codice_fiscale: string | null;
    citta: string | null;
    cognome: string | null;
    indirizzo: string | null;
    luogo_nascita: string | null;
    nome: string | null;
    straniero: boolean | null;
    sesso: string | null;
    email: string | null;
    data_richiamo: string | null;
    Listino: string | null;
    data_nascita: string | null;
  }>();

  const { idCliente } = useStore((state) => state);

  useEffect(() => {
    if (idCliente) {
      getPazienteById(idCliente).then((res) => {
        setData(res.at(0));
      });
      // form.reset({
      //   cap: data?.CAP ?? "",
      //   cognome: data?.cognome ?? "",
      //   // cellulare: "",
      //   cf: data?.codice_fiscale ?? "",
      //   citta: data?.citta ?? "",
      //   dataNascita: new Date(),
      //   // email: data?.email ?? "",
      //   indirizzo: data?.indirizzo ?? "",
      //   // listino: data?.Listino ?? "",
      //   luogoNascita: data?.luogo_nascita ?? "",
      //   // motivo: "",
      //   nome: data?.nome ?? "",
      //   // professione: "",
      //   // richiamo: data?.data_richiamo ?? "",
      //   sesso: ESesso.MASCHIO,
      //   straniero: false,
      //   // telefono: "",
      // });
    }
  }, [data, idCliente]);

  const form = useForm<z.infer<typeof formSchemaCreatePaziente>>({
    resolver: zodResolver(formSchemaCreatePaziente),
    defaultValues: () =>
      getPazienteById(idCliente).then((res) => {
        return {
          cap: res?.at(0)?.CAP ?? "",
          cognome: res?.at(0)?.cognome ?? "",
          cellulare: res?.at(0)?.cellulare ?? "",
          cf: res?.at(0)?.codice_fiscale ?? "",
          citta: res?.at(0)?.citta ?? "",
          dataNascita: new Date(),
          email: data?.email ?? "",
          indirizzo: res?.at(0)?.indirizzo ?? "",
          listino: data?.Listino ?? "",
          luogoNascita: res?.at(0)?.luogo_nascita ?? "",
          motivo: res?.at(0)?.Motivo ?? "",
          nome: res?.at(0)?.nome ?? "",
          professione: res?.at(0)?.Professione ?? "",
          richiamo: data?.data_richiamo ?? "",
          sesso: res?.at(0)?.sesso ?? ESesso.MASCHIO,
          straniero: res?.at(0)?.straniero ?? false,
          telefono: res?.at(0)?.Telefono ?? "",
        };
      }),
  });

  const [stepper, setStepper] = useState<TStepper[]>([
    { name: "Step 1", href: "#", status: EStatusStepper.CURRENT },
    { name: "Step 2", href: "#", status: EStatusStepper.UPCOMING },
    { name: "Step 3", href: "#", status: EStatusStepper.UPCOMING },
  ]);

  const handleSubmit = (values: z.infer<typeof formSchemaCreatePaziente>) => {
    startTransition(async () => {
      onSubmitUpdatePaziente(values, idCliente);
      setFetchLabel(EFetchLabel.LISTA_PAZIENTI);
    });
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
        <AlertDialogTitle>Modifica paziente</AlertDialogTitle>
      </AlertDialogHeader>
      <StepperForm
        stepper={stepper}
        setStepper={setStepper}
        form={form}
        formSchema={formSchemaCreatePaziente}
        submitMethod={handleSubmit}
      >
        {isPending && (
          <Image
            src={loaderImg}
            alt="loader"
            priority
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {stepper.at(0)?.status === EStatusStepper.CURRENT && !isPending && (
          <AnagraficaPaziente form={form} />
        )}
        {stepper.at(1)?.status === EStatusStepper.CURRENT && !isPending && (
          <DettagliContattoPaziente form={form} />
        )}
        {stepper.at(2)?.status === EStatusStepper.CURRENT && !isPending && (
          <AltreInfoPaziente form={form} />
        )}
      </StepperForm>

      <AlertDialogFooter>
        <ScrollArea className="flex w-full flex-col h-[100px]">
          {form.formState.errors.cap !== undefined && (
            <p className="text-sm text-red-500">Controlla cap</p>
          )}
          {/* {form.formState.errors.cellulare !== undefined && (
            <p className="text-sm text-red-500">Controlla cellulare</p>
          )} */}
          {form.formState.errors.cf !== undefined && (
            <p className="text-sm text-red-500">Controlla cf</p>
          )}
          {form.formState.errors.citta !== undefined && (
            <p className="text-sm text-red-500">Controlla citta</p>
          )}
          {form.formState.errors.cognome !== undefined && (
            <p className="text-sm text-red-500">Controlla cognome</p>
          )}
          {form.formState.errors.dataNascita !== undefined && (
            <p className="text-sm text-red-500">Controlla data nascita</p>
          )}
          {/* {form.formState.errors.email !== undefined && (
            <p className="text-sm text-red-500">Controlla email</p>
          )} */}
          {form.formState.errors.indirizzo !== undefined && (
            <p className="text-sm text-red-500">Controlla indirizzo</p>
          )}
          {/* {form.formState.errors.listino !== undefined && (
            <p className="text-sm text-red-500">Controlla listino</p>
          )} */}
          {form.formState.errors.luogoNascita !== undefined && (
            <p className="text-sm text-red-500">Controlla luogo di nascita</p>
          )}
          {/* {form.formState.errors.motivo !== undefined && (
            <p className="text-sm text-red-500">Controlla motivo</p>
          )} */}
          {form.formState.errors.nome !== undefined && (
            <p className="text-sm text-red-500">Controlla nome</p>
          )}
          {/* {form.formState.errors.professione !== undefined && (
            <p className="text-sm text-red-500">Controlla professione</p>
          )} */}
          {/* {form.formState.errors.richiamo !== undefined && (
            <p className="text-sm text-red-500">Controlla richiamo</p>
          )} */}
          {/* {form.formState.errors.telefono !== undefined && (
            <p className="text-sm text-red-500">Controlla telefono</p>
          )} */}
        </ScrollArea>
        <AlertDialogCancel
          onClickCapture={handleCloseModal}
          // onClickCapture={() => {
          //   form.reset();
          //   setStepper([
          //     { name: "Step 1", href: "#", status: EStatusStepper.CURRENT },
          //     { name: "Step 2", href: "#", status: EStatusStepper.UPCOMING },
          //     { name: "Step 3", href: "#", status: EStatusStepper.UPCOMING },
          //   ]);
          // }}
        >
          Cancel
        </AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalUpdatePaziente;
