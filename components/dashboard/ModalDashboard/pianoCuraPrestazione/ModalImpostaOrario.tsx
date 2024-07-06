"use client";
import {
  addOrarioAppuntamento,
  getDataAppuntamentoPrestazioneById,
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
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const formSchema = z.object({
  start: z.string().min(2).max(50),
  end: z.string().min(2).max(50),
});

const ModalImpostaOrario = ({ idPrestazione }: { idPrestazione: string }) => {
  // const { idPrestazione } = useStore((state) => state);
  const [data, setData] = useState<string>("");
  const { toast } = useToast();

  // useEffect(() => {
  //   getDataAppuntamentoPrestazioneById(idPrestazione).then((item) =>
  //     setData(item?.data_appuntamento ?? "")
  //   );
  // }, [idPrestazione]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "",
      end: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const date: { data_appuntamento: string | null } | null =
      await getDataAppuntamentoPrestazioneById(idPrestazione);
    await processSubmit(
      date?.data_appuntamento ?? "05-05-2023",
      values.start,
      values.end
    );
  }

  const processSubmit = async (
    data_appuntamento: string,
    startTime: string,
    endTime: string
  ) => {
    try {
      const formattedDate = data_appuntamento.split("-").reverse().join("-");
      const start = `${formattedDate}T${startTime}`;
      const end = `${formattedDate}T${endTime}`;
      const result = await addOrarioAppuntamento(idPrestazione, start, end);
      if (result === "ok") {
        toast({
          title: "Orario impostato correttamente",
        });
      } else throw new Error();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Qualcosa e' andato storto.",
        description:
          "Orario non impostato correttamente. Prova a chiudere la modale e riprova",
      });
    }
  };

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Imposta orario appuntamento</AlertDialogTitle>
      </AlertDialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orario inizio prestazione</FormLabel>
                <FormControl>
                  <Input placeholder="10:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Orario fine prestazione</FormLabel>
                <FormControl>
                  <Input placeholder="11:30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default ModalImpostaOrario;
