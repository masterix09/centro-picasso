import { DataTable } from "./data-table";
import { columns, TDocument } from "./columns";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EModalType } from "@/enum/types";
import { getDocument } from "@/actions/actions.clinica";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
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

  const data: TDocument[] = await getDocument(
    searchParams.idPiano?.toString() ?? ""
  );

  return (
    <LayoutClinica
      searchParams={{
        idCliente: searchParams.idCliente,
        idPianoCura: searchParams.idPiano,
      }}
    >
      <div className="w-full">
        {searchParams.idPiano?.toString() &&
          searchParams.idPiano?.toString() && (
            <ButtonModal
              value="Crea documento"
              type={EModalType.CREATE_DOCUMENTO}
            />
          )}
      </div>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutClinica>
  );
}
