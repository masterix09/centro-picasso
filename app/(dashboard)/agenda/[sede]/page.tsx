"use client";
import { EFetchLabel, EModalType } from "@/enum/types";
import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import itLocale from "@fullcalendar/core/locales/it";
import { redirect } from "next/navigation";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useStore } from "@/store/store";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useSession } from "next-auth/react";
import {
  getPrestazioneAgendaById,
  getPrestazioniAgenda,
  setOrarioArrivo,
  setOrarioUscita,
} from "@/actions/actions.clinica";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { sede: string } }) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");

  const {
    setIdPrestazioneAgenda,
    setModalOpen,
    setModalType,
    fetchLabel,
    setFetchLabel,
  } = useStore((state) => state);

  const handleClick = (type: EModalType) => {
    setModalOpen(true);
    setModalType(type);
  };

  const getColor = (
    ora_arrivo: string | null,
    ora_saluta: string | null,
    colorOperatore: string
  ): string => {
    if (ora_arrivo !== "" && ora_arrivo!.length > 0) {
      if (ora_saluta !== "" && ora_saluta!.length > 0) {
        const color = colorOperatore;
        return colorOperatore;
      } else {
        return "green";
      }
    } else {
      const color = colorOperatore;
      return colorOperatore;
    }
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`rounded text-white shadow w-full h-full flex overflow-hidden gap-5 px-2`}
            style={{
              backgroundColor: eventContent.backgroundColor,
            }}
          >
            <i className="text-xs">{eventContent.event.title}</i>
            <b className="text-xs">{eventContent.timeText}</b>
          </div>
        </DialogTrigger>
        <DialogContent className="p-5">
          <Button
            onClick={() => {
              setIdPrestazioneAgenda(eventContent.event.id);
              handleClick(EModalType.DETTAGLIO_EVENTO);
            }}
          >
            Guarda dettaglio
          </Button>
          <Button
            onClick={async () => {
              setIdPrestazioneAgenda(eventContent.event.id);
              const res = await setOrarioArrivo(
                `${new Date().getHours()}:${new Date().getMinutes()}`,
                eventContent.event.id
              );
              if (res === "ok") {
                toast({
                  title: "Orario impostato.",
                  description:
                    "Orario arrivo paziente impostato correttamente.",
                });
              } else {
                toast({
                  variant: "destructive",
                  title: "Uh Oh! Errore nell impostazione dell orario.",
                  description:
                    "Orario arrivo non impostato correttamente. Riprova",
                });
              }
              setFetchLabel(EFetchLabel.LISTA_EVENTI);
              // handleClick(EModalType.ORA_ARRIVO);
            }}
          >
            Arrivo cliente
          </Button>
          <Button
            onClick={async () => {
              setIdPrestazioneAgenda(eventContent.event.id);
              // handleClick(EModalType.ORA_USCITA);
              const res = await setOrarioUscita(
                `${new Date().getHours()}:${new Date().getMinutes()}`,
                eventContent.event.id
              );
              if (res === "ok") {
                toast({
                  title: "Orario impostato.",
                  description:
                    "Orario uscita paziente impostato correttamente.",
                });
              } else {
                toast({
                  variant: "destructive",
                  title: "Uh Oh! Errore nell impostazione dell orario.",
                  description:
                    "Orario uscita non impostato correttamente. Riprova",
                });
              }
              setFetchLabel(EFetchLabel.LISTA_EVENTI);
            }}
          >
            Uscita cliente
          </Button>
        </DialogContent>
      </Dialog>
    );
  };

  const eventLimit = 5; // Imposta il limite di eventi per cella
  const eventLimitClick = "popover"; // Sostituisci con 'popover' se vuoi mostrare una finestra di dialogo quando si supera il limite

  const [data, setData] = useState<
    {
      operatore: {
        id: string;
        colorAgenda: string | null;
      };
      pianoCura: {
        cliente: {
          nome: string | null;
          cognome: string | null;
        };
      };
      id: string;
      nome: string | null;
      start: string | null;
      end: string | null;
      data_appuntamento: string | null;
      ora_arrivo: string | null;
      ora_saluta: string | null;
    }[]
  >([]);

  useEffect(() => {
    getPrestazioniAgenda(params.sede).then((data) => setData(data));
  }, [params.sede]);

  useEffect(() => {
    if (fetchLabel === EFetchLabel.LISTA_EVENTI) {
      getPrestazioniAgenda(params.sede).then((data) => setData(data));
      setFetchLabel(EFetchLabel.NULL);
    }
  }, [fetchLabel, params.sede, setFetchLabel]);

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
    // className: string[];
  }[] = data.map((item) => {
    return {
      id: item.id,
      title: `${item.pianoCura.cliente.cognome} ${item.pianoCura.cliente.nome}`,
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
      // className: getColor(
      //   item.ora_arrivo ?? "",
      //   item.ora_saluta ?? "",
      //   item.operatore.colorAgenda ?? ""
      // ),
    };
  });

  console.log(events);

  return (
    // <div>
    //   {view === ECalendarView.MONTH_VIEW && <CalendarMonthView />}
    //   {view === ECalendarView.WEEK_VIEW && <CalendarWeekView />}
    // </div>

    <div className="lg:container px-3 lg:px-0 py-5 ">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "dayGridWeek,dayGridMonth, timeGridDay",
        }}
        locale={itLocale}
        timeZone="UTC"
        // events={[
        //   {
        //     title: "event 33",
        //     date: "2024-02-06",
        //     start: "2024-02-06T18:30:00Z",
        //     end: "2024-02-06T19:00:00Z",
        //     color: "green",
        //     textColor: "white",
        //     backgroundColor: "#1d12e6",
        //   },
        //   {
        //     title: "event 33",
        //     date: "2024-02-06",
        //     start: "2024-02-06T18:30:00Z",
        //     end: "2024-02-06T19:00:00Z",
        //     color: "green",
        //     textColor: "white",
        //     backgroundColor: "red",
        //   },
        // ]}
        events={events}
        eventContent={renderEventContent}
        dayMaxEventRows={3}
      />
    </div>
  );
}
