import React, { FC } from "react";
import styles from "@/style/DoctorSection/DoctorSection.module.scss";
import DoctorCard from "./DoctorCard";
import Slider from "./Slider";
import { ESliderSection } from "@/enum/types";
import { museoBold } from "@/utils/font";

type DoctorSectionProps = {
  uri?: string;
};

const DoctorSection: FC<DoctorSectionProps> = ({ uri }) => {
  const data = [
    {
      name: "Antonio",
      surname: "Cancelliere",
      profession: "Direttore di Clinica",
      image: "Centro_Picasso_foto_dentista_1.png",
      mailto: "prova@example.com",
    },
    {
      name: "Antonio",
      surname: "Cancelliere",
      profession: "Direttore di Clinica",
      image: "Centro_Picasso_foto_dentista_2.png",
      mailto: "prova@example.com",
    },
    {
      name: "Antonio",
      surname: "Cancelliere",
      profession: "Direttore di Clinica",
      image: "Centro_Picasso_foto_dentista_3.png",
      mailto: "prova@example.com",
    },
  ];
  return (
    <div className={styles.container}>
      {uri && (
        <div className={styles.titleContainer}>
          <p className={`${museoBold.className} ${styles.title}`}>
            Resta in contatto
          </p>
          <p className={styles.title}>col tuo dentista di fiducia</p>
        </div>
      )}

      <div className={styles.innerContainer}>
        <DoctorCard
          name="Antonio"
          surname="Cancelliere"
          profession="Direttore di Clinica"
          image="Centro_Picasso_foto_dentista_1.png"
          mailto="prova@example.com"
        />
        <DoctorCard
          name="Antonio"
          surname="Cancelliere"
          profession="Direttore di Clinica"
          image="Centro_Picasso_foto_dentista_2.png"
          mailto="prova@example.com"
        />
        <DoctorCard
          name="Antonio"
          surname="Cancelliere"
          profession="Direttore di Clinica"
          image="Centro_Picasso_foto_dentista_3.png"
          mailto="prova@example.com"
        />
      </div>
      <div className={styles.innerContainerMobile}>
        <Slider
          cardType={ESliderSection.HOME_SERVICE_DOCTOR}
          pagination={true}
          slidesPerViewDesktop={1}
          slidesPerViewMobile={1}
          doctorCardContent={data}
        />
      </div>
    </div>
  );
};

export default DoctorSection;
