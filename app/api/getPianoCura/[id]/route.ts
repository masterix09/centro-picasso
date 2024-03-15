import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
//   const id = params.id;
  const data = await db.pianoCura.findMany( {
    where: {
      clienteId: params.id
    },
  })
  

    // const data = getPazienti();

  
  return NextResponse.json(data);
}
