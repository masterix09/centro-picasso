import React, { FC } from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";
import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import ParagraphText from "../common/ParagraphText";
import Footer from "../common/Footer";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
});

const ConsensoCBCT: FC<{ cognome: string; nome: string }> = ({
  cognome,
  nome,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="Dichiarazione di consenso informato CBCT">
          <ParagraphText
            text="Ai sensi delle raccomandazioni per l’impiego corretto delle apparecchiature TC volumetriche «Cone beam» (10A06042)
(G.U.Serie Generale n. 124 del 29 maggio 2010)"
          />
          <ParagraphText text="La dose espressa in prodotto dose-area alla regione anatomica sottoposta a indagine è pari a ............. mGycm2. Qualora desiderasse la valutazione della dose efficace relativa al suo esame, che indicativamente è compresa fra 25 e 200 μSv, questa potrà essere effettuata dallo specialista in Fisica Medica a seguito di specifica richiesta scritta" />
          <ParagraphText
            text={`Il/La sottoscritto/a ${cognome} ${nome}, nato/a a Sant'Agata De' Goti (BN) il 07/10/1997 Nella necessità di doversi sottoporre a esame radiologico TC CONE BEAM, come indicato nella relazione clinica dello specialista`}
          />
          <ParagraphText text="DICHIARA" />
          <ParagraphText
            text="sotto la propria responsabilità di essere stato/a esaurientemente informato/a, in maniera chiara e comprensibile, delle problematiche diagnostiche che motivano l’esecuzione della procedura, della sua natura, dei vantaggi previsti per la sua
            salute e anche degli eventuali rischi connessi all’uso delle radiazioni ionizzanti, nonché delle precauzioni prese per prevenirli e
            acconsente all’esecuzione degli esami indicati dal medico/odontoiatra."
          />
        </Paragraph>
        <Footer />
      </Page>
    </Document>
  );
};

export default ConsensoCBCT;
