import React, { FC } from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import { Document, Page } from "@react-pdf/renderer";
import ParagraphText from "../common/ParagraphText";
import Paragraph from "../common/Paragraph";
import ParagraphList from "../common/ParagraphList";
import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
});

const TrattamentoDatiPersonali: FC<{
  nome: string;
  cognome: string;
  cf: string;
}> = ({ cf, cognome, nome }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <ParagraphText text={`${nome} ${cognome}`} withoutMarginTop />
        <ParagraphText text={`${cf}`} withoutMarginTop />
        <Paragraph
          title="Consenso al trattamento dei dati ed informative ai sensi del Codice sulla Privacy
(D.Leg.vo 196/03)"
        >
          <ParagraphText text="Per fornirci i suoi dati personali, La preghiamo di leggere il presente foglio informativo." />
          <ParagraphText text="Per “dati” si intendono:" />
          <ParagraphList text="quelli che Le richiediamo oggi, col presente modulo e che potremo richiederLe in futuro;" />
          <ParagraphList text="quelli sanitari che avremo occasione di rilevare nell’espletamento delle prestazioni mediche a suo favore;" />
          <ParagraphList text="quelli sanitari necessari o che si renderanno necessari per l’espletamento della nostra attività nel perseguimentodella finalità di tutela della Sua salute;" />
          <ParagraphList text="quelli spontaneamente da Lei forniti." />
          <ParagraphText text="I dati vengono da noi raccolti con l’esclusiva finalità di svolgere la nostra attività professionale nei suoi confronti, compresa la gestione contabile del rapporto. In particolare provvederemo a tenere le registrazioni obbligatorie per legge, sia amministrative che sanitarie." />
          <ParagraphText text="I dati potranno essere registrati su supporti informatici e cartacei che verranno da noi mantenuti e protetti con modalità idonee" />
          <ParagraphText text=" I dati potranno essere:" />
          <ParagraphList text="comunicati al suo medico curante in caso di necessità o comunicati ad altro personale sanitario;" />
          <ParagraphList text="messi a disposizione del personale odontoiatrico associato, che frequenta, che collabora o che dovesse sostituire il titolare in caso di sua assenza;" />
          <ParagraphList text="resi noti ai dipendenti ed ai consulenti dello studio per gli aspetti che possono riguardarli e secondo le modalità previste dalla legge;" />
          <ParagraphList text="comunicati ai laboratori odontotecnici per le attività loro proprie, secondo le norme del D.lgt. 46/97, dir. 93/42/CEE" />
          <ParagraphText text="i Suoi diritti: " />
          <ParagraphText text="Ottenere, a cura del titolare, senza ritardo: " />
          <ParagraphList text="la conferma o meno dell’esistenza dei dati personali che La riguardano, anche se non ancora registrati, e la comunicazione in forma intelligibile dei medesimi dati e della loro origine, nonché della logica e delle finalità su cui si basa il trattamento: la richiesta può essere rinnovata, salvo giustificati motivi, con intervallo non minore di 90 giorni;" />
          <ParagraphList text="la cancellazione, la trasformazione in forma anonima o il blocco dei dati trattati in violazione della legge, compresi quelli di cui non è necessaria la conservazione in relazione agli scopi per i quali sono stati raccolti o successivamente trattati;" />
          <ParagraphList text="l’aggiornamento, la rettificazione, ovvero qualora ne abbia interesse, l’integrazione dei dati;" />
          <ParagraphList text="l’attestazione che le operazioni di cui ai precedenti n. 2 e 3 sono state portate a conoscenza, anche per quanto riguarda il loro contenuto, di coloro ai quali i dati sono stati comunicati, eccettuato i casi in cui tale adempimento si riveli impossibile o comporti un impiego di mezzi manifestamente sproporzionato al diritto tutelato; " />
          <ParagraphText text="Opporsi in tutto od in parte al trattamento dei dati personali che La riguardano, ancorché pertinenti allo scopo della raccolta." />
          <ParagraphText text="Per quanto riguarda il suo diritto ad opporsi in tutto od in parte al trattamento di dati personali che La riguardano ai fini di invio di materiale pubblicitario o di vendita diretta ovvero per il compimento di ricerche di mercato o di comunicazione commerciale, Le precisiamo che tali attività NON verranno comunque svolte dal nostro Studio inquanto estranee all’esercizio professionale medico e odontoiatrico." />
          <ParagraphText text="La informiamo inoltre che per poter ottenere una corretta erogazione dei nostri servizi professionali è necessario che ci fornisca i dati richiesti." />
          <ParagraphText text="Le segnaliamo che il titolare del trattamento dati è il Dott. Antonio Cancelliere" />
        </Paragraph>
        <Paragraph title="Consenso">
          <ParagraphText text="Apponendo la firma in calce al presente modulo, manifesto il mio consenso al trattamento dei dati, nell’ambito delle finalità e modalità di cui sopra, e nei limiti in cui il mio consenso fosse richiesto ai fini della legge." />
          <ParagraphText text="In particolare manifesto il mio consenso espresso per: " />
          <ParagraphList text="l’acquisizione e il trattamento dei dati di cui al punto 1 e 2;" />
          <ParagraphList text="la comunicazione dei dati a terzi e il trattamento ai sensi del punto 4;" />
        </Paragraph>
        <Footer />
      </Page>
    </Document>
  );
};

export default TrattamentoDatiPersonali;
