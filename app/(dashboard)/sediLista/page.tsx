import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EModalType } from "@/enum/types";
import { redirect } from "next/navigation";
import { getSede } from "@/actions/actions.clinica";
import TabellaSediLista from "@/components/dashboard/sediLista/TabellaSediLista";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const data = await getSede();

  return (
    <div className="container py-6">
      <div className="w-full">
        <ButtonModal type={EModalType.CREATE_SEDE} value="Crea sede" />
      </div>
      <TabellaSediLista data={data} />
    </div>
  );
}
