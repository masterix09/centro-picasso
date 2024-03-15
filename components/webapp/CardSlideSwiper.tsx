import Image from "next/image";
import React, { FC } from "react";
import styles from "@/style/ServiceSection/CardSlideSwiper.module.scss";

type CardSlideSwiperProps = {
  image: string;
  text: string;
};

const CardSlideSwiperServizi: FC<CardSlideSwiperProps> = ({ image, text }) => {
  return (
    <div className={styles.container}>
      <Image
        src={`/images/${image}`}
        alt="Logo servizio"
        width={150}
        height={34}
        priority={true}
      />
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default CardSlideSwiperServizi;
