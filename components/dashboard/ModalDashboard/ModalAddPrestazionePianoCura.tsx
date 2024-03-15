"use client";
import { addPrestazionePianoCura } from "@/actions/actions.clinica";
import { TPrestazioneLista } from "@/app/(dashboard)/prestazioniLista/page";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, onSubmitCreatePrestazione } from "@/lib/utils";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Check, ChevronsUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";
import StepperForm, { TStepper } from "../common/StepperForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EStatusStepper } from "@/enum/types";
import AggiungiPrestazione from "./createPrestazione/AggiungiPrestazione";
import AppuntamentoPrestazione from "./createPrestazione/AppuntamentoPrestazione";
import { useStore } from "@/store/store";

const formSchemaAddPrestazioni = z.object({
  sede: z.string().min(2),
  operatore: z.string().min(2),
  // data: z.date({
  //   required_error: "Data richiesta.",
  // }),
  // inizio: z.string().min(2),
  // fine: z.string().min(2),
  prestazioni: z.array(z.string().min(2)),
});

const ModalAddPrestazionePianoCura = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchemaAddPrestazioni>>({
    resolver: zodResolver(formSchemaAddPrestazioni),
    defaultValues: {
      operatore: "",
      sede: "",
      prestazioni: [],
    },
  });
  const [data, setData] = useState<TPrestazioneLista[]>([]);
  const [sede, setSede] = useState<{ id: string; nome: string }[]>([]);
  const [prestazioni, setPrestazioni] = useState<TPrestazioneLista[]>([]);
  const [categoria, setCategoria] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState("");

  // const searchParams = useSearchParams();
  // const idPiano = searchParams.get("idPiano");
  // const idDente = searchParams.get("dente");

  const { idPiano, idDente } = useStore((state) => state);

  useEffect(() => {
    fetch("/api/getPrestazioniList/", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);

  useEffect(() => {
    fetch("/api/getSede", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setSede(data));
  }, []);

  const addPrestazione = (value: CheckedState, item: TPrestazioneLista) => {
    if (value === true) {
      setPrestazioni([...prestazioni, item]);
    }
    if (value === false) {
      const prestazioniFilter = prestazioni.filter((obj) => obj.id !== item.id);
      setPrestazioni(prestazioniFilter);
    }
  };

  // const handleAddPrestazioniToPianoCura = async () => {};

  const [stepper, setStepper] = useState<TStepper[]>([
    { name: "Step 1", href: "#", status: EStatusStepper.CURRENT },
    { name: "Step 2", href: "#", status: EStatusStepper.UPCOMING },
    // { name: "Step 3", href: "#", status: EStatusStepper.UPCOMING },
  ]);

  function prestazioneFunction() {
    const values: z.infer<typeof formSchemaAddPrestazioni> = {
      operatore: form.watch("operatore"),
      prestazioni: form.watch("prestazioni"),
      sede: form.watch("sede"),
    };
    onSubmitCreatePrestazione(values, idPiano ?? "", idDente ?? "");
  }

  // TIME PICKER INPUT

  const [dateInizio, setDateInizio] = React.useState<Date>();
  const [dateFine, setDateFine] = React.useState<Date>();
  return (
    // <AlertDialogContent>
    //   <div>
    //     <div className="w-full h-full flex">
    //       <div className="w-full md:w-1/3 md:border-r-2 border-r-gray-400">
    //         {data.map((item) => {
    //           return (
    //             <p
    //               key={item.id}
    //               className="my-2 bg-slate-200 shadow rounded px-2 w-fit"
    //               onClick={() => setCategoria(item.categoria as string)}
    //             >
    //               {item.categoria}
    //             </p>
    //           );
    //         })}
    //       </div>
    //       <div className="w-full md:w-2/3 ">
    //         {data.map((item) => {
    //           return (
    //             item.categoria === categoria && (
    //               <div className="items-top flex space-x-2">
    //                 <Checkbox
    //                   id="terms1"
    //                   onCheckedChange={(value) => addPrestazione(value, item)}
    //                 />
    //                 <div className="grid gap-1.5 leading-none">
    //                   <label
    //                     htmlFor="terms1"
    //                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    //                   >
    //                     {item.nome}
    //                   </label>
    //                 </div>
    //               </div>
    //             )
    //           );
    //         })}
    //       </div>
    //     </div>
    //   </div>

    //   <Popover open={open} onOpenChange={setOpen}>
    //     <PopoverTrigger asChild>
    //       <Button
    //         variant="outline"
    //         role="combobox"
    //         aria-expanded={open}
    //         className="w-[200px] justify-between"
    //       >
    //         {value
    //           ? sede.find((framework) => framework.nome === value)?.nome
    //           : "Seleziona sede..."}
    //         <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
    //       </Button>
    //     </PopoverTrigger>
    //     <PopoverContent className="w-[200px] p-0">
    //       <Command>
    //         <CommandInput placeholder="Search framework..." />
    //         <CommandEmpty>Nessuna sede trovata.</CommandEmpty>
    //         <CommandGroup>
    //           {sede.map((framework) => (
    //             <CommandItem
    //               key={framework.id}
    //               value={framework.nome}
    //               onSelect={(currentValue) => {
    //                 setValue(currentValue === value ? "" : currentValue);
    //                 setOpen(false);
    //               }}
    //             >
    //               <Check
    //                 className={cn(
    //                   "mr-2 h-4 w-4",
    //                   value === framework.nome ? "opacity-100" : "opacity-0"
    //                 )}
    //               />
    //               {framework.nome}
    //             </CommandItem>
    //           ))}
    //         </CommandGroup>
    //       </Command>
    //     </PopoverContent>
    //   </Popover>

    //   <AlertDialogFooter>
    //     <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
    //     <AlertDialogAction onClick={handleAddPrestazioniToPianoCura}>
    //       Continue
    //     </AlertDialogAction>
    //   </AlertDialogFooter>
    // </AlertDialogContent>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Aggiungi prestazioni</AlertDialogTitle>
      </AlertDialogHeader>
      <StepperForm
        stepper={stepper}
        setStepper={setStepper}
        form={form}
        formSchema={formSchemaAddPrestazioni}
        // submitMethod={onSubmitCreatePrestazione}
        submitMethod={prestazioneFunction}
      >
        {stepper.at(0)?.status === EStatusStepper.CURRENT && (
          <AggiungiPrestazione form={form} />
        )}
        {stepper.at(1)?.status === EStatusStepper.CURRENT && (
          <AppuntamentoPrestazione
            form={form}
            dateInizio={dateInizio}
            setDateInizio={setDateInizio}
            dateFine={dateFine}
            setDateFine={setDateFine}
          />
        )}
        {/* {stepper.at(2)?.status === EStatusStepper.CURRENT && (
          <AltreInfoPaziente form={form} />
        )} */}
      </StepperForm>

      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalAddPrestazionePianoCura;
