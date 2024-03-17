"use client";

import styles from "@/style/ContactSection/ContactPage.module.scss";
import React, { useEffect, useRef, useState } from "react";
import stylesTwo from "@/style/ContactSection/Contact.module.scss";
// import Modale from "@/app/components/common/Modale";
import ContactSection from "@/components/webapp/ContactSection";
import DoctorSection from "@/components/webapp/DoctorSection";
import BookAppointment from "@/components/webapp/BookAppointment";
import { EBookAppointmentDirection, EModalType } from "@/enum/types";
import { useStore } from "@/store/store";

export default function Contatti() {
  const refBook = useRef<HTMLDivElement>(null);

  const handleNavigation = () => {
    let currentSectionRef = null;

    currentSectionRef = refBook;

    window.scrollTo({
      top: currentSectionRef?.current?.offsetTop,
      behavior: "smooth",
    });
  };

  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { setIdOperatore, setModalOpen, setModalType, setSuccessPrenotazione } =
    useStore((state) => state);

  useEffect(() => {
    console.log("success => ", success);
    console.log("isOpen => ", isOpen);
    setSuccessPrenotazione(success);
    setModalOpen(isOpen);
    setModalType(EModalType.PRENOTAZIONE_SITO);
  }, [isOpen, setModalOpen, setModalType, setSuccessPrenotazione, success]);

  return (
    <main>
      {/* {isOpen && <Modale isOpen={isOpen} success={success} />} */}
      <div className={styles.container}>
        <ContactSection handleNavigation={handleNavigation} />
      </div>
      <div className={stylesTwo.container}>
        <div className={stylesTwo.innerContainer}>
          <DoctorSection uri={"ciao"} />
          <BookAppointment
            direction={EBookAppointmentDirection.INVERSE}
            ref={refBook}
            setSuccess={setSuccess}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </main>
  );
}
