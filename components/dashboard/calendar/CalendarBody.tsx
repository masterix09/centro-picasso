"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import itLocale from "@fullcalendar/core/locales/it";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ModalDettaglio from "../ModalDashboard/modalAgenda/ModalDettaglio";
import {
  setOrarioArrivo,
  setOrarioUscita,
  updateNotePrestazioneByID,
} from "@/actions/actions.clinica";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const initialState = {
  message: "",
};

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
    nome: string;
    nomeOperatore: string;
    cognomeOperatore: string;
    nota: string;
  }[];
}) => {
  const [state, formAction] = useFormState(
    updateNotePrestazioneByID,
    initialState
  );

  useEffect(() => {
    if (state.message === "OK") {
      toast({
        title: "Nota impostata.",
        description: "Nota impostata correttamente.",
      });
    } else if (state.message === "ERROR") {
      toast({
        variant: "destructive",
        title: "Uh Oh! Errore nell impostazione della nota.",
        description: "Nota non impostato correttamente. Riprova",
      });
    }
  }, [state.message]);

  const renderEventContent = (eventContent: EventContentArg) => {
    const item = events.filter((item) => item.id === eventContent.event.id);

    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={`rounded text-white shadow w-full h-full flex overflow-hidden gap-1 px-2`}
            style={{
              backgroundColor: eventContent.backgroundColor,
            }}
          >
            <i className="text-xs">{eventContent.event.title}</i>
            <br />
            <b className="text-xs">{eventContent.timeText}</b>
          </div>
        </DialogTrigger>
        <DialogContent className="p-5">
          <ModalDettaglio
            nomePrestazione={item?.at(0)?.nome ?? ""}
            nomeCognomePaziente={item?.at(0)?.title ?? ""}
            operatoreNome={item.at(0)?.nomeOperatore ?? ""}
            operatoreCognome={item.at(0)?.cognomeOperatore ?? ""}
            oraArrivo={
              item
                .at(0)
                ?.ora_arrivo.substring(
                  item.at(0)?.ora_arrivo?.length! - 5 ?? 11,
                  item.at(0)?.ora_arrivo.length
                ) ?? ""
            }
            oraUscita={
              item
                .at(0)
                ?.ora_saluta.substring(
                  item.at(0)?.ora_saluta?.length! - 5 ?? 11,
                  item.at(0)?.ora_saluta.length
                ) ?? ""
            }
          />
          <form action={formAction} className="mt-2" key={""}>
            <Textarea
              rows={4}
              name="nota"
              placeholder="Note.."
              defaultValue={item.at(0)?.nota ?? ""}
            />
            <input
              type="hidden"
              name="prestazioneId"
              value={item.at(0)?.id ?? ""}
            />
            <Button type="submit" className="mt-3">
              Salva Nota
            </Button>
          </form>
          <Button
            onClick={async () => {
              // setIdPrestazioneAgenda(eventContent.event.id);
              const res = await setOrarioArrivo(
                `${new Date().getHours()}:${
                  new Date().getMinutes().toString().length > 1
                    ? new Date().getMinutes()
                    : `${new Date().getMinutes()}0`
                }`,
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
