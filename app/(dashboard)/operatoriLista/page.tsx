import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EModalType } from "@/enum/types";
import { getOperatore } from "@/actions/actions.clinica";
import { redirect } from "next/navigation";
import TabellaOperatoriLista from "@/components/dashboard/operatoriLista/TabellaOperatoriLista";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const data = await getOperatore();

  return (
    <div className="container py-6">
      <div className="w-full">
        <ButtonModal
          type={EModalType.CREATE_OPERATORE}
          value="Crea operatore"
        />
      </div>
      <TabellaOperatoriLista data={data} />
    </div>
  );
}
