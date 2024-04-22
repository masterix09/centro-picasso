"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import {
  ActivitySquare,
  BadgeEuro,
  FileImage,
  FilePlus,
  Heart,
  ScrollText,
  UserRoundPlus,
} from "lucide-react";

const NavbarClinica = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <nav className="flex flex-nowrap justify-center items-center gap-6 border-b-2 py-3 overflow-x-auto">
      <Link
        href={{
          pathname: "/clinica/anamnesi",
          query: {
            idCliente: searchParams.get("idCliente"),
            idPiano: searchParams.get("idPiano"),
          },
        }}
        className={`flex justify-center items-center gap-2 ${
          pathname === "/clinica/anamnesi" && "border-b-2 border-b-blue-500"
        } `}
      >
        <Heart className="w-4 h-4 text-gray-900 active:text-blue-500" />

        <span className="uppercase text-gray-900 text-sm">Anamnesi</span>
      </Link>
      <Link
        href={{
          pathname: "/clinica/pianoCura",
          query: {
            idCliente: searchParams.get("idCliente"),
            idPiano: searchParams.get("idPiano"),
          },
        }}
        className={`flex justify-center items-center gap-2 ${
          pathname === "/clinica/pianoCura" && "border-b-2 border-b-blue-500 "
        } `}
      >
        <ActivitySquare className="w-4 h-4 text-gray-900 active:text-blue-500" />

        <span className="uppercase text-gray-900 text-sm">Piano di cura</span>
      </Link>
      <Link
        href={{
          pathname: "/clinica/immagini",
          query: {
            idCliente: searchParams.get("idCliente"),
            idPiano: searchParams.get("idPiano"),
          },
        }}
        className={`flex justify-center items-center gap-2 ${
          pathname === "/clinica/immagini" && "border-b-2 border-b-blue-500"
        } `}
      >
        <FileImage className="w-4 h-4 text-gray-900 active:text-blue-500" />

        <span className="uppercase text-gray-900 text-sm">Immagini</span>
      </Link>
      <Link
        href={{
          pathname: "/clinica/documenti",
          query: {
            idCliente: searchParams.get("idCliente"),
            idPiano: searchParams.get("idPiano"),
          },
        }}
        className={`flex justify-center items-center gap-2 ${
          pathname === "/clinica/documenti" && "border-b-2 border-b-blue-500"
        } `}
      >
        <ScrollText className="w-4 h-4 text-gray-900 active:text-blue-500" />

        <span className="uppercase text-gray-900 text-sm">Documenti</span>
      </Link>
      <Link
        href={{
          pathname: "/clinica/preventivo",
          query: {
            listino: "gentile",
            idCliente: searchParams.get("idCliente"),
            idPiano: searchParams.get("idPiano"),
          },
        }}
        className={`flex justify-center items-center gap-2 ${
          pathname === "/clinica/preventivo" && "border-b-2 border-b-blue-500"
        } `}
      >
        <BadgeEuro className="w-4 h-4 text-gray-900 active:text-blue-500" />

        <span className="uppercase text-gray-900 text-sm">Preventivo</span>
      </Link>
    </nav>
  );
};

export default NavbarClinica;
