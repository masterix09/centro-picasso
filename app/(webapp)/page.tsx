"use client";
import BookAppointment from "@/components/webapp/BookAppointment";
import DoctorSection from "@/components/webapp/DoctorSection";
import HeroSection from "@/components/webapp/HeroSection";
import ServiceSection from "@/components/webapp/ServiceSection";
import TestimonialSection from "@/components/webapp/TestimonialSection";
import {
  EBookAppointmentDirection,
  EModalType,
  ESliderSection,
} from "@/enum/types";
import { useStore } from "@/store/store";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const refBook = useRef<HTMLDivElement>(null);

  const handleNavigation = () => {
    let currentSectionRef = null;

    currentSectionRef = refBook;

    window.scrollTo({
      top: currentSectionRef?.current?.offsetTop,
      behavior: "smooth",
    });
  };

  const [success, setSuccess] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { setIdOperatore, setModalOpen, setModalType, setSuccessPrenotazione } =
    useStore((state) => state);

  useEffect(() => {
    console.log("success => ", success);
    console.log("isOpen => ", isOpen);
    setSuccessPrenotazione(success);
    setModalOpen(isOpen);
    setModalType(EModalType.PRENOTAZIONE_SITO);
  }, [isOpen, setModalOpen, setModalType, setSuccessPrenotazione, success]);

  // setModalOpen(true);
  // setModalType(EModalType.PRENOTAZIONE_SITO);
  // setSuccessPrenotazione(success);

  return (
    <main>
      {/* {isOpen && <Modale isOpen={isOpen} success={success} />} */}
      <HeroSection
        titleStrong="Siamo alleati"
        titleLight="del tuo sorriso"
        description="Con competenza e professionalità, offriamo trattamenti dentali di alta qualità per tutta la famiglia."
        section={ESliderSection.HOME}
      />
      <ServiceSection handleNavigation={handleNavigation} />
      <BookAppointment
        direction={EBookAppointmentDirection.NORMAL}
        setSuccess={setSuccess}
        setIsOpen={setIsOpen}
      />
      <DoctorSection />
      <TestimonialSection ref={refBook} />
    </main>
  );
}
