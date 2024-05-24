"use server"

import { db } from "@/lib/db";
import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { ESesso } from "@/enum/types";
import { revalidatePath } from "next/cache";


const formSchemaCreatePaziente = z.object({
    nome: z.string().min(2, "Inserisci almeno 2 caratteri").max(50),
    cognome: z.string().min(2, "Inserisci almeno 2 caratteri").max(50),
    sesso: z.string().min(2),
    dataNascita: z.date({
      required_error: "Data di nascita richiesta.",
    }),
    straniero: z.boolean(),
    luogoNascita: z.string().min(4, "Inserisci almeno 4 caratteri"),
    cf: z.string().min(9, "Inserisci almeno 10 caratteri"),
    indirizzo: z.string().min(5, "Inserisci almeno 5 caratteri"),
    cap: z
      .string()
      .min(5, "Inserisci almeno 5 caratteri")
      .max(5, "Numero di caratteri massimo consentito 5"),
    citta: z.string().min(4, "Inserisci almeno 4 caratteri"),
    email: z.string().email("Non e una mail valida").min(2),
    cellulare: z.string().min(9, "Inserisci almeno 9 caratteri").max(11),
    telefono: z.string().min(9, "Inserisci almeno 9 caratteri").max(11),
    professione: z.string().min(4, "Inserisci almeno 4 caratteri"),
    richiamo: z.string().min(2),
    motivo: z.string().min(2, "Inserisci almeno 2 caratteri"),
    listino: z.string().min(2),
  });

  export async function useCreatePaziente(
    prevState: any,
    formData: FormData
  ) {

    console.log("ueue")
    const validatedFields: any = formSchemaCreatePaziente.safeParse({
        nome: formData.get("nome"),
        cognome: formData.get("cognome"),
        sesso: formData.get("sesso"),
        dataNascita: formData.get("dataNascita"),
        straniero: formData.get("straniero"),
        luogoNascita: formData.get("luogoNascita"),
        cf: formData.get("cf"),
        indirizzo: formData.get("indirizzo"),
        cap: formData.get("cap"),
        citta: formData.get("citta"),
        email: formData.get("email"),
        cellulare: formData.get("cellulare"),
        telefono: formData.get("telefono"),
        professione: formData.get("professione"),
        richiamo: formData.get("richiamo"),
        motivo: formData.get("motivo"),
        listino: formData.get("listino"),
      });

      if (!validatedFields.success) {
        return validatedFields.error.format();
      }

      try {
        const res = await db.cliente.create({
            data: {
                id: uuidv4(),
                CAP: formData.get("cap")?.toString(),
                cellulare: formData.get("cellulare")?.toString(),
                citta: formData.get("citta")?.toString(),
                codice_fiscale: formData.get("cf")?.toString(),
                cognome: formData.get("cognome")?.toString(),
                data_nascita: formData.get("dataNascita")?.toString(),
                data_richiamo: formData.get("dataRichiamo")?.toString(),
                email: formData.get("email")?.toString(),
                indirizzo: formData.get("indirizzo")?.toString(),
                Listino: formData.get("listino")?.toString(),
                luogo_nascita: formData.get("luogoNascita")?.toString(),
                Motivo: formData.get("motivo")?.toString(),
                nome: formData.get("nome")?.toString(),
                Professione: formData.get("professione")?.toString(),
                Richiamo: formData.get("richiamo")?.toString(),
                sesso: formData.get("sesso")?.toString(),
                straniero: false,
                Telefono: formData.get("telefono")?.toString(),
            }
        })
    revalidatePath("/clinica/pianoCura", "layout")
        return {
          ...res,
          statusAction: "PASSED",
        };
      } catch (error: any) {
        return {
          statusAction: error.toString(),
        };
      }
  }