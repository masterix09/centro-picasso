-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Prestazione" (
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
    "costoFacoltativo" INTEGER DEFAULT 0,
    "pianoCuraId" TEXT,
    "denteId" TEXT,
    "poltronaId" TEXT,
    "operatoreId" TEXT NOT NULL,
    "preventivoId" TEXT,
    "pagamentiId" TEXT,
    "ora_arrivo" TEXT,
    "ora_saluta" TEXT,
    "sedeId" TEXT NOT NULL
);
INSERT INTO "new_Prestazione" ("categoria", "costoDefault", "costoFacoltativo", "costoGentile", "createdAt", "data_appuntamento", "denteId", "end", "id", "nome", "nota", "operatoreId", "ora_arrivo", "ora_saluta", "pagamentiId", "pianoCuraId", "poltronaId", "preventivoId", "sedeId", "start", "status") SELECT "categoria", "costoDefault", "costoFacoltativo", "costoGentile", "createdAt", "data_appuntamento", "denteId", "end", "id", "nome", "nota", "operatoreId", "ora_arrivo", "ora_saluta", "pagamentiId", "pianoCuraId", "poltronaId", "preventivoId", "sedeId", "start", "status" FROM "Prestazione";
DROP TABLE "Prestazione";
ALTER TABLE "new_Prestazione" RENAME TO "Prestazione";
CREATE UNIQUE INDEX "Prestazione_id_key" ON "Prestazione"("id");
CREATE INDEX "Prestazione_denteId_idx" ON "Prestazione"("denteId");
CREATE INDEX "Prestazione_poltronaId_idx" ON "Prestazione"("poltronaId");
CREATE INDEX "Prestazione_pianoCuraId_idx" ON "Prestazione"("pianoCuraId");
CREATE INDEX "Prestazione_operatoreId_idx" ON "Prestazione"("operatoreId");
CREATE INDEX "Prestazione_sedeId_idx" ON "Prestazione"("sedeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
