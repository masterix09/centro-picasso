"use server";

import { TPrestazioneLista } from "@/app/(dashboard)/prestazioniLista/page";
import { db } from "@/lib/db";
import { EStatusPrestazione } from "@/types";
import { format } from "date-fns";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export async function getPazienti() {
  const res = await db.cliente.findMany();
  revalidatePath("/clinica/pianoCura");
  return res;
}

export async function getPazienteById(idCliente: string) {
  const res = await db.cliente.findMany({
    where: {
      id: idCliente,
    },
    select: {
      CAP: true,
      codice_fiscale: true,
      citta: true,
      cognome: true,
      indirizzo: true,
      luogo_nascita: true,
      nome: true,
      straniero: true,
      sesso: true,
      email: true,
      data_richiamo: true,
      Listino: true,
      data_nascita: true,
      Telefono: true,
      cellulare: true,
      Motivo: true,
      Professione: true,
    },
  });
  revalidatePath("/clinica/pianoCura");
  return res;
}

export async function getInfoPazienteByIdAnagrafica(idCliente: string) {
  const res = await db.cliente.findFirst({
    where: {
      id: idCliente,
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
      straniero: true,
    },
  });

  return res;
}

export async function getPrestazioniAgenda(
  idSede: string,
  idOperatore: string
) {
  if (idOperatore === "") {
    const res = await db.prestazione.findMany({
      where: {
        sedeId: idSede.toLowerCase().replace(/'/g, ""),
      },
      include: {
        pianoCura: {
          include: {
            cliente: {
              select: {
                nome: true,
                cognome: true,
              },
            },
          },
        },
        operatore: {
          select: {
            id: true,
            colorAgenda: true,
            cognome: true,
            nome: true,
          },
        },
      },
      // select: {
      //   id: true,
      //   nome: true,
      //   start: true,
      //   end: true,
      //   ora_arrivo: true,
      //   ora_saluta: true,
      //   data_appuntamento: true,
      //   operatore: {
      //     select: {
      //       id: true,
      //       colorAgenda: true,
      //       cognome: true,
      //       nome: true,
      //     },
      //   },
      // },
    });

    revalidatePath("/agenda/[sede]", "page");
    return res;
  } else {
    const res = await db.prestazione.findMany({
      where: {
        sedeId: idSede.toLowerCase().replace(/'/g, ""),
        operatoreId: idOperatore.toString(),
      },
      select: {
        id: true,
        nome: true,
        start: true,
        end: true,
        ora_arrivo: true,
        ora_saluta: true,
        data_appuntamento: true,
        nota: true,
        operatore: {
          select: {
            id: true,
            colorAgenda: true,
            cognome: true,
            nome: true,
          },
        },
        pianoCura: {
          select: {
            cliente: {
              select: {
                nome: true,
                cognome: true,
              },
            },
          },
        },
      },
    });

    revalidatePath("/agenda/[sede]/[idOperatore]", "page");

    return res;
  }
}

export async function createPianoCura(titolo: string, clienteId: string) {
  try {
    await db.pianoCura.create({
      data: {
        titolo,
        id: uuidv4(),
        clienteId: clienteId,
      },
    });

    revalidatePath("/clinica/pianoCura", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getPrestazioniList() {
  const res = await db.prestazioniLista.findMany();
  revalidatePath("/clinina/pianoCura", "page");
  return res;
}

export async function getPrestazioniListInPage() {
  const res = await db.prestazioniLista.findMany();
  revalidatePath("/prestazioniLista", "page");
  return res;
}

export async function addPrestazionePianoCura(
  array: string[],
  idPiano: string,
  idDente: string,
  sede: string,
  operatoreId: string
) {
  try {
    const idSede = await db.sede.findFirst({
      where: {
        nome: sede,
      },
      select: {
        id: true,
      },
    });

    const prestazioni: TPrestazioneLista[] = await db.prestazioniLista.findMany(
      {
        where: {
          id: {
            in: [...array],
          },
        },
      }
    );

    const prestazioniAdd = prestazioni.map((item) => {
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
        sedeId: idSede?.id ?? "",
      };
    });

    prestazioniAdd.forEach(async (item) => {
      await db.prestazione.create({
        data: item,
      });
    });

    revalidatePath("/clinica/pianoCura", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function createPrestazioneList(
  titolo: string,
  categoria: string,
  costoDefault: number,
  costoGentile: number
) {
  try {
    await db.prestazioniLista.create({
      data: {
        id: uuidv4(),
        nome: titolo,
        categoria,
        forWho: "",
        costoGentile,
        costoDefault,
      },
    });

    revalidatePath("/prestazioniLista", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function createOperatore(
  nome: string,
  cognome: string,
  colore: string,
  sede: string[]
) {
  try {
    const idOperatore = uuidv4();

    await db.operatore.create({
      data: {
        id: idOperatore,
        nome,
        cognome,
        colorAgenda: colore,
      },
    });

    const temp = sede.map((item) => {
      return {
        operatoreId: idOperatore,
        sedeId: item,
      };
    });

    temp.forEach(async (item) => {
      await db.operatoreOnSede.create({
        data: {
          operatoreId: item.operatoreId,
          sedeId: item.sedeId,
        },
      });
    });

    revalidatePath("/operatoriLista", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getSede() {
  const res = await db.sede.findMany({
    select: {
      id: true,
      nome: true,
    },
  });

  revalidatePath("/sediLista", "page");
  return res;
}

export async function getSedeInModalCreate() {
  const res = await db.sede.findMany({
    select: {
      id: true,
      nome: true,
    },
  });

  revalidatePath("/clinica/pianoCura", "page");
  return res;
}

export async function createSede(nome: string) {
  await db.sede.create({
    data: {
      id: nome.toLowerCase().replace(/'/g, ""),
      nome,
    },
  });

  revalidatePath("/sediLista", "page");
}

export async function createPagamento(
  data: string,
  importo: number,
  note: string,
  idPiano: string
) {
  try {
    await db.pagamenti.create({
      data: {
        id: uuidv4(),
        createdAt: data,
        importo: importo,
        note,
        pianoCuraId: idPiano,
      },
    });

    revalidatePath("/clinica/preventivo", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function createPaziente(
  nome: string,
  cognome: string,
  dataNascita: string,
  sesso: string,
  cf: string,
  straniero: boolean,
  luogoNascita: string,
  indirizzo: string,
  cap: string,
  citta: string,
  telefono: string,
  email: string,
  cellulare: string,
  motivo: string,
  listino: string,
  richiamo: string,
  dataRichiamo: string,
  professione: string
) {
  try {
    await db.cliente.create({
      data: {
        id: uuidv4(),
        CAP: cap,
        cellulare,
        citta,
        codice_fiscale: cf,
        cognome,
        data_nascita: dataNascita ?? new Date(),
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
      },
    });
    revalidatePath("/clinica/pianoCura", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function updatePaziente(
  nome: string,
  cognome: string,
  dataNascita: string,
  sesso: string,
  cf: string,
  straniero: boolean,
  luogoNascita: string,
  indirizzo: string,
  cap: string,
  citta: string,
  telefono: string,
  email: string,
  cellulare: string,
  motivo: string,
  listino: string,
  richiamo: string,
  dataRichiamo: string,
  professione: string,
  idCliente: string
) {
  try {
    await db.cliente.update({
      where: {
        id: idCliente,
      },
      data: {
        CAP: cap,
        cellulare,
        citta,
        codice_fiscale: cf,
        cognome,
        // data_nascita: dataNascita,
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
      },
    });
    revalidatePath("/listaPazienti", "page");
    return "ok";
  } catch (error: any) {
    console.log(error);
    return error.toString();
  }
}

export async function createImage(array: string[], idPiano: string) {
  try {
    const obj = array.map((item) => {
      return {
        id: uuidv4(),
        url: item,
        pianoCuraId: idPiano,
        note: "",
      };
    });

    obj.forEach(async (item) => {
      await db.image.create({
        data: item,
      });
    });

    revalidatePath("/clinica/pianoCura", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function createDocumento(idPiano: string, nome: string) {
  try {
    await db.documenti.create({
      data: {
        id: uuidv4(),
        nome,
        createdAt: format(new Date(), "dd-MM-yyyy"),
        url: "",
        pianoCuraId: idPiano,
      },
    });
    revalidatePath("/clinica/documenti", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getOperatore() {
  return await db.operatore.findMany({
    select: {
      id: true,
      cognome: true,
      nome: true,
      note: true,
      colorAgenda: true,
    },
  });
}

export async function updateNote(formData: FormData) {}

export async function getDocument(idPiano: string) {
  const res = await db.documenti.findMany({
    where: {
      pianoCuraId: idPiano,
    },
  });

  revalidatePath("/clinica/documenti", "page");

  return res;
}

export async function getPrestazioniByIdPiano(idPiano: string) {
  return await db.prestazione.findMany({
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
      costoFacoltativo: true,
      status: true,
    },
  });
}

export async function getNoteByIdPiano(idPiano: string) {
  return await db.pianoCura.findFirst({
    where: {
      id: idPiano,
    },
    select: {
      note: true,
    },
  });
}

export async function getPagamentiByIdPiano(idPiano: string) {
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

export async function getPrestazioneAgendaById(idPrestazione: string) {
  const res = await db.prestazione.findFirst({
    where: {
      id: idPrestazione,
    },
    select: {
      categoria: true,
      nome: true,
      operatore: {
        select: {
          nome: true,
          cognome: true,
          id: true,
        },
      },
      pianoCura: {
        select: {
          cliente: {
            select: {
              nome: true,
              cognome: true,
            },
          },
        },
      },
      ora_arrivo: true,
      ora_saluta: true,
    },
  });
  revalidatePath("/agenda/[slug]", "page");
  return res;
}

export async function setOrarioArrivo(orario: string, idPrestazione: string) {
  try {
    await db.prestazione.update({
      where: {
        id: idPrestazione,
      },
      data: {
        ora_arrivo: orario,
      },
    });

    revalidatePath("/agenda/[slug]", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function setOrarioUscita(orario: string, idPrestazione: string) {
  try {
    await db.prestazione.update({
      where: {
        id: idPrestazione,
      },
      data: {
        ora_saluta: orario,
      },
    });

    revalidatePath("/agenda/[slug]", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function deletePrestazionePianoCuraById(idPrestazione: string) {
  try {
    await db.prestazione.delete({
      where: {
        id: idPrestazione,
      },
    });
    revalidatePath("/clinica/pianoCura", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function addDataAppuntamento(idPerstazione: string, date: string) {
  try {
    await db.prestazione.update({
      where: {
        id: idPerstazione,
      },
      data: {
        data_appuntamento: date,
      },
    });

    revalidatePath("clinica/pianoCura", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function addOrarioAppuntamento(
  idPerstazione: string,
  start: string,
  end: string
) {
  try {
    await db.prestazione.update({
      where: {
        id: idPerstazione,
      },
      data: {
        start,
        end,
      },
    });
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}
export async function getDataAppuntamentoPrestazioneById(
  idPrestazione: string
) {
  return await db.prestazione.findFirst({
    where: {
      id: idPrestazione,
    },
    select: {
      data_appuntamento: true,
    },
  });
}

export async function deleteOperatoreById(idOperatore: string) {
  try {
    await db.operatoreOnSede.deleteMany({
      where: {
        operatoreId: idOperatore,
      },
    });

    await db.operatore.delete({
      where: {
        id: idOperatore,
      },
    });

    await db.prestazione.deleteMany({
      where: {
        operatoreId: idOperatore,
      },
    });

    revalidatePath("/operatoriLista", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getOperatoreByIdSede(idSede: string) {
  const res = await db.operatoreOnSede.findMany({
    where: {
      sede: {
        nome: idSede,
      },
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

  revalidatePath("/clinica/pianoCura", "page");

  return res;
}

export async function getInfoPazienteById(idPaziente: string) {
  const res = await db.cliente.findFirst({
    where: {
      id: idPaziente,
    },
    select: {
      id: true,
      nome: true,
      cognome: true,
      codice_fiscale: true,
    },
  });

  revalidatePath("/clinica/pianoCura", "page");
  return res;
}

export async function getOperatoreById(idOperatore: string) {
  const data = await db.operatoreOnSede.findMany({
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
        },
      },
      sede: {
        select: {
          nome: true,
        },
      },
    },
  });

  const arraySede: string[] = data.map((item) => {
    return item.sede.nome;
  });

  return {
    nome: data.at(0)?.operatore.nome ?? "",
    cognome: data.at(0)?.operatore.cognome ?? "",
    colore: data.at(0)?.operatore.colorAgenda ?? "",
    sede: arraySede ?? [],
  };
}

export async function deletePrestazioneById(idPrestazione: string) {
  await db.prestazioniLista.delete({
    where: {
      id: idPrestazione,
    },
  });

  revalidatePath("/clinica/pianoCura", "page");
}

export async function deleteSedeById(idSede: string) {
  try {
    await db.sede.delete({
      where: {
        id: idSede,
      },
    });

    revalidatePath("/sediLista", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function deleteDocumentoById(idDocumento: string) {
  try {
    await db.documenti.delete({
      where: {
        id: idDocumento,
      },
    });

    revalidatePath("/clinica/documenti", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getSedeById(idSede: string) {
  return await db.sede.findFirst({
    where: {
      id: idSede,
    },
  });
}

export async function updateSede(idSedeVecchio: string, idSedeNuovo: string) {
  try {
    await db.sede.update({
      where: {
        id: idSedeVecchio,
      },
      data: {
        nome: idSedeNuovo,
      },
    });

    revalidatePath("/sediLista", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function updateOperatoreById(
  idOperatore: string,
  nome: string,
  cognome: string,
  colore: string
) {
  try {
    await db.operatore.update({
      where: {
        id: idOperatore,
      },
      data: {
        cognome,
        nome,
        colorAgenda: colore,
      },
    });

    revalidatePath("/operatoriLista", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getPrestzioneListaById(idPrestazione: string) {
  return await db.prestazioniLista.findFirst({
    where: {
      id: idPrestazione,
    },
    select: {
      categoria: true,
      costoDefault: true,
      costoGentile: true,
      nome: true,
      forWho: true,
    },
  });
}

export async function updatePrestazioneLista(
  idPrestazione: string,
  categoria: string,
  nome: string,
  costoDefault: number,
  costoGentile: number
) {
  try {
    await db.prestazioniLista.update({
      where: {
        id: idPrestazione,
      },
      data: {
        categoria,
        costoDefault,
        costoGentile,
        forWho: "",
        nome,
      },
    });

    await db.prestazione.updateMany({
      where: {
        nome,
        categoria,
      },
      data: {
        categoria,
        costoDefault,
        costoGentile,
        nome,
      },
    });

    revalidatePath("/prestazioniLista", "page");

    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getPianoCuraCreatedDate(idPianoCura: string) {
  return await db.pianoCura.findFirst({
    where: {
      id: idPianoCura,
    },
    select: {
      createdAt: true,
      cliente: {
        select: {
          nome: true,
          cognome: true,
        },
      },
    },
  });
}

export async function getPianoCuraByIdCliente(idCliente: string) {
  const res = await db.pianoCura.findMany({
    where: {
      clienteId: idCliente,
    },
  });

  revalidatePath("/clinica", "page");

  return res;
}

export async function getLastVisit(idPianoCura: string) {
  const array = await db.prestazione.findMany({
    where: {
      pianoCuraId: idPianoCura,
    },
  });

  const sortedDates = array
    .filter((item) => item.data_appuntamento !== null)
    .sort((a, b) => {
      return (
        new Date(b.data_appuntamento!).getTime() -
        new Date(a.data_appuntamento!).getTime()
      );
    });

  if (sortedDates.at(0) && sortedDates.at(0)?.data_appuntamento) {
    return `Ultima visita: ${sortedDates.at(0)?.data_appuntamento}`;
  } else {
    return "";
  }
}

export async function getImageByIdPiano(idPiano: string) {
  const res = await db.image.findMany({
    where: {
      pianoCuraId: idPiano,
    },
    select: {
      url: true,
    },
  });

  revalidatePath("/clinica/pianoCura", "page");
  return res;
}

export async function updateStatusPrestazione(
  idPrestazione: string,
  status: string
) {
  try {
    await db.prestazione.update({
      where: {
        id: idPrestazione,
      },
      data: {
        status,
      },
    });

    revalidatePath("/clinica/pianoCura", "page");
    return "ok";
  } catch (error: any) {
    return error.toString();
  }
}

export async function getAnamnesiById(idPaziente: string) {
  return await db.cliente.findFirst({
    where: {
      id: idPaziente,
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
    },
  });
}

export async function updateAnamnesi(
  idPaziente: string,
  AffezioniCardiache: boolean | null,
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
  Note: string | null
) {
  await db.cliente.update({
    where: {
      id: idPaziente,
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
      note: Note ?? "",
    },
  });
}

export async function deleteImage(formData: FormData) {
  const idPiano = formData.get("idPiano")?.toString();
  const url = formData.get("url")?.toString();

  try {
    const item = await db.image.findFirst({
      where: {
        pianoCuraId: idPiano ?? "",
        url: url ?? "",
      },
    });

    await db.image.delete({
      where: {
        id: item?.id,
      },
    });
    revalidatePath("/clinica/immagini", "page");
  } catch (error) {
    console.log(error);
  }
}

export async function updateNoteByIdPiano(formData: FormData) {
  const idPiano = formData.get("idPiano")?.toString();
  const note = formData.get("note")?.toString();

  try {
    await db.pianoCura.update({
      where: {
        id: idPiano,
      },
      data: {
        note: note,
      },
    });
    revalidatePath("/clinica/pianoCura", "page");
  } catch (error) {
    console.log(error);
  }
}

export async function deletePagamento(idPagamento: string) {
  try {
    await db.pagamenti.delete({
      where: {
        id: idPagamento,
      },
    });
    revalidatePath("/clinica/preventivo", "page");
  } catch (error) {
    console.log(error);
  }
}

export async function updatePriceFacoltativo(formData: FormData) {
  const idPrestazione = formData.get("idPrestazione")?.toString();
  const newPrice = formData.get("newPrice")?.toString();

  try {
    await db.prestazione.update({
      where: {
        id: idPrestazione,
      },
      data: {
        costoFacoltativo: Number(newPrice) ?? 0,
      },
    });

    revalidatePath("/clinica/preventivo", "page");
  } catch (error) {
    console.log(error);
  }
}

export async function deletePianoCuraById(formData: FormData) {
  const idPiano = formData.get("idPiano")?.toString();

  try {
    await db.pianoCura.delete({
      where: {
        id: idPiano,
      },
    });

    revalidatePath("/clinica/pianoCura", "page");
  } catch (error) {
    console.log(error);
  }
}

export async function updateNotePrestazioneByID(
  prevState: any,
  formData: FormData
) {
  const idPrestazione = formData.get("prestazioneId")?.toString();
  const nota = formData.get("nota")?.toString();

  try {
    await db.prestazione.update({
      where: {
        id: idPrestazione,
      },
      data: {
        nota,
      },
    });

    revalidatePath("/clinica/immagini", "page");

    return { message: "OK" };
  } catch (error) {
    console.log(error);
    return { message: "ERROR" };
  }
}
