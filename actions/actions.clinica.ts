"use server"

import { TPrestazioneLista } from "@/app/(dashboard)/prestazioniLista/page";
import { db } from "@/lib/db"
import { EStatusPrestazione } from "@/types";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from 'uuid';

export async function getPazienti () {
    const res =  await db.cliente.findMany()
    revalidatePath("/clinica/pianoCura", "layout")
    return res
}

export async function getInfoPazienteByIdAnagrafica(idCliente: string) {
    const res = await db.cliente.findFirst({
        where: {
            id: idCliente
        },
        select: {
            nome: true,
            cognome: true,
            email: true,
            data_nascita: true,
            Telefono: true,
            CAP: true,
            citta: true,
            codice_fiscale: true,
            indirizzo: true,
            Listino: true,
            luogo_nascita: true,
            Motivo: true,
            Richiamo: true,
            Professione: true,
            sesso: true,
            straniero: true
        }
    })


    return res
}

export async function getPrestazioniAgenda(idSede: string) {
    console.log(idSede)
    return await db.prestazione.findMany({
        where: {
          sedeId: idSede,
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
              cognome: true,
              nome: true
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
}

export async function createPianoCura (titolo: string, clienteId: string) {

    try {
        await db.pianoCura.create({
            data: {
                titolo,
                id: uuidv4(),
            clienteId: clienteId,
               
            }
        })
    
        revalidatePath("/clinica/pianoCura")
        return "ok"
    } catch (error: any) {
        return error.toString()
    }
        

       
    
}

export async function getPrestazioniList () {
    revalidatePath("/clinina/pianoCura")
    return await db.prestazioniLista.findMany();

}

export async function getPrestazioniListInPage () {
    revalidatePath("/prestazioniLista")
    return await db.prestazioniLista.findMany();

}

export async function addPrestazionePianoCura (array: string[], idPiano: string, idDente: string, sede: string, operatoreId: string) {

    try {

        const prestazioni: TPrestazioneLista[] = await db.prestazioniLista.findMany({
            where: {
                id: {
                    in: [...array]
                }
            }
        })

        const prestazioniAdd = prestazioni.map( (item) => {
            return {
                id: uuidv4(),
                nome: item.nome,
                categoria: item.categoria,
                status: EStatusPrestazione.Prescritto,
                createdAt: "",
                costoGentile: Number(item.costoGentile),
                costoDefault: Number(item.costoDefault),
                pianoCuraId: idPiano,
                operatoreId: operatoreId,
                denteId: String(idDente),
                sedeId: sede ?? ""
            }
        })
              
          prestazioniAdd.forEach(async (item) => {
            await db.prestazione.create({
                data: item,
            })
        })
    
        revalidatePath("/clinica/pianoCura")
        
        return "ok"
        
    } catch (error: any) {
        return error.toString()
    }

   
}

export async function createPrestazioneList (titolo: string, categoria: string, forWho: string, costoDefault: number, costoGentile: number) {
    
    try {
        await db.prestazioniLista.create({
            data: {
                id: uuidv4(),
                nome: titolo,
                categoria,
                forWho,
                costoGentile,
                costoDefault,
            }
        })
    
        revalidatePath("/prestazioniLista")

        return "ok"
    } catch (error: any) {
        return error.toString()
    }
    
    
}


export async function createOperatore (nome: string, cognome: string, colore: string, sede: string[]) {

    
    try {
        const idOperatore = uuidv4();

        await db.operatore.create({
            data: {
                id: idOperatore,
                nome,
                cognome,
                colorAgenda: colore,
            }
        })
    
        const temp = sede.map( (item) => {
            return {
                operatoreId: idOperatore,
                sedeId: item,
            }
        })
    
    
          temp.forEach(async (item) => {
            await db.operatoreOnSede.create({
                data: {
                    operatoreId: item.operatoreId,
                    sedeId: item.sedeId
                }
            })
        })
    
        revalidatePath("/operatoriLista")

        return "ok"
    } catch (error: any) {
        return error.toString()
    }
    
   
}

export async function getSede () {
    const res =  await db.sede.findMany({
        select: {
            id: true,
            nome: true
        }
    })

    revalidatePath("/sediLista")
    return res

}

export async function getSedeInModalCreate () {
    const res =  await db.sede.findMany({
        select: {
            id: true,
            nome: true
        }
    })

    revalidatePath("/clinica/pianoCura")
    return res

}

export async function createSede (nome: string) {
    await db.sede.create({
        data: {
            id: nome,
            nome
        }
    })

    revalidatePath("/sediLista")
}

export async function createPagamento (data: string, importo: number, note: string, idPiano: string) {
    
    try {
        await db.pagamenti.create({
            data: {
                id: uuidv4(),
                createdAt: data,
                importo: importo,
                note,
                pianoCuraId: idPiano
            }
        })
    
        revalidatePath("/clinica/preventivo")
        return "ok"
        
    } catch (error: any) {
        return error.toString()
    }
        
    
}

export async function createPaziente (nome: string, cognome: string, dataNascita: string, sesso: string, cf: string, straniero: boolean, luogoNascita: string, indirizzo: string, cap: string, citta: string, telefono: string, email: string, cellulare: string, motivo: string, listino: string, richiamo: string, dataRichiamo: string, professione: string) {
    
    try {

        await db.cliente.create({
            data: {
                id: uuidv4(),
                CAP: cap,
                cellulare,
                citta,
                codice_fiscale: cf,
                cognome,
                data_nascita: dataNascita,
                data_richiamo: dataRichiamo,
                email,
                indirizzo,
                Listino: listino,
                luogo_nascita: luogoNascita,
                Motivo: motivo,
                nome,
                Professione: professione,
                Richiamo: richiamo,
                sesso,
                straniero: straniero,
                Telefono: telefono,
            }
        })
    revalidatePath("/clinica/pianoCura", "layout")
    return "ok"
        
    } catch (error: any) {
        return error.toString()
    }
        
    
    
    


}

export async function createImage (array: string[], idPiano: string) {

    try {
        const obj = array.map( (item) => {
            return {
              id: uuidv4(),
              url: item,
              pianoCuraId: idPiano,
              note: ""
            }
          })
       
        obj.forEach(async (item) => {
            await db.image.create({
                data: item,
            })
        })
    
        revalidatePath("/clinica/pianoCura")
        return "ok"
        
    } catch (error: any) {
        return error.toString()
    }

   
}


export async function createDocumento (idPiano: string, nome: string) {

    try {
        await db.documenti.create({
            data: {
                id: uuidv4(),
                nome,
                createdAt: format(new Date(), "dd-MM-yyyy"),
                url: "",
                pianoCuraId: idPiano
            }
        })
        revalidatePath("/clinica/documenti")

        return "ok"    
    } catch (error: any) {
        return error.toString()
    }
    
}


export async function getOperatore () {
    return await db.operatore.findMany({
        select: {
            id: true,
            cognome: true,
            nome: true,
            note: true,
            colorAgenda: true
        }
    })
}


export async function updateNote (formData: FormData) {
    console.log(formData)
}

export async function getDocument (idPiano: string) {
    return await db.documenti.findMany({
        where: {
          pianoCuraId: idPiano,
        },
      });

     
}


export async function getPrestazioniByIdPiano (idPiano: string) {
    return  await db.prestazione.findMany({
        where: {
          pianoCuraId: idPiano,
        },
        select: {
          id: true,
          nome: true,
          categoria: true,
          denteId: true,
          costoDefault: true,
          costoGentile: true,
          status: true
        },
      });
}

export async function getPagamentiByIdPiano (idPiano: string) {
    return await db.pagamenti.findMany({
        where: {
          pianoCuraId: idPiano,
        },
        select: {
          id: true,
          createdAt: true,
          note: true,
          importo: true,
        },
      });
}

export async function getPrestazioneAgendaById (idPrestazione: string) {
    const res = await db.prestazione.findFirst({
        where: {
            id: idPrestazione
        },
        select: {
            categoria: true,
            nome: true,
            operatore: {
                select: {
                    nome: true,
                    cognome: true,
                    id: true
                }
            },
            pianoCura: {
                select: {
                    cliente: {
                        select: {
                            nome: true,
                            cognome: true
                        }
                    }
                }
            },
            ora_arrivo: true,
            ora_saluta: true
        }
    })
    return res
}


export async function setOrarioArrivo (orario: string, idPrestazione: string) {
    
    try {

        await db.prestazione.update({
            where: {
                id: idPrestazione,
            },
            data: {
                ora_arrivo: orario
            }
        })

        revalidatePath("/agenda")
        return "ok"
        
    } catch (error: any) {
        return error.toString()
    }
    
    
}

export async function setOrarioUscita (orario: string, idPrestazione: string) {
    
    try {
    
        await db.prestazione.update({
            where: {
                id: idPrestazione,
            },
            data: {
                ora_saluta: orario
            }
        })

        revalidatePath("/agenda")

        return "ok"
    } catch (error: any) {
        return error.toString()
    }
    
    
}


export async function deletePrestazionePianoCuraById (idPrestazione: string) {
    
    try {
        await db.prestazione.delete({
            where: {
                id: idPrestazione
            },
            
        })
        revalidatePath("/clinica/pianoCura")
        return "ok"
    } catch (error: any) {
        return error.toString()
    }
        
      
}

export async function addDataAppuntamento (idPerstazione: string, date: string) {
    try {
        
        await db.prestazione.update({
            where: {
                id: idPerstazione
            },
            data: {
                data_appuntamento: date
            }
        })

        revalidatePath("clinica/pianoCura")

        return "ok"
    } catch (error: any) {
        return error.toString()
    }
}

export async function addOrarioAppuntamento (idPerstazione: string, start: string, end: string) {
    try {
        
        
        await db.prestazione.update({
            where: {
                id: idPerstazione
            },
            data: {
                start,
                end
            }
        })
        return "ok"
    } catch (error: any) {
        return error.toString()
    }
}
export async function getDataAppuntamentoPrestazioneById (idPrestazione: string) {
    return await db.prestazione.findFirst({
        where: {
            id: idPrestazione
        },
        select: {
            data_appuntamento: true
        }
    })
}

export async function deleteOperatoreById (idOperatore: string) {
    
    try {

        await db.operatore.delete({
            where: {
                id: idOperatore
            }
        })

        return "ok"
        
    } catch (error: any) {
        return error.toString()
    }
    
    
}


export async function getOperatoreByIdSede (idSede: string) {
    revalidatePath("/clinica/pianoCura")
    return await db.operatoreOnSede.findMany({
        where: {
          sede : {
            nome: idSede
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
}

export async function getInfoPazienteById (idPaziente: string) {
    revalidatePath("/clinica/pianoCura")
    return await db.cliente.findFirst({
        where: {
          id: idPaziente
        },
        select: {
    id: true,
          nome: true,
          cognome: true,
          codice_fiscale: true
        }
      })
}

export async function getOperatoreById (idOperatore: string) {
    

    const data =  await db.operatoreOnSede.findMany({
        where: {
            operatoreId: idOperatore,
        },
        select: {
            operatore: {
                select: {
                    cognome: true,
                    colorAgenda: true,
                    id: true,
                    nome: true,
                    note: true,
                }
            },
            sede: {
                select: {
                    nome: true,
                }
            },
        }
    })

    const arraySede: string[] = data.map((item) => {
        return item.sede.nome
    })

    console.log("arraySede => ", arraySede)

    return {
        nome: data.at(0)?.operatore.nome ?? "",
        cognome: data.at(0)?.operatore.cognome ?? "",
        colore: data.at(0)?.operatore.colorAgenda ?? "",
        sede: arraySede ?? []
    }
}


export async function deletePrestazioneById (idPrestazione: string) {

    await db.prestazione.delete({
        where: {
            id: idPrestazione
        }
    })
}

export async function deleteSedeById (idSede: string) {
    
    try {
        await db.sede.delete({
            where: {
                id: idSede
            }
        })

        return "ok"
    } catch (error: any) {
        return error.toString()
    }
    
}


export async function deleteDocumentoById (idDocumento: string) {
    
    try {
        await db.documenti.delete({
            where: {
                id: idDocumento
            }
        })
        
        revalidatePath("/clinica/documenti")
        return "ok"
    } catch (error: any) {
        return error.toString()
    }
    
       

}


export async function getSedeById (idSede : string) {
    return await db.sede.findFirst({
        where: {
            id: idSede
        }
    })
}


export async function updateSede (idSedeVecchio: string, idSedeNuovo: string) {

    try {
        await db.sede.update({
            where: {
                id: idSedeVecchio,
            },
            data: {
                nome: idSedeNuovo,
                id: idSedeNuovo
            }
        })
        
        return "ok"
    } catch (error: any) {
        return error.toString()
    }
    
}

export async function updateOperatoreById (idOperatore: string, nome: string, cognome: string, colore: string) {

   
   try {
    await db.operatore.update({
        where: {
            id: idOperatore
        },
        data: {
            cognome,
            nome,
            colorAgenda: colore
        }
       })
    
       revalidatePath("/operatoriLista")

       return "ok"
   } catch (error: any) {
    return error.toString()
   }
    
}


export async function getPrestzioneListaById (idPrestazione: string) {
    return await db.prestazioniLista.findFirst({
        where: {
            id: idPrestazione
        },
        select: {
            categoria: true,
            costoDefault:true,
            costoGentile: true,
            nome: true,
            forWho: true
        }
    })
}

export async function updatePrestazioneLista (idPrestazione: string, categoria: string, nome: string, costoDefault: number, costoGentile: number, forWho: string) {
    
    try {
        await db.prestazioniLista.update({
            where: {
                id: idPrestazione
            },
            data: {
                categoria,
                costoDefault,
                costoGentile,
                forWho,
                nome
            }
        })

        return "ok"
        
    } catch (error: any) {
        return error.toString()
    }
    
    
}

export async function getPianoCuraCreatedDate (idPianoCura: string) {

    return await db.pianoCura.findFirst({
        where: {
            id: idPianoCura,
        },
        select: {
            createdAt: true,
            cliente: {
                select: {
                    nome: true,
                    cognome: true
                }
            }
        }
    })
}



export async function getPianoCuraByIdCliente (idCliente: string) {
    revalidatePath("/clinica")
    return await db.pianoCura.findMany({
        where: {
          clienteId: idCliente
        },
      })
}

export async function getImageByIdPiano (idPiano: string) {
    const res =  await await db.image.findMany({
        where: {
         pianoCuraId: idPiano
        },
        select: {
         url: true
        }
       });

       revalidatePath("/clinica/pianoCura")
       return res
}

export async function updateStatusPrestazione (idPrestazione: string, status: string) {
    try {
        
        await db.prestazione.update({
            where: {
                id: idPrestazione,
            },
            data: {
                status
            }
        })

    revalidatePath("/clinica/pianoCura")
        return "ok"
    } catch (error: any) {
        return error.toString()
    }

}


export async function getAnamnesiById (idPaziente: string) {
    return await db.cliente.findFirst({
        where: {
            id: idPaziente
        },
        select: {
            AffezioniCardiache: true,
            AffezioniRenali: true,
            Affezionireumatiche: true,
            AlterazionePressioneSanguigna: true,
            Altro: true,
            AsmaOAltro: true,
            AssumeFarmaci: true,
            Bruxista: true,
            Copnseguenze: true,
            Diabete: true,
            Ematomi: true,
            Emorragie: true,
            EsamiOTerapia: true,
            FacilmenteInfezioni: true,
            Fumatore: true,
            GiaSubitoAnestesia: true,
            Gravidanza: true,
            HaSoffertoSoffreMalattieInfettive: true,
            IpersensibilitaVersoFarmaci: true,
            MalattiePsichiche: true,
            nomeDentista: true,
            nomeMedico: true,
            numeroDentista: true,
            note: true,
            numeroMedico: true,
            PatologieApparatoDigerente: true,
            PatologieGenitoUrinarie: true,
            PatologieOculari: true,
            PatologieSangue: true,
            PatologieSistemaNervoso: true,
            Profilassi: true,
            RicoveriOMalattie: true,
            TerapiaAnticoagulanti: true,
            Ulcere: true,
        }
    })
}

export async function updateAnamnesi (idPaziente: string, AffezioniCardiache: boolean | null,
    AffezioniRenali: boolean | null,
    Affezionireumatiche: boolean | null,
    AlterazionePressioneSanguigna: boolean | null,
    Altro: boolean | null,
    AsmaOAltro: boolean | null,
    AssumeFarmaci: boolean | null,
    Bruxista: boolean | null,
    Copnseguenze: boolean | null,
    Diabete: boolean | null,
    Ematomi: boolean | null,
    Emorragie: boolean | null,
    EsamiOTerapia: boolean | null,
    FacilmenteInfezioni: boolean | null,
    Fumatore: boolean | null,
    GiaSubitoAnestesia: boolean | null,
    Gravidanza: boolean | null,
    HaSoffertoSoffreMalattieInfettive: boolean | null,
    IpersensibilitaVersoFarmaci: boolean | null,
    MalattiePsichiche: boolean | null,
    PatologieApparatoDigerente: boolean | null,
    PatologieGenitoUrinarie: boolean | null,
    PatologieOculari: boolean | null,
    PatologieSangue: boolean | null,
    PatologieSistemaNervoso: boolean | null,
    Profilassi: boolean | null,
    RicoveriOMalattie: boolean | null,
    TerapiaAnticoagulanti: boolean | null,
    Ulcere: boolean | null,
    NomeDentista: string | null,
    NomeMedico: string | null,
    NumeroDentista: string | null,
    NumeroMedico: string | null,
    Note: string | null,
    ){
        await db.cliente.update({
            where: {
                id: idPaziente
            },
            data: {
                AffezioniCardiache,
            AffezioniRenali,
            Affezionireumatiche,
            AlterazionePressioneSanguigna,
            Altro,
            AsmaOAltro,
            AssumeFarmaci,
            Bruxista,
            Copnseguenze,
            Diabete,
            Ematomi,
            Emorragie,
            EsamiOTerapia,
            FacilmenteInfezioni,
            Fumatore,
            GiaSubitoAnestesia,
            Gravidanza,
            HaSoffertoSoffreMalattieInfettive,
            IpersensibilitaVersoFarmaci,
            MalattiePsichiche,
            PatologieApparatoDigerente,
            PatologieGenitoUrinarie,
            PatologieOculari,
            PatologieSangue,
            PatologieSistemaNervoso,
            Profilassi,
            RicoveriOMalattie,
            TerapiaAnticoagulanti,
            Ulcere,
            numeroDentista: NumeroDentista ?? "",
            numeroMedico: NumeroMedico ?? "",
            nomeDentista: NomeDentista ?? "",
            nomeMedico: NomeMedico ?? "",
            note: Note ?? ""

            }
        })
    }