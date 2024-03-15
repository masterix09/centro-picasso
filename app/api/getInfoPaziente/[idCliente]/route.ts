import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(
  request: Request,
  { params }: { params: { idCliente: string } }
) {

  const operatori = await db.cliente.findFirst({
    where: {
      id: params.idCliente
    },
    select: {
id: true,
      nome: true,
      cognome: true,
      codice_fiscale: true
    }
  })

  console.log(operatori);

  
  return NextResponse.json(operatori);
}
