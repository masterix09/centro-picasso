-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "cognome" TEXT,
    "sesso" TEXT DEFAULT 'maschio',
    "data_nascita" TEXT,
    "minorenne" BOOLEAN DEFAULT false,
    "straniero" BOOLEAN DEFAULT false,
    "luogo_nascita" TEXT,
    "codice_fiscale" TEXT,
    "indirizzo" TEXT,
    "CAP" TEXT,
    "citta" TEXT,
    "email" TEXT,
    "cellulare" TEXT,
    "Telefono" TEXT,
    "Ufficio" TEXT,
    "Professione" TEXT,
    "Richiamo" TEXT DEFAULT 'Non Richiamare',
    "Motivo" TEXT,
    "Listino" TEXT DEFAULT 'Default',
    "rimborso" BOOLEAN DEFAULT false,
    "diarioId" TEXT,
    "AffezioniCardiache" BOOLEAN,
    "AlterazionePressioneSanguigna" BOOLEAN,
    "AffezioniRenali" BOOLEAN,
    "Affezionireumatiche" BOOLEAN,
    "PatologieSangue" BOOLEAN,
    "PatologieApparatoDigerente" BOOLEAN,
    "PatologieSistemaNervoso" BOOLEAN,
    "MalattiePsichiche" BOOLEAN,
    "AssumeFarmaci" BOOLEAN,
    "PatologieOculari" BOOLEAN,
    "PatologieGenitoUrinarie" BOOLEAN,
    "Emorragie" BOOLEAN,
    "HaSoffertoSoffreMalattieInfettive" BOOLEAN,
    "Diabete" BOOLEAN,
    "Ulcere" BOOLEAN,
    "AsmaOAltro" BOOLEAN,
    "IpersensibilitaVersoFarmaci" BOOLEAN,
    "Altro" BOOLEAN,
    "RicoveriOMalattie" BOOLEAN,
    "Fumatore" BOOLEAN,
    "Bruxista" BOOLEAN,
    "Copnseguenze" BOOLEAN,
    "GiaSubitoAnestesia" BOOLEAN,
    "Profilassi" BOOLEAN,
    "TerapiaAnticoagulanti" BOOLEAN,
    "Ematomi" BOOLEAN,
    "EsamiOTerapia" BOOLEAN,
    "FacilmenteInfezioni" BOOLEAN,
    "Gravidanza" BOOLEAN,
    "nomeMedico" TEXT,
    "numeroMedico" TEXT,
    "nomeDentista" TEXT,
    "numeroDentista" TEXT,
    "note" TEXT,
    "data_richiamo" TEXT
);

-- CreateTable
CREATE TABLE "Dente" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "numero" INTEGER,
    "arcata" TEXT
);

-- CreateTable
CREATE TABLE "Diario" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Documenti" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "pianoCuraId" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "pianoCuraId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "NoteDiario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "descrizione" TEXT,
    "diarioId" TEXT
);

-- CreateTable
CREATE TABLE "Operatore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "cognome" TEXT,
    "colorAgenda" TEXT,
    "note" TEXT
);

-- CreateTable
CREATE TABLE "Sede" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OperatoreOnSede" (
    "operatoreId" TEXT NOT NULL,
    "sedeId" TEXT NOT NULL,

    PRIMARY KEY ("operatoreId", "sedeId")
);

-- CreateTable
CREATE TABLE "Pagamenti" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "importo" INTEGER,
    "createdAt" TEXT,
    "note" TEXT,
    "pianoCuraId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PianoCura" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titolo" TEXT,
    "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "preventivoId" TEXT,
    "clienteId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Poltrona" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT
);

-- CreateTable
CREATE TABLE "Prestazione" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "start" TEXT,
    "end" TEXT,
    "categoria" TEXT,
    "status" TEXT,
    "createdAt" TEXT,
    "nota" TEXT,
    "data_appuntamento" TEXT,
    "costoDefault" INTEGER,
    "costoGentile" INTEGER,
    "pianoCuraId" TEXT NOT NULL,
    "denteId" TEXT,
    "poltronaId" TEXT,
    "operatoreId" TEXT NOT NULL,
    "preventivoId" TEXT,
    "pagamentiId" TEXT,
    "ora_arrivo" TEXT,
    "ora_saluta" TEXT,
    "sedeId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PrestazioniLista" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "categoria" TEXT,
    "costoDefault" INTEGER,
    "costoGentile" INTEGER,
    "forWho" TEXT
);

-- CreateTable
CREATE TABLE "noteDashboard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT,
    "cognome" TEXT,
    "testo" TEXT NOT NULL,
    "operatoreId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_id_key" ON "Cliente"("id");

-- CreateIndex
CREATE INDEX "Cliente_diarioId_idx" ON "Cliente"("diarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Dente_id_key" ON "Dente"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Diario_id_key" ON "Diario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Documenti_id_key" ON "Documenti"("id");

-- CreateIndex
CREATE INDEX "Documenti_pianoCuraId_idx" ON "Documenti"("pianoCuraId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE INDEX "Image_pianoCuraId_idx" ON "Image"("pianoCuraId");

-- CreateIndex
CREATE UNIQUE INDEX "NoteDiario_id_key" ON "NoteDiario"("id");

-- CreateIndex
CREATE INDEX "NoteDiario_diarioId_idx" ON "NoteDiario"("diarioId");

-- CreateIndex
CREATE INDEX "OperatoreOnSede_operatoreId_idx" ON "OperatoreOnSede"("operatoreId");

-- CreateIndex
CREATE INDEX "OperatoreOnSede_sedeId_idx" ON "OperatoreOnSede"("sedeId");

-- CreateIndex
CREATE UNIQUE INDEX "Pagamenti_id_key" ON "Pagamenti"("id");

-- CreateIndex
CREATE INDEX "Pagamenti_pianoCuraId_idx" ON "Pagamenti"("pianoCuraId");

-- CreateIndex
CREATE UNIQUE INDEX "PianoCura_id_key" ON "PianoCura"("id");

-- CreateIndex
CREATE INDEX "PianoCura_clienteId_idx" ON "PianoCura"("clienteId");

-- CreateIndex
CREATE UNIQUE INDEX "Poltrona_id_key" ON "Poltrona"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Prestazione_id_key" ON "Prestazione"("id");

-- CreateIndex
CREATE INDEX "Prestazione_denteId_idx" ON "Prestazione"("denteId");

-- CreateIndex
CREATE INDEX "Prestazione_poltronaId_idx" ON "Prestazione"("poltronaId");

-- CreateIndex
CREATE INDEX "Prestazione_pianoCuraId_idx" ON "Prestazione"("pianoCuraId");

-- CreateIndex
CREATE INDEX "Prestazione_operatoreId_idx" ON "Prestazione"("operatoreId");

-- CreateIndex
CREATE INDEX "Prestazione_sedeId_idx" ON "Prestazione"("sedeId");

-- CreateIndex
CREATE UNIQUE INDEX "PrestazioniLista_id_key" ON "PrestazioniLista"("id");

-- CreateIndex
CREATE UNIQUE INDEX "noteDashboard_id_key" ON "noteDashboard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "noteDashboard_operatoreId_key" ON "noteDashboard"("operatoreId");
