"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const getListaPazienti = async () => {
    return await db.cliente.findMany(
        {
            select: {
                id: true,
                nome: true,
                cognome: true,
                codice_fiscale: true,
                data_nascita: true
            }
        }
    )
}



export const deletePaziente = async (idPaziente: string) => {

    try {

        const idPiano: {id: string}[] = await db.pianoCura.findMany({
            where: {
                clienteId: idPaziente
            },
            select: {
                id: true
            }
        })

        const pianoIds = idPiano.map(item => {
            return item.id
        })

        // await db.pagamenti.deleteMany({
        //     where: {
        //         id: {
        //             in: pianoIds
        //         }
        //     }
        // })
        // await db.image.deleteMany({
        //     where: {
        //         id: {
        //             in: pianoIds
        //         }
        //     }
        // })
        // await db.documenti.deleteMany({
        //     where: {
        //         id: {
        //             in: pianoIds
        //         }
        //     }
        // })
        // await db.prestazione.deleteMany({
        //     where: {
        //         id: {
        //             in: pianoIds
        //         }
        //     }
        // })
        await db.pianoCura.deleteMany({
            where: {
                id: {
                    in: pianoIds
                }
            }
        })

        await db.cliente.delete({
            where: {
                id: idPaziente
            }
        })

        
        
        revalidatePath("/listaPazienti", "page")
        return "ok"
        
    } catch (error) {
        
        return "error"
    }
}