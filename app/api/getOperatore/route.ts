import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { idPiano: string } }
) {
//   const id = params.id;
  const data = await db.operatore.findMany({
    select: {
        id: true,
        cognome: true,
        nome: true,
        note: true,
        colorAgenda: true
    }
})
  

    // const data = getPazienti();

  
  return NextResponse.json(data);
}
