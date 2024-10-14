import {
  TPrestazionePreventivo,
  columnsGentile,
  columnsDefault,
  TPagamentiPreventivo,
  columnsPagamenti,
} from "./columns";
import { DataTable } from "./data-table";
import { EListino } from "@/enum/types";
import SelectListino from "@/components/dashboard/PianoDiCura/preventivo/SelectListino";
import {
  getPagamentiByIdPiano,
  getPianoCuraCreatedDate,
  getPrestazioniByIdPiano,
} from "@/actions/actions.clinica";
import { format } from "date-fns";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import ButtonPDF from "@/components/dashboard/preventivo/ButtonPDF";
import ButtonCreatePagamento from "@/components/dashboard/preventivo/ButtonCreatePagamento";
import LayoutClinica from "@/components/dashboard/common/LayoutClinica";

// export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    idCliente: string;
    idPiano: string;
    listino: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const idPiano = searchParams.idPiano?.toString() ?? "";
  const listino = searchParams.listino?.toString() ?? "";

  const prestazioniData: TPrestazionePreventivo[] =
    await getPrestazioniByIdPiano(idPiano);

  const pagamentiData: TPagamentiPreventivo[] = await getPagamentiByIdPiano(
    idPiano
  );

  const pianoCreatedAtData: {
    createdAt: Date | null;
    cliente: {
      nome: string | null;
      cognome: string | null;
    };
  } | null = await getPianoCuraCreatedDate(idPiano);

  // Wait for the promises to resolve
  const [data, pagamenti, pianoCreatedAt] = await Promise.all([
    prestazioniData,
    pagamentiData,
    pianoCreatedAtData,
  ]);

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
      if (item.status === "Completato") {
        if (listino === EListino.DEFAULT) {
          totalEseguito = totalEseguito + item.costoDefault!;
        }
        if (listino === EListino.GENTILE) {
          totalEseguito = totalEseguito + item.costoGentile!;
        }
      }
    });

    totalEseguito = totalEseguito - calculateTotaleAcconti();

    return totalEseguito < 0 ? 0 : totalEseguito;
  };

  return (
    <LayoutClinica
      searchParams={{
        idCliente: searchParams.idCliente,
        idPianoCura: searchParams.idPiano,
      }}
    >
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
          {/* <div className=" p-3 w-full">
          <p className="text-md text-gray-500">Sconto</p>
          <div className="w-full flex items-center gap-2">
            <Input placeholder="0" className="w-[100px]" />
            <span className="text-gray-400">%</span>
          </div>
        </div> */}
        </div>

        <DataTable
          columns={
            listino === EListino.GENTILE ? columnsGentile : columnsDefault
          }
          data={data}
        />

        <div className="ml-auto right-0 w-fit bg-white rounded p-3 shadow-xl">
          <h3 className="font-bold">
            Totale <span className="font-normal">{calculateTotale()}€</span>
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
              {/* <ButtonModal
              type={EModalType.CREATE_PAGAMENTO}
              value="Crea pagamento"
            /> */}

              <ButtonCreatePagamento
                idPiano={searchParams.idPiano?.toString() ?? ""}
              />

              <ButtonPDF
                calculateTotale={calculateTotale()}
                calculateTotaleAcconti={calculateTotaleAcconti()}
                calculateTotaleEseguito={calculateTotaleEseguito()}
                cognomeCliente={pianoCreatedAt?.cliente.cognome ?? ""}
                data={data}
                listino={listino as EListino}
                nomeCliente={pianoCreatedAt?.cliente.nome ?? ""}
                pagamenti={pagamenti}
                pianoCuraCreationDate={format(
                  pianoCreatedAt?.createdAt ?? new Date(),
                  "dd/MM/yyyy"
                )}
              />
            </div>
          </div>
          <DataTable columns={columnsPagamenti} data={pagamenti} />
        </div>
      </div>
    </LayoutClinica>
  );
}
