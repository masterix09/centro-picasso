import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { sede: string } }
) {
//   const id = params.id;




const data = await db.prestazione.findMany({
  where: {
    sedeId: params.sede,
  },
  select: {
    id: true,
    nome: true,
    start: true,
    end: true,
    ora_arrivo: true,
    ora_saluta: true,
    data_appuntamento: true,
    operatore: {
      select: {
        id: true,
        colorAgenda: true,
      }
    },
    pianoCura: {
      select: {
        cliente: {
          select: {
            nome: true, cognome: true
          }
        }
      }
    }
  }
})


  

    // const data = getPazienti();

  
  return NextResponse.json(data);
}
