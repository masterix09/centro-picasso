import { getPazienti } from "@/actions/actions.clinica";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { json } from "stream/consumers";
import { v4 as uuidv4 } from 'uuid';

export async function POST(
  request: Request,
  { params }: { params: { idPiano: string } }
) {

  const body: {url: string[]} = await request.json();

  const { url } = body

  const array = url.map( (item) => {
    return {
      id: uuidv4(),
      url: item,
      pianoCuraId: params.idPiano ?? "",
      note: ""
    }
  })


  

  const data = array.forEach(async (item) => {
    await db.image.create({
        data: item
    })
})

  
  return NextResponse.json(data);
}
