import React, { FC } from "react";
import { Document, Page, StyleSheet } from "@react-pdf/renderer";
import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import ParagraphText from "../common/ParagraphText";
import ParagraphList from "../common/ParagraphList";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
});

const ConsensoProtesiRimovibile: FC<{
  nome: string;
  cognome: string;
}> = ({ cognome, nome }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="DICHIARAZIONE DI RICEVUTA INFORMAZIONE E CONSENSO AD INTERVENTO DI PROTESI RIMOVIBILE">
          <ParagraphText text={`Sig. / Sig.ra ${cognome} ${nome}`} />
          <ParagraphText text="Gentile Paziente, con questo modulo si riassumono i concetti relativi al suo trattamento già oralmente espressi nel corso della visita, in modo da avere, anche per iscritto, il Suo assenso alla esecuzione delle terapie preventivate come previsto dal nuovo Codice Deontologico." />
        </Paragraph>
        <Paragraph title="Diagnosi">
          <ParagraphText text=" edentulia totale o parziale inferiore e/o superiore" />
        </Paragraph>
        <Paragraph title="Descrizione dell'intervento">
          <ParagraphText text="Sostituzione degli elementi dentari mancanti utilizzando apparecchiature rimovibili" />
          <ParagraphList text="protesi parziali, con appoggio mucoso e su elementi dentali residui" />
          <ParagraphList text="protesi totali, con appoggio sulla sola mucosa orale" />
          <ParagraphText text="per restituire la funzionalità, l'estetica e/o la capacità di resistere al carico masticatorio nel caso di denti compromessi da pregresse patologie" />
        </Paragraph>
        <Paragraph title="Benefici dell'intervento">
          <ParagraphText text="Possibilità di sostituire denti mancanti o di avere elementi stabilizzati con ripristino della funzione masticatoria e/o dell'estetica del sorriso." />
        </Paragraph>
        <Paragraph title="Rischi dell'intervento">
          <ParagraphText
            text="Sono relativi: all'impiego inevitabile di anestetico locale, con vasocostrittore o senza, a cui alcuni soggetti possono
risultare particolarmente sensibili per allergie, patologie renali, cardiache, endocrine o stato di gravidanza; a volte, si
può rendere necessario devitalizzare uno o più elementi in relazione al sacrificio biologico di tessuto dentale; alla durata
della terapia, a volte disagevole a causa della permanenza di protesi provvisori e i cui risultati estetici e funzionali
possono non essere pienamente soddisfacenti. Risultati estetici e funzionali ottimali e duraturi sono talvolta difficili da
ottenere, in particolare laddove il paziente non segua scrupolosamente i dettami di una corretta igiene orale, sia
utilizzando le metodiche che il Medico curante indicherà come più opportune, sia sottoponendosi a controlli periodici
tendenti a valutare la capacità di mantenimento igienico e la salute dei tessuti gengivali. Limitatamente alle protesi
rimovibili, si segnala la possibilità di lesioni a carico degli elementi dentari su cui direttamente incidano ganci metallici.
"
          />
        </Paragraph>
        <Paragraph title="Materiali impiegati">
          <ParagraphList text="Resina costituita da PMMA" />
        </Paragraph>
      </Page>
    </Document>
  );
};

export default ConsensoProtesiRimovibile;
