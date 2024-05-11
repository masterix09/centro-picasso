"use client";
import { ERichiamo, ESesso } from "@/enum/types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const DettagliContattoPaziente = ({
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
    <ScrollArea className=" h-[400px] flex flex-row gap-y-4">
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="telefono"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefono</FormLabel>
            <FormControl>
              <Input placeholder="Telefono" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="cellulare"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cellulare</FormLabel>
            <FormControl>
              <Input placeholder="Cellulare" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="professione"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Professione</FormLabel>
            <FormControl>
              <Input placeholder="Professione" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="richiamo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Richiamo</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona richiamo" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(Object.keys(ERichiamo) as Array<keyof typeof ERichiamo>).map(
                  (item) => {
                    return (
                      <SelectItem value={item} key={item}>
                        {item}
                      </SelectItem>
                    );
                  }
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </ScrollArea>
  );
};

export default DettagliContattoPaziente;
