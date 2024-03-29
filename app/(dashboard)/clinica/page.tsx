import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  return (
    <main className="w-full h-full p-4">
      <h1>Page Clinica</h1>
    </main>
  );
}
