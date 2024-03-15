import React, { FC } from "react";
import { Page, StyleSheet, Document } from "@react-pdf/renderer";
import Header from "../common/Header";
import ParagraphText from "../common/ParagraphText";
import Paragraph from "../common/Paragraph";
import ParagraphList from "../common/ParagraphList";
import Footer from "../common/Footer";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
});

const IstruzioniPostChirurgia: FC<{ nome: string; cognome: string }> = ({
  cognome,
  nome,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="ISTRUZIONI DI COMPORTAMENTO DOPO ESECUZIONE DI INTERVENTO DI CHIRURGIA ORALE E/O PARODONTALE">
          <ParagraphText text={`Sig. / Sig.ra ${cognome} ${nome}`} />
          <ParagraphText text="Gentile Paziente, con questo modulo si riassumono le raccomandazioni generali successive al suo trattamento già oralmente espresse:" />
          <ParagraphList text="Non sputare, non sciacquare per le due o tre ore successive;" />
          <ParagraphList text="Non fumare, non assumere alcolici, non bere caffè per le 24 ore successive all'intervento;" />
          <ParagraphList text="Parlare poco e non assumere bevande o cibi caldi o eccessivamente consistenti per le 24 ore successive;" />
          <ParagraphList text="Possibilmente non guidare per lunghi tratti o andare in bicicletta nelle due ore successive all'intervento;" />
          <ParagraphList text="Dopo le prime due ore lavarsi i denti evitando la zona interessata dove eventualmente si può sciacquare con prodotti specifici (clorexidina o altri);" />
          <ParagraphList text="Rimuovere i tamponi (generalmente un'ora dopo l'intervento) e far rimuovere le suture nei tempi consigliati (generalmente 7-10 giorni dopo l'intervento)" />
          <ParagraphList text="Fare attenzione a non mordersi le labbra o le guance sino al completo esaurimento degli effetti dell'anestesia." />
          <ParagraphList text="Applicare del ghiaccio sulla zona nelle ore successive all'intervento secondo le modalità consigliate" />
          <ParagraphList text="Seguire scrupolosamente la terapia farmacologica e le cadenze fissate per i controlli." />
        </Paragraph>
        <ParagraphText text="N.B. Per qualsiasi dubbio o problema rivolgersi al proprio dentista o al medico curante." />
        <ParagraphText
          text={`Io sottoscritto/a ${cognome} ${nome} dichiaro di essere stato/a informato/a e di aver compreso le raccomandazioni
successive all'intervento chirurgico.`}
        />
        <Footer />
      </Page>
    </Document>
  );
};

export default IstruzioniPostChirurgia;
