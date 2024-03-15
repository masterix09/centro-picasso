import Image from "next/image";
import React, { FC } from "react";
import styles from "@/style/TestimonialSection/CardSlideSwiperTestimonials.module.scss";

type CardSlideSwiperProps = {
  image: string;
  text: string;
  nome: string;
  cognome: string;
  width: number;
  height: number;
  borderRadius?: number;
};

const CardSlideSwiperTestimonials: FC<CardSlideSwiperProps> = ({
  image,
  text,
  nome,
  cognome,
  width,
  height,
  borderRadius,
}) => {
  return (
    <div
      className={styles.container}
      style={{ width: width, height: height, borderRadius: borderRadius }}
    >
      <p className={styles.text}>{text}</p>
      <div
        className={styles.bottomContainer}
        style={{ borderRadius: borderRadius }}
      >
        <Image
          src={`/images/${image}`}
          alt="Avatar persona"
          height={50}
          width={50}
        />
        <p className={styles.person}>
          {nome} {cognome}
        </p>
      </div>
    </div>
  );
};

export default CardSlideSwiperTestimonials;
