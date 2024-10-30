import { getOperatore, getPrestazioniAgenda } from "@/actions/actions.clinica";
import CalendarBody from "@/components/dashboard/calendar/CalendarBody";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { redirect } from "next/navigation";

// export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { sede: string; idOperatore: string };
}) {
  const getColor = (
    ora_arrivo: string | null,
    ora_saluta: string | null,
    colorOperatore: string
  ): string => {
    if (ora_arrivo !== "" && ora_arrivo!.length > 0) {
      if (ora_saluta !== "" && ora_saluta!.length > 0) {
        return "black";
      } else {
        return colorOperatore;
      }
    } else {
      return colorOperatore;
    }
  };

  const data: {
    operatore: {
      id: string;
      colorAgenda: string | null;
      cognome: string | null;
      nome: string | null;
    };
    pianoCura: {
      cliente: {
        nome: string | null;
        cognome: string | null;
      };
    } | null;

    id: string;
    nome: string | null;
    start: string | null;
    end: string | null;
    ora_arrivo: string | null;
    ora_saluta: string | null;
    data_appuntamento: string | null;
    nota: string | null;
  }[] = await getPrestazioniAgenda(params.sede, "");

  const events: {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    backgroundColor: string;
    textColor: string;
    ora_arrivo: string;
    ora_saluta: string;
    nome: string;
    nomeOperatore: string;
    cognomeOperatore: string;
    nota: string;
    // className: string[];
  }[] = data.map((item) => {
    return {
      id: item.id,
      title: `${item.pianoCura?.cliente.cognome ?? ""} ${
        item.pianoCura?.cliente.nome ?? ""
      }`,
      start: item.start ?? "",
      end: item.end ?? "",
      backgroundColor: getColor(
        item.ora_arrivo ?? "",
        item.ora_saluta ?? "",
        item.operatore.colorAgenda ?? ""
      ),
      date: item.data_appuntamento ?? "",
      textColor: "white",
      ora_arrivo: item.ora_arrivo ?? "",
      ora_saluta: item.ora_saluta ?? "",
      nome: item.nome ?? "",
      nomeOperatore: item.operatore.nome ?? "",
      cognomeOperatore: item.operatore.cognome ?? "",
      nota: item.nota ?? "",
    };
  });

  const operatori = await getOperatore();

  async function selectOperatore(formData: FormData) {
    "use server";

    const operatore = formData.get("operatore");

    redirect(`/agenda/${params.sede}/${operatore}`);
  }

  return (
    <div className="lg:container px-3 lg:px-0 py-5 ">
      <form
        action={selectOperatore}
        className="flex gap-3 justify-start items-center mb-5"
      >
        <Select name="operatore">
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Seleziona un operatore" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {operatori.map((item, idx) => {
                return (
                  <SelectItem value={item.id} key={idx}>
                    {item.cognome} {item.nome}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit">Invia</Button>
      </form>
      <CalendarBody events={events} />
    </div>
  );
}
