import Image from "next/image";
import React, { FC } from "react";
import styles from "@/style/ContactSection/ContactSection.module.scss";

import CtaButton from "./CtaButton";
import { museoBold, museoLight } from "@/utils/font";

type ContactSection = {
  handleNavigation: () => void;
};

const ContactSection: FC<ContactSection> = ({ handleNavigation }) => {
  return (
    <div className={styles.container}>
      <div className={museoLight.className}>
        <div className={styles.containerInner}>
          <div className={styles.logoArea}>
            <Image
              src="/images/Centro_Picasso_Logotipo_bianco.svg"
              alt="logo dello studio dentistico Centro picasso in Sant'antimo provincia di Napoli"
              width={340}
              height={50}
            />
          </div>
          <div className={styles.textArea}>
            <div className={styles.textAreaInnerContainer}>
              <div className={styles.columnPlace1}>
                <div className={styles.line}>
                  <p>Via Pablo Picasso 104</p>
                  <p>
                    <span className={museoBold.className}>SantAntimo</span>,
                    80029 NA
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    Tel:{" "}
                    <span className={museoBold.className}>
                      +39 081083309593
                    </span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    Email:{" "}
                    <span className={museoBold.className}>
                      contatto1@centropicasso.it
                    </span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>Orari di apertura:</p>
                  <p className={museoBold.className}>Lunedì - Venerdì</p>
                  <p className={museoBold.className}>
                    dalle ore 09:00 alle ore 20:00
                  </p>
                </div>
              </div>
              <div className={styles.columnPlace2}>
                <div className={styles.line}>
                  <p>Via Biagio Riccio 9</p>
                  <p>
                    <span className={museoBold.className}>Giugliano</span>,
                    80014 NA
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    Tel:{" "}
                    <span className={museoBold.className}>+39 0815062565</span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>
                    Email:{" "}
                    <span className={museoBold.className}>
                      contatto2@centropicasso.it
                    </span>
                  </p>
                </div>
                <div className={styles.line}>
                  <p>Orari di apertura:</p>
                  <p className={museoBold.className}>Lunedì - Venerdì</p>
                  <p className={museoBold.className}>
                    dalle ore 09:00 alle ore 20:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.button} onClick={handleNavigation}>
          <CtaButton title="FISSA UN APPUNTAMENTO" bgColor="#2A4B9A" />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
