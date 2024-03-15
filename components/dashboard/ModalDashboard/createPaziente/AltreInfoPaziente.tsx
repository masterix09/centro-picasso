"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AltreInfoPaziente = ({
  form,
}: {
  form: UseFormReturn<
    {
      email: string;
      nome: string;
      cognome: string;
      sesso: string;
      dataNascita: Date;
      straniero: boolean;
      luogoNascita: string;
      cf: string;
      indirizzo: string;
      cap: string;
      citta: string;
      cellulare: string;
      telefono: string;
      professione: string;
      richiamo: string;
      motivo: string;
      listino: string;
    },
    any,
    undefined
  >;
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-x-6 gap-y-2">
      <div className="w-full">
        <FormField
          control={form.control}
          name="motivo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Motivo visita</FormLabel>
              <FormControl>
                <Input placeholder="Motivo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="listino"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listino</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona listino" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="gentile">Gentile</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AltreInfoPaziente;
