import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  getOperatoreByIdSede,
  getSedeInModalCreate,
} from "@/actions/actions.clinica";

const AppuntamentoPrestazione = ({
  form,
  dateFine,
  dateInizio,
  setDateFine,
  setDateInizio,
}: {
  form: UseFormReturn<
    {
      sede: string;
      operatore: string;
      prestazioni: string[];
    },
    any,
    undefined
  >;
  dateInizio: Date | undefined;
  dateFine: Date | undefined;
  setDateFine: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setDateInizio: React.Dispatch<React.SetStateAction<Date | undefined>>;
}) => {
  const [sede, setSede] = useState<{ id: string; nome: string }[]>([]);
  const [operatori, setOperatori] = useState<
    {
      operatore: { id: string; cognome: string | null; nome: string | null };
    }[]
  >([]);

  useEffect(() => {
    getSedeInModalCreate().then((data) => setSede(data));
  }, []);

  const watchSede = form.watch("sede");
  useEffect(() => {
    getOperatoreByIdSede(watchSede).then((data) => setOperatori(data));
  }, [watchSede]);

  return (
    <div className="w-full flex flex-col gap-y-5">
      <FormField
        control={form.control}
        name="sede"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sede</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona sede" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sede.map((item) => {
                  return (
                    <SelectItem key={item.id} value={item.nome ?? ""}>
                      {item.nome}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="operatore"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Operatore</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona operatore" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {operatori.map((item) => {
                  return (
                    <SelectItem
                      key={item.operatore.id}
                      value={`${item.operatore.id}` ?? ""}
                    >
                      {item.operatore.cognome} {item.operatore.nome}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <FormField
        control={form.control}
        name="data"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Data appuntamento</FormLabel>
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
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="inizio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ora inizio</FormLabel>
            <FormControl>
              <Input placeholder="Ora finizio" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="fine"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ora fine</FormLabel>
            <FormControl>
              <Input placeholder="Ora fine" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}
    </div>
  );
};

export default AppuntamentoPrestazione;
