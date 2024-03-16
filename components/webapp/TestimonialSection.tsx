import React, { forwardRef, ReactElement } from "react";
import styles from "@/style/TestimonialSection/TestimonialSection.module.scss";
import CtaButton from "./CtaButton";
import Slider from "./Slider";
import { ESliderSection } from "@/enum/types";
import { museoBold } from "@/utils/font";
import { TSliderProps } from "@/models/common/common";

// eslint-disable-next-line react/display-name
const TestimonialSection = forwardRef<HTMLDivElement, {}>(
  ({}, ref): ReactElement => {
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
      <div className={styles.container} ref={ref}>
        <div className={styles.innerContainer}>
          <div className={styles.textArea}>
            <div className={museoBold.className}>
              <h2 className={styles.title}>Fidati dell’opinione</h2>
            </div>
            <h2 className={styles.title}>dei nostri pazienti</h2>
            <p className={styles.description}>
              Scopri come abbiamo trasformato sorrisi e cambiato vite! Le nostre
              testimonianze parlano da sole: pazienti soddisfatti che hanno
              ritrovato fiducia grazie ai nostri trattamenti dentali di qualità.
              Fissa un appuntamento oggi stesso. Il tuo sorriso merita il
              meglio!
            </p>

            {/* <button type="button" className={styles.cta}>
            FISSA UN APPUNTAMENTO
          </button> */}
            <div className={styles.ctaSection}>
              <CtaButton href="/contatti" title="FISSA UN APPUNTAMENTO" />
            </div>
          </div>
          <div className={styles.SwiperArea}>
            <Slider
              slidesPerViewMobile={1}
              slidesPerViewDesktop={1}
              card={card}
              cardType={ESliderSection.TESTIMONIALS}
              pagination={false}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default TestimonialSection;
