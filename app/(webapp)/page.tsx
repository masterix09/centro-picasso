import BookAppointment from "@/components/webapp/BookAppointment";
import DoctorSection from "@/components/webapp/DoctorSection";
import HeroSection from "@/components/webapp/HeroSection";
import ServiceSection from "@/components/webapp/ServiceSection";
import TestimonialSection from "@/components/webapp/TestimonialSection";
import { EBookAppointmentDirection, ESliderSection } from "@/enum/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomePage | Studio dentistico Centro Picasso",
  description:
    "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
  openGraph: {
    type: "website",
    description:
      "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    locale: "it-IT",
    url: "https://www.centropicasso.it",
    title: "HomePage | Studio dentistico Centro Picasso",
    siteName: "Centro Picasso",
  },
  authors: {
    name: "Andrea Verde",
  },
  twitter: {
    description:
      "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    title: "HomePage | Studio dentistico Centro Picasso",
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

export default function Home() {
  return (
    <main>
      <HeroSection
        titleStrong="Siamo alleati"
        titleLight="del tuo sorriso"
        description="Con competenza e professionalità, offriamo trattamenti dentali di alta qualità per tutta la famiglia."
        section={ESliderSection.HOME}
      />
      <ServiceSection />
      <BookAppointment direction={EBookAppointmentDirection.NORMAL} />
      <DoctorSection />
      <TestimonialSection />
    </main>
  );
}
