"use client";

import styles from "@/style/service/Hero/Hero.module.scss";
import { useState } from "react";
// import Modale from "@/app/components/common/Modale";
import Slider from "@/components/webapp/Slider";
import Paragraph from "@/components/webapp/Paragraph";
import BookAppointment from "@/components/webapp/BookAppointment";
import { ServiziProps } from "@/models/common/common";
import { EBookAppointmentDirection, ESliderSection } from "@/enum/types";

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

  const [success, setSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      {/* {isOpen && <Modale isOpen={isOpen} success={success} />} */}
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
      <BookAppointment
        direction={EBookAppointmentDirection.NORMAL}
        setSuccess={setSuccess}
        setIsOpen={setIsOpen}
      />
    </main>
  );
}