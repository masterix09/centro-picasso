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

const formSchema = z.object({
  nome: z.string().min(2).max(50),
});

const ModalModificaSede = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idSede } = useStore((state) => state);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: idSede,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values);
    await updateSede(idSede, values.nome);
    handleCloseModal();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina sede</AlertDialogTitle>
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
            <AlertDialogCancel onClick={handleCloseModal}>
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
