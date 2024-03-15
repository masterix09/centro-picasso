"use client";
import {
  addDataAppuntamento,
  deletePrestazionePianoCuraById,
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

const ModalDataAppuntamento = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const { idPrestazione } = useStore((state) => state);
  const [date, setDate] = useState<Date>();

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
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
        <Button
          type="button"
          onClick={() => {
            const dateFormat = format(date ?? "", "yyyy-MM-dd");
            addDataAppuntamento(idPrestazione, dateFormat);
            handleCloseModal();
          }}
        >
          Submit
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalDataAppuntamento;
