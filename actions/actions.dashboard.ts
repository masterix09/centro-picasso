"use server";

import { db } from "@/lib/db";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";

export const getAppuntamenti = async () => {
  const res = await db.prestazione.findMany({
    where: {
      data_appuntamento: format(new Date(), "dd-MM-yyyy"),
    },
    include: {
      pianoCura: {
        include: {
          cliente: true,
        },
      },
    },
  });

  revalidatePath("/dashboard", "page")

  return res
};

export const getClienti = async () => {
  const res =  await db.cliente.findMany({
    where: {
      Richiamo: {
        not: {
          equals: "Non Richiamare",
        },
      },
    },
  });
  revalidatePath("/dashboard", "page")

  return res
};

export const getCompleanni = async (currentDate: string
) => {
  const res =  await db.cliente.findMany({
    where: {
      data_nascita: {
        equals: currentDate,
      },
    },
  });
  revalidatePath("/dashboard", "page")

  return res
};
