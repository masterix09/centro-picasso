import React, { ReactNode } from "react";
import NavbarClinica from "../NavbarClinica";
import { IPaziente } from "@/types";
import {
  getPazienti,
  getPianoCuraByIdCliente,
} from "@/actions/actions.clinica";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FilePlus, UserRoundPlus } from "lucide-react";
import ModalCreatePaziente from "../ModalDashboard/ModalCreatePaziente";
import Image from "next/image";
import Link from "next/link";
import ModalCreatePianoCura from "../ModalDashboard/ModalCreatePianoCura";
import SearchInputPaziente from "../SearchInputPaziente";
import SearchInputPianoCura from "../SearchInputPianoCura";

type Props = {
  children: ReactNode;
  searchParams: {
    idCliente: string;
    idPianoCura: string;
  };
};

const LayoutClinica = async ({ children, searchParams }: Props) => {
  const users: IPaziente[] = await getPazienti();
  const pianoCura: {
    id: string;
    titolo: string | null;
    createdAt: Date | null;
    preventivoId: string | null;
    clienteId: string;
  }[] = await getPianoCuraByIdCliente(searchParams.idCliente);

  const getNomeCognome = () => {
    const find = users?.find(
      (framework) => framework.id === searchParams.idCliente
    );
    return `${find?.cognome} ${find?.nome}`;
  };

  const getCF = () => {
    const find = users?.find(
      (framework) => framework.id === searchParams.idCliente
    );
    return `${find?.codice_fiscale}`;
  };

  const getNomePianoCura = () => {
    const find = pianoCura?.find(
      (framework) => framework.id === searchParams.idPianoCura
    );
    return `${find?.titolo}`;
  };

  return (
    <div className="w-full min-h-screen">
      <NavbarClinica />
      <div className="w-full flex flex-col lg:flex-row h-full">
        <div className="w-full lg:w-1/4 h-full rounded border-gray-300 bg-white p-4">
          <div className="w-full flex flex-col lg:flex-row gap-3 justify-between items-center">
            <SearchInputPaziente
              emptyMessage="Nessun paziente trovato"
              label="Cerca paziente"
              placeholder="Cerca Paziente"
              value={searchParams.idCliente}
              items={users}
              displayValue={getNomeCognome()}
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant={"ghost"}
                  className="border border-gray-300 hover:bg-[#2a4b9a] hover:border-none group"
                >
                  <UserRoundPlus className="h-4 w-4 text-[#545454] group-hover:text-white" />
                </Button>
              </AlertDialogTrigger>
              <ModalCreatePaziente />
            </AlertDialog>
          </div>
          {searchParams.idCliente && searchParams.idCliente !== "" && (
            <>
              <Link href={`/anagrafica/${searchParams.idCliente}`}>
                <div className="flex items-center my-3 gap-x-4">
                  <Image
                    src={"/images/dashboard/male-avatar.png"}
                    alt="male avatar"
                    width={50}
                    height={50}
                  />
                  <div>
                    <h6 className="font-semibold">{getNomeCognome()}</h6>
                  </div>
                </div>
              </Link>
              <h1 className="font-bold my-4">
                CF: <span className="uppercase">{getCF()}</span>
              </h1>
              <div className="w-full flex flex-col lg:flex-row gap-3 justify-between items-center">
                <SearchInputPianoCura
                  emptyMessage="Nessun piano di cura trovato"
                  label="Cerca piano"
                  placeholder="Cerca piano"
                  value={searchParams.idPianoCura}
                  items={pianoCura}
                  displayValue={getNomePianoCura()}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant={"ghost"}
                      className="border border-gray-300 hover:bg-[#2a4b9a] hover:border-none group"
                    >
                      <FilePlus className="h-4 w-4 text-[#545454] group-hover:text-white" />
                    </Button>
                  </AlertDialogTrigger>
                  <ModalCreatePianoCura idCliente={searchParams.idCliente} />
                </AlertDialog>
              </div>
            </>
          )}
        </div>
        <div className="w-full lg:w-3/4 h-full">{children}</div>
      </div>
    </div>
  );
};

export default LayoutClinica;
