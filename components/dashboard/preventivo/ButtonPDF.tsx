"use client";
import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import ResocontoPagamento from "../documenti/PDFDocument/ResocontoPagamento";
import { Button } from "@/components/ui/button";
import { IPrestazione } from "@/types";
import {
  TPagamentiPreventivo,
  TPrestazionePreventivo,
} from "@/app/(dashboard)/clinica/preventivo/columns";
import { EListino } from "@/enum/types";

const ButtonPDF = ({
  calculateTotale,
  calculateTotaleAcconti,
  calculateTotaleEseguito,
  data,
  listino,
  pagamenti,
  pianoCuraCreationDate,
  cognomeCliente,
  nomeCliente,
}: {
  data: TPrestazionePreventivo[];
  calculateTotale: number;
  pagamenti: TPagamentiPreventivo[];
  calculateTotaleAcconti: number;
  pianoCuraCreationDate: string;
  calculateTotaleEseguito: number;
  listino: EListino;
  nomeCliente: string;
  cognomeCliente: string;
}) => {
  return (
    <PDFDownloadLink
      document={
        <ResocontoPagamento
          prestazioni={data}
          totale={calculateTotale}
          pagamenti={pagamenti}
          totaleAcconti={calculateTotaleAcconti}
          pianoCuraCreationDate={pianoCuraCreationDate}
          totaleEseguito={calculateTotaleEseguito}
          saldo={calculateTotale - calculateTotaleAcconti}
          listino={listino as EListino}
        />
      }
      fileName={`${cognomeCliente}_${nomeCliente}_Resoconto_Pagamento`}
    >
      <Button type="button">Stampa resoconto</Button>
    </PDFDownloadLink>
  );
};

export default ButtonPDF;
