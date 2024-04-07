"use client";
import {
  getOperatoreById,
  getSede,
  updateOperatoreById,
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
import { PickerExample } from "../../PickerExample";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MultiSelect } from "../../MultiSelect";
import { EFetchLabel } from "@/enum/types";

const formSchema = z.object({
  nome: z.string().min(2).max(50),
  cognome: z.string().min(2).max(50),
  colore: z.string(),
  sede: z.array(z.string().min(2)),
});

const ModalModificaOperatore = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const [sede, setSede] = useState<{ id: string; nome: string }[]>([]);
  const [operatore, setOperatore] = useState<{
    nome: string;
    cognome: string;
    colore: string;
    sede: string[];
  }>({
    cognome: "",
    colore: "",
    nome: "",
    sede: [],
  });
  const [colore, setColore] = useState(operatore.colore);

  const { idOperatore, setFetchLabel } = useStore((state) => state);

  useEffect(() => {
    // Quando il componente si monta, richiama la funzione per ottenere i dati
    getSede().then((data) => setSede(data));
  }, []);

  useEffect(() => {
    // Quando il componente si monta, richiama la funzione per ottenere i dati
    getOperatoreById(idOperatore).then((data) => setOperatore(data));
    setColore(operatore.colore);
  }, [idOperatore, operatore.colore]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cognome: "",
      colore: colore,
      sede: [],
    },
    values: operatore,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // createOperatore(values.nome, values.cognome, colore, values.sede);
    updateOperatoreById(idOperatore, values.nome, values.cognome, colore);
    setFetchLabel(EFetchLabel.LISTA_OPERATORI);
    handleCloseModal();
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Elmina operatore</AlertDialogTitle>
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
                  <Input placeholder="Nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cognome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cognome</FormLabel>
                <FormControl>
                  <Input placeholder="Cognome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colore</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Colore" {...field} /> */}
                  <PickerExample
                    background={colore}
                    setBackground={setColore}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sede"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sede</FormLabel>
                <FormControl>
                  <MultiSelect
                    selected={field.value}
                    options={sede.map((item) => {
                      return {
                        value: item.id,
                        label: item.nome,
                      };
                    })}
                    {...field}
                    className="sm:w-[510px]"
                  />
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
            deleteOperatoreById(idOperatore);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter> */}
    </AlertDialogContent>
  );
};

export default ModalModificaOperatore;
