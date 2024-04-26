import { getInfoPazienteByIdAnagrafica } from "@/actions/actions.clinica";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: { idCliente: string };
}) {
  const user = await getInfoPazienteByIdAnagrafica(params.idCliente);
  return (
    <div className="w-[90%] md:w-[80%] lg:w-[50%] mx-auto mt-6 px-2 bg-white rounded-3xl shadow-xl p-4">
      <div className="w-full flex justify-center items-center border-b-2 border-blue-100">
        <Image
          src={"/images/dashboard/male-avatar.png"}
          alt="male avatar"
          width={80}
          height={80}
        />
        <h3 className="text-xl font-semibold">
          {user?.cognome} {user?.nome}
        </h3>
      </div>
      <h3 className="font-bold text-2xl md:text-3xl text-center py-2 border-b-2 border-blue-100">
        Dettaglio anagrafica
      </h3>
      <div className="flex flex-col gap-y-3">
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Nome: <span className="text-lg font-normal">{user?.nome}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Cognome: <span className="text-lg font-normal">{user?.cognome}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Data di nascita:{" "}
          <span className="text-lg font-normal">{user?.data_nascita}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Luogo di nascita:{" "}
          <span className="text-lg font-normal">{user?.luogo_nascita}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Sesso: <span className="text-lg font-normal">{user?.sesso}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Citta: <span className="text-lg font-normal">{user?.citta}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Indirizzo:{" "}
          <span className="text-lg font-normal">{user?.indirizzo}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Cap: <span className="text-lg font-normal">{user?.CAP}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Email: <span className="text-lg font-normal">{user?.email}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Telefono:{" "}
          <span className="text-lg font-normal">{user?.Telefono}</span>
        </p>
        <p className="text-xl font-semibold py-2 border-b-2 border-blue-100">
          Professione:{" "}
          <span className="text-lg font-normal">{user?.Professione}</span>
        </p>
      </div>
    </div>
  );
}
