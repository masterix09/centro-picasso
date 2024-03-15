"use client";
import { ESesso } from "@/enum/types";
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
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const AnagraficaPaziente = ({
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
      <div className="w-full md:w-1/2">
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
          name="sesso"
          render={({ field }) => (
            <FormItem className="space-x-3 flex items-center">
              <FormLabel>Sesso</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex items-center space-x-1"
                >
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value={ESesso.MASCHIO} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {ESesso.MASCHIO}
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3">
                    <FormControl>
                      <RadioGroupItem value={ESesso.FEMMINA} />
                    </FormControl>
                    <FormLabel className="font-normal">
                      {ESesso.FEMMINA}
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataNascita"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data di nascita</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Seleziona una data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="w-full relative p-0 m-0">
                    <DayPicker
                      captionLayout="dropdown-buttons"
                      fromYear={1926}
                      toYear={2060}
                      className="w-fit"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </div>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full">
        <FormField
          control={form.control}
          name="straniero"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-start gap-x-2 ">
              <div className="space-y-0.5">
                <FormLabel>Straniero</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="luogoNascita"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Luogo di nascita</FormLabel>
              <FormControl>
                <Input placeholder="Luogo di nascita" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codice Fiscale</FormLabel>
              <FormControl>
                <Input placeholder="Codice Fiscale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="indirizzo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Indirizzo</FormLabel>
              <FormControl>
                <Input placeholder="Indirizzo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cap"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cap</FormLabel>
              <FormControl>
                <Input placeholder="Cap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="citta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Città</FormLabel>
              <FormControl>
                <Input placeholder="Città" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AnagraficaPaziente;
