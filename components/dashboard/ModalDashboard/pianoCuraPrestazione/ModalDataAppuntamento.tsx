"use client";
import { addDataAppuntamento } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState, useTransition } from "react";
import { DayPicker } from "react-day-picker";
import { useToast } from "@/components/ui/use-toast";

const ModalDataAppuntamento = ({
  idPrestazione,
}: {
  idPrestazione: string;
}) => {
  // const { idPrestazione } = useStore((state) => state);
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Imposta data appuntamento</AlertDialogTitle>
      </AlertDialogHeader>

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
            {date ? format(date, "PPP") : <span>Seleziona data</span>}
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
              selected={date}
              onSelect={setDate}
            />
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button
          type="button"
          disabled={isPending}
          onClick={async () => {
            try {
              startTransition(async () => {
                const dateFormat = format(date ?? "", "dd-MM-yyyy");
                const result = await addDataAppuntamento(
                  idPrestazione,
                  dateFormat
                );

                if (result === "ok") {
                  toast({
                    title: "Data appuntamento impostata correttamente",
                    description:
                      "La data del tuo appuntamento e' stata impostata correttamente.",
                  });
                } else throw new Error();
              });
            } catch (error) {
              toast({
                variant: "destructive",
                title: "Uh oh! Qualcosa e' andato storto.",
                description:
                  "Data non impostat correttamente. Chiudi la modale e riprova ",
              });
            }
          }}
        >
          {isPending ? "Loading" : "Imposta"}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDataAppuntamento;
