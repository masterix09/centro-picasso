import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

export async function GET(
  request: Request,
  { params }: { params: { idPiano: string } }
) {
//   const id = params.id;
  const data = await db.prestazione.findMany({
    where: {
      pianoCuraId: params.idPiano
    }
  })

  console.log(data);
  

    // const data = getPazienti();

  
  return NextResponse.json(data);
}
