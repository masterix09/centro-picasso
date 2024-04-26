"use client";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { createPagamento } from "@/actions/actions.clinica";
import { DayPicker } from "react-day-picker";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  data: z.date({
    required_error: "Data pagamento richiesta.",
  }),

  note: z.string().min(2).max(50),
  importo: z.string().transform((v) => Number(v) || 0),
});

const ModalCreatePagamento = ({ idPiano }: { idPiano: string | null }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      note: "",
      importo: 0,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const data = format(new Date(values.data), "yyyy-MM-dd");
    const res = await createPagamento(
      data,
      values.importo,
      values.note,
      idPiano ?? ""
    );
    if (res === "ok") {
      toast({
        title: "Paziente creato.",
        description: "Paziente creato correttamente.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh! Errore nella creazione.",
        description: "Errore nella creazione del paziente. Riprova",
      });
    }
  }

  return (
    <AlertDialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="data"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data pagamento</FormLabel>
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
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input placeholder="Inserisci note..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="importo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Importo</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Inserisci importo"
                    {...field}
                  />
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

export default ModalCreatePagamento;
