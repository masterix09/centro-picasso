import styles from "@/style/ContactSection/ContactPage.module.scss";
import React from "react";
import stylesTwo from "@/style/ContactSection/Contact.module.scss";
import ContactSection from "@/components/webapp/ContactSection";
import DoctorSection from "@/components/webapp/DoctorSection";
import BookAppointment from "@/components/webapp/BookAppointment";
import { EBookAppointmentDirection, EModalType } from "@/enum/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contatti | Studio dentistico Centro Picasso",
  description:
    "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
  openGraph: {
    type: "website",
    description:
      "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    locale: "it-IT",
    url: "https://www.centropicasso.it",
    title: "Contatti | Studio dentistico Centro Picasso",
    siteName: "Centro Picasso",
  },
  authors: {
    name: "Andrea Verde",
  },
  twitter: {
    description:
      "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    title: "Contatti | Studio dentistico Centro Picasso",
    site: "Centro Picasso",
    creator: "Andrea Verde",
  },
  keywords: [
    "Sant'Antimo",
    "Napoli",
    "Centro Picasso",
    "Studio Dentistico",
    "Dentista",
    "Odontoiatria",
    "Trattamenti Dentali",
    "Cure Dentistiche",
    "Implantologia",
    "Ortodonzia",
    "Odontoiatra",
    "Chirurgia Dentale",
    "Urgenze Dentali",
    "Prenotazione Online",
    "Visita Odontoiatrica",
  ],
};

export default function Contatti() {
  return (
    <main>
      <div className={styles.container}>
        <ContactSection />
      </div>
      <div className={stylesTwo.container}>
        <div className={stylesTwo.innerContainer}>
          <DoctorSection uri={"ciao"} />
          <BookAppointment direction={EBookAppointmentDirection.INVERSE} />
        </div>
      </div>
    </main>
  );
}
