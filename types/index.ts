export interface IPaziente {
  id?: string;
  nome?: string | null;
  cognome?: string | null;
  sesso?: string | null;
  data_nascita?: string | null;
  minorenne?: boolean | null;
  straniero?: boolean | null;
  luogo_nascita?: string | null;
  codice_fiscale?: string | null;
  indirizzo?: string | null;
  CAP?: string | null;
  citta?: string | null;
  email?: string | null;
  cellulare?: string | null;
  Telefono?: string | null;
  Ufficio?: string | null;
  Professione?: string | null;
  Richiamo?: string | null;
  Motivo?: string | null;
  Listino?: string | null;
  rimborso?: boolean | null;
  // Diario?: IDiario | null;
  PianoCura?: IPianoCura[] | null;
  AffezioniCardiache?: boolean | null;
  AlterazionePressioneSanguigna?: boolean | null;
  AffezioniRenali?: boolean | null;
  Affezionireumatiche?: boolean | null;
  PatologieSangue?: boolean | null;
  PatologieApparatoDigerente?: boolean | null;
  PatologieSistemaNervoso?: boolean | null;
  MalattiePsichiche?: boolean | null;
  AssumeFarmaci?: boolean | null;
  PatologieOculari?: boolean | null;
  PatologieGenitoUrinarie?: boolean | null;
  Emorragie?: boolean | null;
  HaSoffertoSoffreMalattieInfettive?: boolean | null;
  Diabete?: boolean | null;
  Ulcere?: boolean | null;
  AsmaOAltro?: boolean | null;
  IpersensibilitaVersoFarmaci?: boolean | null;
  Altro?: boolean | null;
  RicoveriOMalattie?: boolean | null;
  Fumatore?: boolean | null;
  Bruxista?: boolean | null;
  Copnseguenze?: boolean | null;
  GiaSubitoAnestesia?: boolean | null;
  Profilassi?: boolean | null;
  TerapiaAnticoagulanti?: boolean | null;
  Ematomi?: boolean | null;
  EsamiOTerapia?: boolean | null;
  FacilmenteInfezioni?: boolean | null;
  Gravidanza?: boolean | null;
  nomeMedico?: string | null;
  numeroMedico?: string | null;
  nomeDentista?: string | null;
  numeroDentista?: string | null;
  note?: string | null;
  data_richiamo?: string | null;
}

interface IDiario {
  id: string | null;
  cliente: IPaziente;
  clienteId: string;
  NoteDiario: INoteDiario;
}

interface INoteDiario {
  id: string;
  createdAt: Date;
  descrizione: string;
  diario: IDiario;
  diarioId: string;
  Denti: IDenti | null;
}

enum EArcata {
  "inferiore",
  "superiore",
}

interface IDenti {
  id: string | null;
  nome: string | null;
  numero: number | null;
  arcata: string | null;
}

export enum ECategoriaPrestazione {
  "Chirurgia orale" = "Chirurgia orale",
  "Implantologia" = "Implantologia",
  "Parodontologia" = "Parodontologia",
  "Conservativa" = "Conservativa",
  "Otturazioni" = "Otturazioni",
  "Protesi" = "Protesi",
  "Corone e ponti" = "Corone e ponti",
  "Endodonzia" = "Endodonzia",
  "Radiologia" = "Radiologia",
  "Prestazioni Ortodontiche" = "Prestazioni Ortodontiche",
  "Altre Prestazioni Arcate" = "Altre Prestazioni Arcate",
}

export enum EStatusPrestazione {
  "In corso" = "In corso",
  "Prescritto" = "Prescritto",
  "Completato" = "Completato",
  "Non eseguito" = "Non eseguito",
}

export interface IOperatore {
  id: string;
  nome: string | null;
  cognome: string | null;
  colorAgenda: string | null;
  sede: string | null;
}

export interface IPrestazione {
  id: string;
  nome: string | null;
  start?: string | null;
  end?: string | null;
  categoria: string | null;
  status?: string | null;
  createdAt?: string | null;
  nota?: string | null;
  data_appuntamento?: string | null;
  costoDefault: number | null;
  costoGentile: number | null;
  costoFacoltativo: number | null;
  // PianoCura: IPianoCura;
  pianoCuraId?: string | null;
  denteId?: string | null;
  operatoreId?: string | null;
  Operatore?: IOperatore | null;
  pagamentiId?: string | null;
}

export interface IPagamento {
  id: string;
  importo: number | null;
  createdAt: string | null;
  pianoCuraId: string | null;
  note: string | null;
}

export interface IIMage {
  id: string;
  url: string;
  note?: string;
}

export interface IDocumenti {
  id: string;
  url: string;
  nome: string;
  createdAt: string;
}

export interface IPianoCura {
  id: string;
  titolo: string | null;
  createdAt: Date | null;
  prestazione: IPrestazione[] | null;
  // Preventivo: IPreventivo | null;
  // cliente: IPaziente | null;
  // preventivoId: string | null;
  pagamenti: IPagamento[] | null;
  clienteId: string | null;
  image: IIMage[] | null;
  documenti: IDocumenti[];
}

enum EStatusPreventivo {
  attivo,
  chiuso,
}

enum EListinoPreventivo {
  "default",
  "gentile",
}

interface IPreventivo {
  id: string;
  createdAt: Date | null;
  status: string | null;
  listino: string | null;
  importo: number | null;
  calendar: string | null;
  note: string | null;
  // cliente: IPaziente;
  clienteId: string | null;
  // PianoCura: IPianoCura
}

export interface IAnamnesi {
  AffezioniCardiache: boolean | null;
  AffezioniRenali: boolean | null;
  Affezionireumatiche: boolean | null;
  AlterazionePressioneSanguigna: boolean | null;
  Altro: boolean | null;
  AsmaOAltro: boolean | null;
  AssumeFarmaci: boolean | null;
  Bruxista: boolean | null;
  Copnseguenze: boolean | null;
  Diabete: boolean | null;
  Ematomi: boolean | null;
  Emorragie: boolean | null;
  EsamiOTerapia: boolean | null;
  FacilmenteInfezioni: boolean | null;
  Fumatore: boolean | null;
  GiaSubitoAnestesia: boolean | null;
  Gravidanza: boolean | null;
  HaSoffertoSoffreMalattieInfettive: boolean | null;
  IpersensibilitaVersoFarmaci: boolean | null;
  MalattiePsichiche: boolean | null;
  nomeMedico: string | null;
  nomeDentista: string | null;
  numeroDentista: string | null;
  note: string | null;
  numeroMedico: string | null;
  PatologieApparatoDigerente: boolean | null;
  PatologieGenitoUrinarie: boolean | null;
  PatologieOculari: boolean | null;
  PatologieSangue: boolean | null;
  PatologieSistemaNervoso: boolean | null;
  Profilassi: boolean | null;
  RicoveriOMalattie: boolean | null;
  TerapiaAnticoagulanti: boolean | null;
  Ulcere: boolean | null;
}

export type SmartTAGPropsDocument = {
  Diagnosi: string;
  Benefici: string;
  Rischi: string;
};

export type TCreatePrestazione = {
  id?: string | null;
  nome?: string | null;
  categoria?: string | null;
  forWho?: string | null;
  costoDefault?: number | null;
  costoGentile?: number | null;
};

export type NoteDashboard = {
  id: string;
  noteFrancesco?: string | null;
  noteAntonio?: string | null;
  noteFrancesca?: string | null;
};

export type eventProp = {
  id: string;
  titolo: string;
  color: string;
  start: string;
  end: string;
  operatore: string | null;
  differenza_orario: string | null;
  ora_arrivo: string | null;
  ora_saluta: string | null;
};
