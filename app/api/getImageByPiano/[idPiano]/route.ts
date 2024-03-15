import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { idPiano: string } }
) {

  const operatori = await db.image.findMany({
     where: {
      pianoCuraId: params.idPiano
     },
     select: {
      url: true
     }
    });

  
  return NextResponse.json(operatori);
}
