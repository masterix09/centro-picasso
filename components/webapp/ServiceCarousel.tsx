import React, { FC } from "react";
import Image from "next/image";
import styles from "@/style/service/ServiceCarousel.module.scss";
import { ServiziProps } from "@/enum/types";

const ServiceCarousel: FC<ServiziProps> = ({ icon, text }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerInner}>
        <Image
          src={`/images/services/icon_servizi/${icon}`}
          alt={icon}
          width={250}
          height={100}
          className={styles.containerInnerImage}
        />
        <div>
          <p className={styles.containerInnerText}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
