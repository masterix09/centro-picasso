import { getListaPazienti } from "@/actions/actions.listaPazienti";
import TabellaListaPAzienti from "@/components/dashboard/listaPazienti/TabellaListaPAzienti";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const data = await getListaPazienti();

  console.log(data);

  return <TabellaListaPAzienti data={data} />;
}
