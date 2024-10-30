import { db } from "@/lib/db";
import { differenceInDays, differenceInYears, format } from "date-fns";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import { authOptions } from "@/utils/authOptions";
import { redirect } from "next/navigation";
import {
  getAppuntamenti,
  getClienti,
  getCompleanni,
} from "@/actions/actions.dashboard";

// export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  const appuntamenti = await getAppuntamenti();

  const currentDate = format(new Date(), "dd-MM-yyyy");

  const compleanni = await getCompleanni(currentDate);

  const cliente = await getClienti();

  return (
    <div className="w-full flex flex-col md:flex-row gap-y-6 md:gap-x-6 p-4">
      <div className="w-full rounded-xl border-2 border-slate-600">
        <h3 className="text-2xl font-bold text-black border-b-2 border-b-slate-600 text-center">
          Lista Appuntamenti oggi
        </h3>
        {appuntamenti.map((item, idx) => {
          return (
            <div
              className="flex justify-center items-center px-4 py-2 border-b-2 border-b-slate-600 gap-x-5 rounded-xl"
              key={item.id}
            >
              <span className="text-xl font-bold text-white bg-slate-800 rounded-full w-9 h-8 text-center">
                {idx + 1}
              </span>
              <div className="w-full">
                <p className="text-xl font-semibold">
                  {item.pianoCura?.cliente.cognome ?? ""}{" "}
                  {item.pianoCura?.cliente.nome ?? ""}
                </p>
                <p className="text-md font-normal">
                  {item.nome} {item.start?.substring(item.start.length, 11)} -{" "}
                  {item.end?.substring(item.end.length, 11)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full rounded-xl border-2 border-slate-600">
        <h3 className="text-2xl font-bold text-black border-b-2 border-b-slate-600 text-center">
          Lista Compleanni Oggi
        </h3>
        {compleanni.map((item, idx) => {
          return (
            <div
              className="flex justify-center items-center px-4 py-2 border-b-2 border-b-slate-600 gap-x-5 rounded-xl"
              key={idx}
            >
              <span className="text-xl font-bold text-white">
                <Image
                  src="/gestionale/clinica/cake.svg"
                  alt="torta"
                  width={40}
                  height={40}
                />
              </span>
              <div className="w-full">
                <p className="text-xl font-semibold">
                  {item.cognome} {item.nome}
                </p>
                <p className="text-md font-normal">
                  {differenceInYears(
                    format(new Date(), "yyyy-MM-dd"),
                    item.data_nascita!
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full rounded-xl border-2 border-slate-600">
        <h3 className="text-2xl font-bold text-black border-b-2 border-b-slate-600 text-center">
          Lista Richiami
        </h3>
        {cliente.map((item, idx) => {
          return (
            differenceInDays(new Date(item.data_richiamo!), new Date()) >= 0 &&
            differenceInDays(new Date(item.data_richiamo!), new Date()) <
              11 && (
              <div
                className="flex justify-center items-center px-4 py-2 border-b-2 border-b-slate-600 gap-x-5 rounded-xl"
                key={idx}
              >
                <span className="text-xl font-bold text-white bg-slate-800 rounded-full w-9 h-8 text-center">
                  {idx + 1}
                </span>
                <div className="w-full">
                  <p className="text-xl font-semibold">
                    {item.cognome} {item.nome}
                  </p>
                  <p className="text-md font-normal">{item.data_richiamo}</p>
                </div>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
