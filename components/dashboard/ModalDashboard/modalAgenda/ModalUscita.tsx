"use client";
import {
  getPrestazioneAgendaById,
  setOrarioArrivo,
  setOrarioUscita,
} from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EFetchLabel } from "@/enum/types";

const formSchema = z.object({
  orario: z.string().min(2).max(50),
});

const ModalUscita = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idPrestazioneAgenda, setFetchLabel } = useStore((state) => state);
  const [data, setData] = useState<{
    categoria: string | null;
    nome: string | null;
    ora_arrivo: string | null;
    ora_saluta: string | null;
    operatore: {
      nome: string | null;
      id: string;
      cognome: string | null;
    };
    pianoCura: {
      cliente: {
        cognome: string | null;
        nome: string | null;
      };
    } | null;
  } | null>({
    categoria: "",
    nome: "",
    operatore: {
      cognome: "",
      id: "",
      nome: "",
    },
    ora_arrivo: "",
    ora_saluta: "",
    pianoCura: {
      cliente: {
        cognome: "",
        nome: "",
      },
    },
  });

  useEffect(() => {
    if (idPrestazioneAgenda) {
      getPrestazioneAgendaById(idPrestazioneAgenda).then((data) =>
        setData(data)
      );
    }
  }, [idPrestazioneAgenda]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orario: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await setOrarioUscita(values.orario, idPrestazioneAgenda);
    setFetchLabel(EFetchLabel.LISTA_EVENTI);
    handleCloseModal();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Imposta orario uscita paziente</AlertDialogTitle>
      </AlertDialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="orario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orario uscita paziente</FormLabel>
                <FormControl>
                  <Input placeholder="10:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseModal}>
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default ModalUscita;
