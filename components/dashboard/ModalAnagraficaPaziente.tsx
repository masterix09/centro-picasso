"use client";
import { getInfoPazienteByIdAnagrafica } from "@/actions/actions.clinica";
import { EListino } from "@/enum/types";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ModalAnagraficaPaziente = () => {
  const searchParams = useSearchParams();

  const [user, setUser] = useState<{
    nome: string | null;
    cognome: string | null;
    email: string | null;
    data_nascita: string | null;
    Telefono: string | null;
  } | null>({
    nome: "",
    cognome: "",
    email: "",
    data_nascita: "",
    Telefono: "",
  });

  useEffect(() => {
    getInfoPazienteByIdAnagrafica(searchParams.get("idCliente") ?? "").then(
      (item) => setUser(item)
    );
  }, [searchParams]);
  return (
    <div className="w-full">
      <div className="flex gap-x-3 items-center mb-5">
        <Image
          src={"/images/dashboard/male-avatar.png"}
          alt="male avatar"
          width={80}
          height={80}
        />
        <h3 className="text-3xl font-bold">
          {user?.cognome} {user?.nome}
        </h3>
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-3 border-r-2 border-r-black flex flex-col gap-y-4">
          <Link
            href={{
              pathname: "/clinica/anamnesi",
              query: {
                idCliente: searchParams.get("idCliente") ?? "",
                idPiano: searchParams.get("idPiano") ?? "",
              },
            }}
          >
            Anamnesi
          </Link>
          <Link
            href={{
              pathname: "/clinica/preventivo",
              query: {
                listino: EListino.DEFAULT,
                idCliente: searchParams.get("idCliente") ?? "",
                idPiano: searchParams.get("idPiano") ?? "",
              },
            }}
          >
            Preventivi
          </Link>
          <Link
            href={{
              pathname: "/clinica/pianoCura",
              query: {
                idCliente: searchParams.get("idCliente") ?? "",
                idPiano: searchParams.get("idPiano") ?? "",
              },
            }}
          >
            Piani di cura
          </Link>
        </div>
        <div className="col-span-9 border-t-2 border-t-black pl-2">
          <h3 className="font-semibold text-sm my-3">
            Data di nascita:
            <span className="text-gray-500 text-sm"> {user?.data_nascita}</span>
          </h3>
          <h3 className="font-semibold text-sm my-3">
            Email:
            <span className="text-gray-500 text-sm"> {user?.email}</span>
          </h3>
          <h3 className="font-semibold text-sm my-3">
            Telefono:
            <span className="text-gray-500 text-sm"> {user?.Telefono}</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ModalAnagraficaPaziente;
