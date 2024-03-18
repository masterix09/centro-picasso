import React from "react";
import styles from "@/style/service/Testimonials/TestimonialSection.module.scss";
import Slider from "./Slider";
import { TSliderProps } from "@/models/common/common";
import { ESliderSection } from "@/enum/types";
import { museoBold } from "@/utils/font";

const Paragraph = () => {
  const card: TSliderProps[] = [
    {
      image: "Centro_Picasso_Icon.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      nome: "Margherita",
      cognome: "Lamino",
    },
    {
      image: "Centro_Picasso_Icon.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      nome: "Margherita",
      cognome: "Lamino",
    },
    {
      image: "Centro_Picasso_Icon.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      nome: "Margherita",
      cognome: "Lamino",
    },
    {
      image: "Centro_Picasso_Icon.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
      nome: "Margherita",
      cognome: "Lamino",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.textArea}>
        <div className={styles.titleContainer}>
          <div className={museoBold.className}>
            <h1 className={styles.title}>Servizio di punta</h1>
          </div>
          <h2 className={styles.title}>Perchè farlo?</h2>
        </div>
        <p className={styles.paragraph}>
          Siete alla ricerca di un servizio dentistico che offra eccellenza,
          comfort e risultati sorprendenti? Il nostro servizio di punta è la
          risposta. Ecco perché dovreste scegliere noi:
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          1. Esperienza e competenza: Un team di dentisti altamente qualificati
          e con anni di esperienza al vostro servizio.
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          2. Approccio personalizzato: Ascoltiamo le vostre esigenze e offriamo
          soluzioni su misura per garantire il miglior trattamento possibile.
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          3. Tecnologie all&apos;avanguardia: Utilizziamo strumenti innovativi
          per diagnosi precise e trattamenti efficaci.
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          4. Comfort e relax: Creiamo un&apos;atmosfera accogliente e rilassante
          per mettervi a vostro agio durante le visite.
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          5. Risultati visibili: Il nostro obiettivo è trasformare i sorrisi,
          donando fiducia ed estetica.
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          6. Assistenza post-trattamento: Siamo qui per fornire assistenza
          continua e rispondere a ogni domanda dopo il trattamento.
        </p>
        <p className={`mt-4 ${styles.elenco_numerato}`}>
          7. Testimonianze soddisfatte: Le storie dei nostri pazienti
          testimoniano la nostra dedizione, competenza e risultati eccezionali.
        </p>
      </div>
      <div className={styles.testimonialArea}>
        <Slider
          slidesPerViewMobile={1}
          slidesPerViewDesktop={1}
          card={card}
          cardType={ESliderSection.TESTIMONIALS_SERVICE_PAGE}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Paragraph;
