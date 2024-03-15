"use client";
import {
  getPrestazioneAgendaById,
  setOrarioArrivo,
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

const formSchema = z.object({
  orario: z.string().min(2).max(50),
});

const ModalArrivo = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idPrestazioneAgenda } = useStore((state) => state);
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
    };
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    await setOrarioArrivo(values.orario, idPrestazioneAgenda);
    handleCloseModal();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Imposta orario arrivo paziente</AlertDialogTitle>
      </AlertDialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="orario"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orario arivo paziente</FormLabel>
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

export default ModalArrivo;
