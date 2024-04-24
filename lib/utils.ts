import { addPrestazionePianoCura, createPaziente, getPrestazioniByIdPiano } from "@/actions/actions.clinica";
import { toast } from "@/components/ui/use-toast";
import { ERichiamo } from "@/enum/types";
import useGetSearchParams from "@/utils/useGetSearchParams";
import { type ClassValue, clsx } from "clsx"
import { addMonths, addYears, format } from "date-fns";
import { revalidatePath } from "next/cache";
import { useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge"
import { z } from "zod";



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const formSchema: z.ZodObject<any, z.UnknownKeysParam, z.ZodTypeAny, {
  [x: string]: any;
}, {
  [x: string]: any;
}> = z.object({})


// 2. Define a submit handler.
export async function onSubmitCreatePaziente(values: z.infer<typeof formSchema >) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  // console.log(values);
  const {
    cap,
    cellulare,
    cf,
    citta,
    cognome,
    dataNascita,
    email,
    indirizzo,
    listino,
    luogoNascita,
    motivo,
    nome,
    professione,
    richiamo,
    sesso,
    straniero,
    telefono,
  } = values;

  const data = format(new Date(dataNascita), "yyyy-MM-dd");

  let dataRichiamo = "";
    if (richiamo === "NonRichiamare") {
      dataRichiamo = "";
    } else if (richiamo === "DopoUnMese") {
      dataRichiamo = format(addMonths(new Date(), 1), "yyyy-MM-dd")
    } else if (richiamo === "Dopo2mesi") {
      dataRichiamo = format(addMonths(new Date(), 2), "yyyy-MM-dd")
    } else if (richiamo === "Dopo3mesi") {
      dataRichiamo = format(addMonths(new Date(), 3), "yyyy-MM-dd")
    } else if (richiamo === "Dopo4mesi") {
      dataRichiamo = format(addMonths(new Date(), 4), "yyyy-MM-dd")
    } else if (richiamo === "Dopo6mesi") {
      dataRichiamo = format(addMonths(new Date(), 6), "yyyy-MM-dd")
    } else if (richiamo === "Dopo8mesi") {
      dataRichiamo = format(addMonths(new Date(), 8), "yyyy-MM-dd")
    } else if (richiamo === "Dopo1anno") {
      dataRichiamo = format(addYears(new Date(), 1), "yyyy-MM-dd")
    }


  const res = await createPaziente(
    nome,
    cognome,
    data,
    sesso,
    cf,
    straniero,
    luogoNascita,
    indirizzo,
    cap,
    citta,
    telefono,
    email,
    cellulare,
    motivo,
    listino,
    richiamo,
    dataRichiamo,
    professione
  );

  // if(res === "ok") {
  //   toast({
  //     title: "Paziente creato.",
  //     description:
  //       "Paziente creato correttamente.",
  //   });
  // } else {
  //   toast({
  //     variant: "destructive",
  //     title: "Uh Oh! Errore nella creazione.",
  //     description:
  //       "Errore nella creazione del paziente. Riprova",
  //   });
  // }
}
// 2. Define a submit handler.
export function onSubmitCreatePrestazione(values: z.infer<typeof formSchema >, idPiano: string, idDente: string) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.  
  return addPrestazionePianoCura(values.prestazioni, idPiano, idDente, values.sede, values.operatore)
}


// 2. Define a submit handler.
export function onSubmitCreateDocumento(values: z.infer<typeof formSchema >, idPiano: string, idDente: string) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.  
  addPrestazionePianoCura(values.prestazioni, idPiano, idDente, values.sede, values.operatore)
}


