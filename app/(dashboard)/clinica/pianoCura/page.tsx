import ArcateBody from "@/components/dashboard/PianoDiCura/ArcateBody";
import DentiTable from "@/components/dashboard/PianoDiCura/DentiTable";
import { DataTable } from "./data-table";
import { redirect } from "next/navigation";
import { getPrestazioniByIdPiano } from "@/actions/actions.clinica";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { columns } from "./columns";
import LayoutClinica from "@/components/dashboard/common/LayoutClinica";

// export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    idCliente: string;
    idPiano: string;
  };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const data: {
    status: string | null;
    id: string;
    nome: string | null;
    categoria: string | null;
    denteId: string | null;
    costoDefault: number | null;
    costoGentile: number | null;
  }[] = await getPrestazioniByIdPiano(searchParams.idPiano?.toString() ?? "");

  return (
    <LayoutClinica
      searchParams={{
        idCliente: searchParams.idCliente,
        idPianoCura: searchParams.idPiano,
      }}
    >
      <div className="flex w-full h-full flex-col lg:flex-row gap-6">
        <div>
          <DentiTable />
        </div>
        <div>
          <ArcateBody />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </LayoutClinica>
  );
}
