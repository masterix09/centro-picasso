"use client";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createPrestazioneList } from "@/actions/actions.clinica";

const formSchema = z.object({
  titolo: z.string().min(2).max(50),
  categoria: z.string().min(2).max(50),
  forWho: z.string().min(2).max(50),
  costoDefault: z.string().transform((v) => Number(v) || 0),
  costoGentile: z.string().transform((v) => Number(v) || 0),
});

const ModalCreatePrestazione = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titolo: "",
      categoria: "",
      forWho: "",
      costoDefault: 0,
      costoGentile: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    createPrestazioneList(
      values.titolo,
      values.categoria,
      values.forWho,
      values.costoDefault,
      values.costoGentile
    );
  }

  return (
    <AlertDialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="titolo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titolo</FormLabel>
                <FormControl>
                  <Input placeholder="Titolo prestazione" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <Input placeholder="Categoria prestazione" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="forWho"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seleziona tipologia</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona un opzione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Denti">Denti</SelectItem>
                      <SelectItem value="Arcate">Arcate</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costoDefault"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo Default</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Costo Default" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="costoGentile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Costo Gentile</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Costo Gentile" {...field} />
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

export default ModalCreatePrestazione;
