import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import styles from "@/style/DoctorSection/DoctorCard.module.scss";
import { DoctorCardProps } from "@/enum/types";

const DoctorCard: FC<DoctorCardProps> = ({
  image,
  name,
  surname,
  profession,
  mailto,
}) => {
  return (
    <div className={styles.containerCard}>
      <div className={styles.containerImage}>
        <Image
          src={`/images/${image}`}
          alt={`Immagine del Dottor ${name} ${surname}`}
          width={338}
          height={338}
        />
      </div>
      <div className={styles.containerBottom}>
        <div className={styles.containerText}>
          <div>
            <p className={styles.name}>
              {name} {surname}
            </p>
            <p className={styles.profession}>{profession}</p>
          </div>
        </div>
        <div className={styles.containerCTA}>
          <Link href={`mailto: ${mailto}`}>
            <Image
              src="/images/Centro_Picasso_icon_Email.svg"
              alt="Contatta il dottore"
              width={50}
              height={50}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
