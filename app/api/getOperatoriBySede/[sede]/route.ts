import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sede: string } }
) {

  const operatori = await db.operatoreOnSede.findMany({
      where: {
        sede : {
          nome: params.sede
        }
      },
      select: {
        operatore: {
          select: {
            id: true,
            cognome: true,
            nome: true,
          },
        },
      },
    });

  
  return NextResponse.json(operatori);
}
