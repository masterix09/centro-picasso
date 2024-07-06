"use client";

import {
  deleteSedeById,
  getSede,
  getSedeById,
  updateSede,
} from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EFetchLabel } from "@/enum/types";
import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  nome: z.string().min(2).max(50),
});

const ModalModificaSede = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const searchParams = useSearchParams();
  const idSede = searchParams.get("idSede") ?? "";
  const { setFetchLabel } = useStore((state) => state);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updateSede(idSede, values.nome);
    if (res === "ok") {
      toast({
        title: "Modifica sede.",
        description: "Sede modificata correttamente.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh! Errore nella modifica.",
        description: "Errore nella modifica della sede. Riprova",
      });
    }
    setFetchLabel(EFetchLabel.LISTA_SEDI);
    form.reset();
    handleCloseModal();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Modifica sede</AlertDialogTitle>
      </AlertDialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome sede" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                form.reset();
                handleCloseModal();
              }}
            >
              Cancel
            </AlertDialogCancel>
            <Button type="submit">Submit</Button>
          </AlertDialogFooter>
        </form>
      </Form>

      {/* <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={() => {
            deleteSedeById(idSede);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter> */}
    </AlertDialogContent>
  );
};

export default ModalModificaSede;
