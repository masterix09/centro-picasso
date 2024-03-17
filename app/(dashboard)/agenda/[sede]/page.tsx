"use client";
import CalendarMonthView from "@/components/dashboard/calendar/CalendarMonthView";
import CalendarWeekView from "@/components/dashboard/calendar/CalendarWeekView";
import { ECalendarView, EModalType } from "@/enum/types";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import itLocale from "@fullcalendar/core/locales/it";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { getPrestazioniAgenda } from "@/actions/actions.clinica";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { TPrestazione } from "../../clinica/pianoCura/columns";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useStore } from "@/store/store";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

export default function Page({ params }: { params: { sede: string } }) {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");

  // const [view, setView] = useState<ECalendarView>(ECalendarView.WEEK_VIEW);
  const {
    idPrestazioneAgenda,
    setIdPrestazioneAgenda,
    setModalOpen,
    setModalType,
  } = useStore((state) => state);

  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

  const handleClick = (type: EModalType) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("modalOpen", "true");
    // params.set("modalType", type);
    // replace(`${pathname}?${params.toString()}`);
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
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`rounded text-white shadow w-full h-full flex overflow-hidden gap-5 px-2`}
            style={{
              backgroundColor: eventContent.backgroundColor,
            }}
          >
            <i className="text-xs">{eventContent.event.title}</i>
            <b className="text-xs">{eventContent.timeText}</b>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem
            onClick={() => {
              setIdPrestazioneAgenda(eventContent.event.id);
              handleClick(EModalType.DETTAGLIO_EVENTO);
            }}
          >
            Guarda dettaglio
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              setIdPrestazioneAgenda(eventContent.event.id);
              handleClick(EModalType.ORA_ARRIVO);
            }}
          >
            Arrivo cliente
          </ContextMenuItem>
          <ContextMenuItem
            onClick={() => {
              setIdPrestazioneAgenda(eventContent.event.id);
              handleClick(EModalType.ORA_USCITA);
            }}
          >
            Uscita cliente
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
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
    fetch(`/api/getAgendaPrestazioni/${params.sede}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setData(data))
      .catch((data) => console.log(data));
  }, [params.sede]);

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
