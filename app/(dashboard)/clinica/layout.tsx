"use client";
import {
  getPazienti,
  getPianoCuraByIdCliente,
} from "@/actions/actions.clinica";
import ModalCreatePaziente from "@/components/dashboard/ModalDashboard/ModalCreatePaziente";
import ModalCreatePianoCura from "@/components/dashboard/ModalDashboard/ModalCreatePianoCura";
import NavbarClinica from "@/components/dashboard/NavbarClinica";
import SearchInput from "@/components/dashboard/SearchInput";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { EFetchLabel, EModalType } from "@/enum/types";
import { useStore } from "@/store/store";
import { IPaziente } from "@/types";
import { FilePlus, UserRoundPlus } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ReactNode, Suspense, useEffect, useState } from "react";

export const dynamic = "force-dynamic";

export default function ClinicaLayout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const [valuePaziente, setValuePaziente] = useState<string>("");
  const [valuePinaoCura, setValuePianoCura] = useState<string>("");
  const [users, setUsers] = useState<IPaziente[]>([]);
  const [pianoCura, setPianoCura] = useState<
    {
      id: string;
      titolo: string | null;
      createdAt: Date | null;
      preventivoId: string | null;
      clienteId: string;
    }[]
  >([]);

  const { fetchLabel, setFetchLabel } = useStore((state) => state);

  const getNomeCognome = () => {
    const find = users?.find((framework) => framework.id === valuePaziente);
    return `${find?.cognome} ${find?.nome}`;
  };

  const getCF = () => {
    const find = users?.find((framework) => framework.id === valuePaziente);
    return `${find?.codice_fiscale}`;
  };

  const getNomePianoCura = () => {
    const find = pianoCura?.find(
      (framework) => framework.id === valuePinaoCura
    );
    return `${find?.titolo}`;
  };

  useEffect(() => {
    getPazienti().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (fetchLabel === EFetchLabel.LISTA_PAZIENTI) {
      getPazienti().then((data) => setUsers(data));
      setFetchLabel(EFetchLabel.NULL);
    }
  }, [fetchLabel, setFetchLabel]);

  useEffect(() => {
    if (valuePaziente !== "") {
      getPianoCuraByIdCliente(valuePaziente).then((data) => setPianoCura(data));
    }
  }, [users, valuePaziente]);

  useEffect(() => {
    if (fetchLabel === EFetchLabel.LISTA_PIANO_CURA) {
      if (valuePaziente !== "") {
        getPianoCuraByIdCliente(valuePaziente).then((data) =>
          setPianoCura(data)
        );
      }
      setFetchLabel(EFetchLabel.NULL);
    }
  }, [fetchLabel, setFetchLabel, valuePaziente]);

  return (
    <>
      <NavbarClinica />
      <div className="w-full flex flex-col lg:flex-row p-3 gap-6">
        <div className="w-full lg:w-1/4 rounded border-gray-300 bg-white p-4 ">
          <div className="flex gap-4 items-center">
            <SearchInput
              label="Seleziona paziente..."
              placeholder="Cerca paziente.."
              items={users}
              value={valuePaziente}
              setValue={setValuePaziente}
              displayValue={getNomeCognome}
              type="PAZIENTE"
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
          <div className="flex items-center my-3 gap-x-4">
            <Image
              src={"/images/dashboard/male-avatar.png"}
              alt="male avatar"
              width={50}
              height={50}
            />
            {valuePaziente && (
              <div>
                <h6 className="font-semibold">{getNomeCognome()}</h6>
              </div>
            )}
          </div>
          <div className="py-3 border-t-2 border-b-2 border-t-gray-400 border-b-gray-400 flex justify-between my-2">
            {valuePaziente && (
              <h6 className="text-gray-400 text-sm">
                CF: <span className="text-black font-bold">{getCF()}</span>
              </h6>
            )}
          </div>
          {valuePaziente !== "" && (
            <div className="flex gap-4 items-center">
              <SearchInput
                label="Seleziona piano di cura..."
                placeholder="Cerca piano di cura.."
                items={pianoCura}
                value={valuePinaoCura}
                setValue={setValuePianoCura}
                displayValue={getNomePianoCura}
                type="PIANO_CURA"
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
                <ModalCreatePianoCura
                  idCliente={searchParams.get("idCliente")}
                />
              </AlertDialog>
            </div>
          )}
        </div>
        <div className="w-full h-full">{children}</div>
      </div>
    </>
  );
}
