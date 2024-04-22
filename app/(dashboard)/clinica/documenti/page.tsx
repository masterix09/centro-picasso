import { DataTable } from "./data-table";
import { columns, TDocument } from "./columns";
import ButtonModal from "@/components/dashboard/common/ButtonModal";
import { EModalType } from "@/enum/types";
import { getDocument } from "@/actions/actions.clinica";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const data: TDocument[] = await getDocument(
    searchParams.idPiano?.toString() ?? ""
  );

  return (
    <>
      <div className="w-full">
        <ButtonModal
          value="Crea documento"
          type={EModalType.CREATE_DOCUMENTO}
        />
      </div>
      <div className="py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
