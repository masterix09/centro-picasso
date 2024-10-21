"use client";
import {
  addDataAppuntamento,
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
import React, { useEffect, useState, useTransition } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  start: z.string().min(2).max(50),
  end: z.string().min(2).max(50),
  date: z.date(),
});

const ModalImpostaOrario = ({ idPrestazione }: { idPrestazione: string }) => {
  const [data, setData] = useState<string>("");
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start: "",
      end: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      // const date: { data_appuntamento: string | null } | null =
      //   await getDataAppuntamentoPrestazioneById(idPrestazione);

      await processSubmit(
        format(values.date ?? "", "dd-MM-yyyy"),
        values.start,
        values.end
      );
    });
  }

  const processSubmit = async (
    data_appuntamento: string,
    startTime: string,
    endTime: string
  ) => {
    try {
      const resultDate = await addDataAppuntamento(
        idPrestazione,
        data_appuntamento
      );

      if (resultDate === "ok") {
        const formattedDate = data_appuntamento.split("-").reverse().join("-");
        const start = `${formattedDate}T${startTime}`;
        const end = `${formattedDate}T${endTime}`;
        const result = await addOrarioAppuntamento(idPrestazione, start, end);
        if (result === "ok") {
          toast({
            title: "Evento creato correttamente",
          });
        } else throw new Error();
      } else throw new Error();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Qualcosa e' andato storto.",
        description:
          "Evento non impostato correttamente. Prova a chiudere la modale e riprova",
      });
    }
  };

  const timeSlots: string[] = [
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ];

  const [date, setDate] = useState<Date>();

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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Seleziona orario di inizio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {timeSlots.map((item, idx) => {
                        return (
                          <SelectItem value={item} key={idx}>
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-fit">
                      <SelectValue placeholder="Seleziona orario di fine" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {timeSlots.map((item, idx) => {
                        return (
                          <SelectItem value={item} key={idx}>
                            {item}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Orario fine prestazione</FormLabel> */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? (
                        <span className="text-black">
                          {format(field.value, "PPP")}
                        </span>
                      ) : (
                        <span>Seleziona data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
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

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Loading" : "Imposta"}
            </Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

export default ModalImpostaOrario;
