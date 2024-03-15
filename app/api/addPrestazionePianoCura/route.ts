import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { idPiano: string } }
) {
//   const id = params.id;
  const data = await db.prestazioniLista.findMany()
  

    // const data = getPazienti();

  
  return NextResponse.json(data);
}
