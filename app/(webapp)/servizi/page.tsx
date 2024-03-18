import styles from "@/style/service/Hero/Hero.module.scss";
import Slider from "@/components/webapp/Slider";
import Paragraph from "@/components/webapp/Paragraph";
import BookAppointment from "@/components/webapp/BookAppointment";
import { ServiziProps } from "@/models/common/common";
import { EBookAppointmentDirection, ESliderSection } from "@/enum/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servizi | Studio dentistico Centro Picasso",
  description:
    "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
  openGraph: {
    type: "website",
    description:
      "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    locale: "it-IT",
    url: "https://www.centropicasso.it",
    title: "Servizi | Studio dentistico Centro Picasso",
    siteName: "Centro Picasso",
  },
  authors: {
    name: "Andrea Verde",
  },
  twitter: {
    description:
      "Centro Picasso - Il tuo studio dentistico di fiducia a Sant'Antimo. Offriamo cure odontoiatriche di alta qualità, incluse pulizie dentali, trattamenti per le carie e procedimenti cosmetici. Prenota una visita oggi stesso per un sorriso sano e luminoso! ",
    title: "Servizi | Studio dentistico Centro Picasso",
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

export default function Servizi() {
  const heroContent: ServiziProps[] = [
    {
      icon: "Conservativa_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
    },
    {
      icon: "Endodonzia_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Gnatologia_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Igiene dentale_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Implantologia_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Ortodonzia_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Parodontologia_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Pedodonzia_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      icon: "Protesi_Artic Grey_02.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
  ];

  return (
    <main>
      <div className={styles.Hero}>
        <Slider
          cardType={ESliderSection.SERVICE_PAGE}
          pagination={true}
          slidesPerViewDesktop={1}
          slidesPerViewMobile={1}
          heroContent={heroContent}
        />
      </div>
      <Paragraph />
      <BookAppointment direction={EBookAppointmentDirection.NORMAL} />
    </main>
  );
}
