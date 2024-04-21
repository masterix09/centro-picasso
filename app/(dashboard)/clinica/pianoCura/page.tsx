import ArcateBody from "@/components/dashboard/PianoDiCura/ArcateBody";
import DentiTable from "@/components/dashboard/PianoDiCura/DentiTable";
import { DataTable } from "./data-table";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { EFetchLabel, EModalType } from "@/enum/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EStatusPrestazione } from "@/types";
import {
  getPrestazioniByIdPiano,
  updateStatusPrestazione,
} from "@/actions/actions.clinica";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/utils/authOptions";
import { columns } from "./columns";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const { data: session, status } = useSession();
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

  // const { toast } = useToast();

  // const handleClick = (type: EModalType) => {
  //   setModalOpen(true);
  //   setModalType(type);
  // };

  return (
    <>
      <div className="flex w-full h-full flex-col lg:flex-row gap-6">
        <div>
          <DentiTable />
        </div>
        <div>
          <ArcateBody />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </>
  );
}
