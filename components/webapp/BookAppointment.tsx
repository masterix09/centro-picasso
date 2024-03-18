"use client";

import React, {
  useState,
  forwardRef,
  ReactElement,
  SetStateAction,
  Dispatch,
} from "react";
import styles from "@/style/BookAppointment/BookAppointment.module.scss";
import { EBookAppointmentDirection, EModalType } from "@/enum/types";
import DatePicker from "react-datepicker";
// import it from "date-fns/locale/it";
// registerLocale("it", it);
import "react-datepicker/dist/react-datepicker.css";
import { useStore } from "@/store/store";

type SelectOptionProps = {
  id: number;
  place: string;
};

// eslint-disable-next-line react/display-name
const BookAppointment = forwardRef<
  HTMLDivElement,
  {
    direction: EBookAppointmentDirection;
    setSuccess?: Dispatch<SetStateAction<boolean>>;
    setIsOpen?: Dispatch<SetStateAction<boolean>>;
  }
>(({ direction, setSuccess, setIsOpen }, ref): ReactElement => {
  const option: SelectOptionProps[] = [
    {
      id: 1,
      place: "Sant'Antimo",
    },
    {
      id: 2,
      place: "Giugliano",
    },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [place, setPlace] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const { setIdOperatore, setModalOpen, setModalType, setSuccessPrenotazione } =
    useStore((state) => state);

  const sendEmailToMe = async () => {
    const formattedDate = `${startDate.getDate()}/${
      startDate.getMonth() + 1
    }/${startDate.getFullYear()}`;
    try {
      const res = await fetch("/api/sendToMe", {
        method: "POST",
        body: JSON.stringify({
          email,
          date: formattedDate,
          place,
          nome,
        }),
      });

      if (res.ok) {
        setSuccessPrenotazione(true);
        setModalOpen(true);
        setModalType(EModalType.PRENOTAZIONE_SITO);
      } else {
        setSuccessPrenotazione(false);
        setModalOpen(true);
        setModalType(EModalType.PRENOTAZIONE_SITO);
      }
    } catch (e: any) {
      setSuccessPrenotazione(false);
      setModalOpen(true);
      setModalType(EModalType.PRENOTAZIONE_SITO);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({
          email,
          nome,
        }),
      });

      if (res.ok) {
        sendEmailToMe();
      } else {
        setSuccessPrenotazione(true);
        setModalOpen(true);
        setModalType(EModalType.PRENOTAZIONE_SITO);
      }
    } catch (e: any) {
      setSuccessPrenotazione(false);
      setModalOpen(true);
      setModalType(EModalType.PRENOTAZIONE_SITO);
    }
  };

  return (
    <div
      className={
        direction === EBookAppointmentDirection.NORMAL
          ? styles.container
          : `${styles.container} bg-transparent`
      }
      ref={ref}
      id="sectionToScroll"
    >
      <div
        className={
          direction === EBookAppointmentDirection.NORMAL
            ? styles.appointmentContainer
            : `${styles.appointmentContainer} right-8`
        }
      >
        <h2 className={styles.title}>Prenota una visita</h2>
        <div className={styles.formContainer}>
          <h4 className={styles.description}>
            Richiedi un appuntamento presso uno dei nostri centri specializzati
          </h4>

          <select
            className={styles.inputCustom}
            // placeholder={"Seleziona una sede"}
            onChange={(e) => setPlace(e.target.value)}
          >
            <option value="Seleziona una sede">Seleziona una sede</option>
            {option.map((item) => {
              return (
                <option key={item.id} value={item.place}>
                  {item.place}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            className={styles.inputCustom}
            placeholder="Nome e cognome"
            value={nome || ""}
            onChange={(e) => setNome(e.target.value)}
          />

          <input
            type="email"
            className={styles.inputCustom}
            placeholder="Email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
          />

          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date!)}
            locale="it-IT"
            dateFormat="dd/MM/yyyy"
            className={styles.inputCustom}
          />
          <div className={styles.containerButton}>
            <button
              type="submit"
              className={styles.buttonForm}
              onClick={handleSubmit}
            >
              INVIA
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          direction === EBookAppointmentDirection.NORMAL
            ? styles.imageContainer
            : `${styles.imageContainer} left-0`
        }
      ></div>
    </div>
  );
});

export default BookAppointment;
