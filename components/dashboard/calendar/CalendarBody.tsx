"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import itLocale from "@fullcalendar/core/locales/it";
import React from "react";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import ModalDettaglio from "../ModalDashboard/modalAgenda/ModalDettaglio";
import { setOrarioArrivo, setOrarioUscita } from "@/actions/actions.clinica";
import { toast } from "@/components/ui/use-toast";

const CalendarBody = ({
  events,
}: {
  events: {
    id: string;
    title: string;
    date: string;
    start: string;
    end: string;
    backgroundColor: string;
    textColor: string;
    ora_arrivo: string;
    ora_saluta: string;
  }[];
}) => {
  console.log(events);
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
          {/* <AlertDialog> */}
          {/* <AlertDialogTrigger asChild> */}
          {/* <Button type="button">Elimina</Button> */}
          {/* </AlertDialogTrigger> */}
          {/* <ModalDettaglio idPrestazioneAgenda={eventContent.event.id} /> */}
          {/* </AlertDialog> */}
          <Button
            onClick={async () => {
              // setIdPrestazioneAgenda(eventContent.event.id);
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
              // setFetchLabel(EFetchLabel.LISTA_EVENTI);
              // handleClick(EModalType.ORA_ARRIVO);
            }}
          >
            Arrivo cliente
          </Button>
          <Button
            onClick={async () => {
              // setIdPrestazioneAgenda(eventContent.event.id);
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
              // setFetchLabel(EFetchLabel.LISTA_EVENTI);
            }}
          >
            Uscita cliente
          </Button>
        </DialogContent>
      </Dialog>
    );
  };
  return (
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
      events={events}
      eventContent={renderEventContent}
      dayMaxEventRows={3}
    />
  );
};

export default CalendarBody;
