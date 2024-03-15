import React, { FC } from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import Paragraph from "../common/Paragraph";
import ParagraphText from "../common/ParagraphText";

import ParagraphList from "../common/ParagraphList";
import Footer from "../common/Footer";
import Header from "../common/Header";
import { SmartTAGPropsDocument } from "@/types";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
  pointerSection: {
    marginTop: 20,
    width: "100%",
    borderBottom: "1px solid black",
  },
});

const ConsensoChirurgia: FC<{
  description: SmartTAGPropsDocument;
  nome: string;
  cognome: string;
}> = ({ description, cognome, nome }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="DICHIARAZIONE DI RICEVUTA INFORMAZIONE E CONSENSO AD INTERVENTO DI CHIRURGIA ORALE">
          <ParagraphText text="Gentile Paziente, con questo modulo si riassumono i concetti relativi al suo trattamento già oralmente espressi nel corso della visita, in modo da avere, anche per iscritto, il Suo assenso alla esecuzione delle terapie preventivate come previsto dal nuovo Codice Deontologico." />
        </Paragraph>
        <Paragraph title="Diagnosi">
          <ParagraphText text={description.Diagnosi} />
          <ParagraphText text="Eliminazione di una patologia in atto attraverso un intervento chirurgico locale." />
          <ParagraphList text="Estrazione di uno o più denti ormai compromessi, inclusi o semi-inclusi;" />
          <ParagraphList text="asportazione di piccole cisti," />
          <ParagraphList text="asportazione di radici" />
          <ParagraphList text="Possibile apertura di un lembo di accesso e relativa sutura. " />
          <ParagraphList text="Altro" />
          <ParagraphText text="Si agisce con l’estrazione di un elemento dentario in questi casi (il suo caso è indicato con un X):" />
          <ParagraphList text="Carie destruente della corona" />
          <ParagraphList text="Presenza di lesioni apicali intrattabili con trattamenti di endodonzia o apicectomia " />
          <ParagraphList text="Gravi lesioni parodontali (della gengiva e dell’osso) con mobilità dell’elemento dentario" />
          <ParagraphList text="Interferenza del dente con riabilitazioni protesiche coerenti" />
          <ParagraphList text="Frattura della radice " />
          <ParagraphList text="Ragioni ortodontiche (necessità di creare spazio per un corretto allineamento dentale)" />
        </Paragraph>
        {description.Benefici.length > 0 && (
          <Paragraph title="Benefici dell'intervento">
            <ParagraphText
              text={`L'avulsione di un elemento dentario si può rendere necessaria per evitare processi infiammatori, danneggiamento dei denti adiacenti o nel suo caso: ${description.Benefici}`}
            />
          </Paragraph>
        )}
        <Paragraph title="Rischi dell'intervento ">
          <ParagraphText text="Sono relativi : all'impiego inevitabile di anestetico locale, con vasocostrittore o senza, a cui alcuni soggetti possono risultare particolarmente sensibili per allergie, patologie renali, cardiache, endocrine o stato di gravidanza; alla possibilità di traumi sulle mucose a causa degli strumenti manuali o meccanici ; all’eventualità di ingestione accidentale di detti strumenti. a possibili lesioni ossee o parodontali: Si possono altresì ledere strutture quali in nervo alveolare inferiore (con susseguenti parestesie, anestesie, ecc.) o il seno mascellare." />
          <ParagraphText text="Nel suo caso: " />
          <ParagraphList text="Lesioni ossee, parodontali," />
          <ParagraphList text="permanenza degli apici radicolari nell’alveolo causa frattura radicolare durante estrazione," />
          <ParagraphList text="lesioni denti adiacenti," />
          <ParagraphList text={`Altro: ${description.Rischi}`} />
        </Paragraph>
        <Paragraph title="Complicazioni">
          <ParagraphText text="Dopo l'intervento è possibile avere dolore, infezione, infiammazione o emorragia facilmente controllabili. Raramente si verifica una temporanea impotenza funzionale ed un rialzo della temperatura. Nel suo caso vi possono essere i seguenti rischi specifici:" />
          <View style={styles.pointerSection}></View>
          <ParagraphText text="Le complicazioni si riducono notevolmente seguendo scrupolosamente le indicazioni del proprio dentista (allegate)." />
        </Paragraph>
        <Paragraph title="Possibili alternative">
          <View style={styles.pointerSection}></View>
        </Paragraph>
        <ParagraphText
          text={`Io sottoscritto/a ${cognome} ${nome} dichiaro di essere stato/a informato/a e di aver compreso lo scopo e la natura degli atti di chirurgia orale indicati nel presente modulo, e di avere altresì consapevolezza dei rischi e delle complicazioni che ne potrebbero derivare.`}
        />
        <ParagraphText text="Presto pertanto il mio assenso alle terapie che mi sono state illustrate e spiegate." />

        <Footer />
      </Page>
    </Document>
  );
};

export default ConsensoChirurgia;
