import ButtonModal from "@/components/dashboard/common/ButtonModal";

import { EModalType } from "@/enum/types";
import { redirect } from "next/navigation";

import { getPrestazioniListInPage } from "@/actions/actions.clinica";
import TabellaPrestazioniLista from "@/components/dashboard/prestazioniLista/TabellaPrestazioniLista";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export type TPrestazioneLista = {
  id: string;
  nome: string | null;
  categoria: string | null;
  costoDefault: number | null;
  costoGentile: number | null;
  forWho: string | null;
  sedeId?: string;
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const data = await getPrestazioniListInPage();

  return (
    <div className="container py-6">
      <div className="w-full">
        <ButtonModal
          type={EModalType.CREATE_PRESTAZIONE}
          value="Crea prestazione"
        />
      </div>
      <TabellaPrestazioniLista data={data} />
    </div>
  );
}
