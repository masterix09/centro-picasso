"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TPrestazionePreventivo,
  columnsGentile,
  columnsDefault,
  columnsPagamenti,
  TPagamentiPreventivo,
} from "./columns";
import { DataTable } from "./data-table";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EListino, EModalType } from "@/enum/types";
import { db } from "@/lib/db";
import SelectListino from "@/components/dashboard/PianoDiCura/preventivo/SelectListino";
import { useStore } from "@/store/store";
import { useEffect, useState } from "react";
import {
  getPagamentiByIdPiano,
  getPianoCuraCreatedDate,
  getPrestazioniByIdPiano,
} from "@/actions/actions.clinica";
import { format } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ResocontoPagamento from "@/components/dashboard/documenti/PDFDocument/ResocontoPagamento";
import { Button } from "@/components/ui/button";
import { EStatusPrestazione } from "@/types";

export const dynamic = "force-dynamic";

export default function Page() {
  const { idPiano, listino, setListino } = useStore((state) => state);
  const [data, setData] = useState<TPrestazionePreventivo[]>([]);
  const [pagamenti, setPagamenti] = useState<TPagamentiPreventivo[]>([]);
  const [pianoCreatedAt, setPianoCreatedAt] = useState<{
    createdAt: Date | null;
    cliente: {
      nome: string | null;
      cognome: string | null;
    };
  } | null>();

  useEffect(() => {
    if (idPiano) {
      getPrestazioniByIdPiano(idPiano).then((data) => setData(data));
      getPagamentiByIdPiano(idPiano).then((data) => setPagamenti(data));
      getPianoCuraCreatedDate(idPiano).then((data) => setPianoCreatedAt(data));
    }
  }, [idPiano]);

  const calculateTotale = () => {
    let costo: number = 0;
    if (listino === EListino.GENTILE) {
      data.map((item) => (costo = costo + (item.costoGentile ?? 0)));
    } else {
      data.map((item) => (costo = costo + (item.costoDefault ?? 0)));
    }
    return costo;
  };

  const calculateTotaleAcconti = () => {
    let totaleAcconti = 0;
    pagamenti.map((item) => {
      return (totaleAcconti = totaleAcconti + Number(item.importo!));
    });
    return totaleAcconti;
  };

  const calculateTotaleEseguito = () => {
    let totalEseguito = 0;
    data.map((item) => {
      if (item.status === "Eseguito") {
        if (listino === EListino.DEFAULT) {
          return (totalEseguito = totalEseguito + item.costoDefault!);
        }
        if (listino === EListino.GENTILE) {
          return (totalEseguito = totalEseguito + item.costoGentile!);
        }
      }
    });

    return totalEseguito;
  };

  return (
    <div className="container flex flex-col gap-y-5">
      <div className="w-full flex flex-col md:flex-row border-2  shadow-lg">
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-b-gray-900 p-3 w-full">
          <p className="text-md text-gray-500">Data preventivo</p>
          <p className="text-xl font-bold text-black">
            {format(pianoCreatedAt?.createdAt ?? new Date(), "dd/MM/yyyy")}
          </p>
        </div>
        <div className="border-b-2 md:border-b-0 md:border-r-2 border-b-gray-900  p-3 w-full">
          <p className="text-md text-gray-500">Listino</p>
          <SelectListino />
        </div>
        <div className=" p-3 w-full">
          <p className="text-md text-gray-500">Sconto</p>
          <div className="w-full flex items-center gap-2">
            <Input placeholder="0" className="w-[100px]" />
            <span className="text-gray-400">%</span>
          </div>
        </div>
      </div>

      <DataTable
        columns={listino === EListino.GENTILE ? columnsGentile : columnsDefault}
        data={data}
      />

      <div className="ml-auto right-0 w-fit bg-white rounded p-3 shadow-xl">
        <h3 className="font-bold">
          Totale <span className="font-normal">{calculateTotale()}$</span>
        </h3>
      </div>

      <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
        <div className="rounded-xl bg-green-400">
          <h3 className="text-center font-semibold text-xl text-white w-full bg-green-600 p-3 rounded-t-xl">
            Totale Acconti
          </h3>
          <h2 className="text-white font-bold text-2xl py-3 text-center">
            {calculateTotaleAcconti()}€
          </h2>
        </div>
        <div className="rounded-xl bg-yellow-400">
          <h3 className="text-center font-semibold text-xl text-white w-full bg-yellow-600 p-3 rounded-t-xl">
            Saldo Eseguito
          </h3>
          <h2 className="text-white font-bold text-2xl py-3 text-center">
            {calculateTotaleEseguito()}€
          </h2>
        </div>
        <div className="rounded-xl bg-red-400">
          <h3 className="text-center font-semibold text-xl text-white w-full bg-red-600 p-3 rounded-t-xl">
            Saldo su Totale
          </h3>
          <h2 className="text-white font-bold text-2xl py-3 text-center">
            {calculateTotale() - calculateTotaleAcconti()}€
          </h2>
        </div>
      </div>

      <div className="w-full rounded-lg p-4">
        <div className="w-full flex justify-between items-center">
          <h3 className="font-bold my-3">Pagamenti e acconti</h3>
          <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-4">
            <ButtonModal
              type={EModalType.CREATE_PAGAMENTO}
              value="Crea pagamento"
            />
            <PDFDownloadLink
              document={
                <ResocontoPagamento
                  prestazioni={data}
                  totale={calculateTotale()}
                  pagamenti={pagamenti}
                  totaleAcconti={calculateTotaleAcconti()}
                  pianoCuraCreationDate={format(
                    pianoCreatedAt?.createdAt ?? new Date(),
                    "dd/MM/yyyy"
                  )}
                  totaleEseguito={calculateTotaleEseguito()}
                  saldo={calculateTotale() - calculateTotaleAcconti()}
                  listino={listino}
                />
              }
              fileName={`${pianoCreatedAt?.cliente.cognome}_${pianoCreatedAt?.cliente.nome}_Resoconto_Pagamento`}
            >
              <Button type="button">Stampa resoconto</Button>
            </PDFDownloadLink>
          </div>
        </div>
        <DataTable columns={columnsPagamenti} data={pagamenti} />
      </div>
    </div>
  );
}
