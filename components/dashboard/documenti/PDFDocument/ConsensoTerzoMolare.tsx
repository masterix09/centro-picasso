import React, { FC } from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";
import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import ParagraphText from "../common/ParagraphText";
import ParagraphList from "../common/ParagraphList";
import Footer from "../common/Footer";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
});

const ConsensoTerzoMolare: FC<{ cognome: string; nome: string }> = ({
  cognome,
  nome,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="CONSENSO INFORMATO ALL’INTERVENTO CHIRURGICO DI: ESTRAZIONE DI DENTE DEL GIUDIZIO INFERIORE">
          <ParagraphText
            text="Egregio Paziente, con questo modulo si riassumono i concetti relativi al Suo trattamento già espressi a voce nel corso
della visita in modo da formalizzare con chiarezza il Suo assenso all’esecuzione dell’intervento preventivato, come
previsto dal Codice Deontologico ed. 2006."
          />
        </Paragraph>

        <Paragraph title="Diagnosi">
          <ParagraphText text="disodontiasi del terzo molare inferiore destro e/o sinistro." />
        </Paragraph>
        <Paragraph title="Descrizione dell’intervento">
          <ParagraphText text="disodontiasi del terzo molare inferiore destro e/o sinistro." />
        </Paragraph>
        <Paragraph title="Benefici dell’intervento">
          <ParagraphText
            text="l’estrazione del dente del giudizio può essere necessaria per presenza di carie, lesioni
            cistiche, infezioni, per evitare processi infiammatori, per impedire danni di tipo carioso o parodontale al dente adiacente
            (secondo molare)
"
          />
        </Paragraph>

        <ParagraphText
          text={`Io sottoscritto/a ${cognome} ${nome} dichiaro di essere stato informato e di essermi reso conto della portata e del tipo
dell’intervento chirurgico al quale devo essere sottoposto`}
        />
        <ParagraphText text="Dichiaro di essere stato messo a conoscenza, in particolare:" />
        <ParagraphList text="del tipo di intervento chirurgico" />
        <ParagraphList text="dei rischi connessi all’intervento stesso, oltre a quelli correlati all’anestesia;" />
        <ParagraphList text="delle eventuali complicanze;" />
        <ParagraphList text="della possibilità che può rendersi necessario modificare il tipo di intervento chirurgico nel corso del suo svolgimento;" />
        <ParagraphList text="del decorso post-operatorio;" />
        <ParagraphList text="delle terapie alternative." />
        <ParagraphText text="Possibili complicanze:" />
        <ParagraphList
          text="Lesioni nervose al nervo inguinale - innerva i due terzi anteriori della lingua. ( Può residuare alterazione della sensibilità dell’ emilingua (ipoestesia,
anestesia, parestesia, disestesia), diminuzione del gusto e riduzione del
flusso salivare con conseguente sensazione di secchezza della bocca.
 )"
        />
        <ParagraphList
          text="al nervo alveolare inferiore –innerva i denti, il labbro ed il mento. ( Può residuare perdita di vitalità dei denti ed alterazione della sensibilità
del labbro e della cute del mento del lato operato (ipoestesia, anestesia,
parestesia, disestesia)."
        />
        <ParagraphList text="Trisma, o difficoltà nell’apertura o chiusura della bocca" />
        <ParagraphList text="Gonfiore" />
        <ParagraphList text="Dolore" />
        <ParagraphList text="Infezione della ferita" />
        <ParagraphList text="Eccessiva emorragia o sanguinamento" />
        <ParagraphList text="Frattura della mandibola" />
        <ParagraphList text="Perdita di vitalità o danno ai denti adiacenti (frattura di otturazioni o di protesi)" />
        <ParagraphList
          text="Una piccola parte di radice può essere lasciata nella mandibola se la sua rimozione dovesse richiedere un
intervento chirurgico troppo demolitivo o il verificarsi di ulteriori complicanze"
        />
        <ParagraphList text="Lesioni alla cute e alla mucosa dell’angolo della bocca" />
        <ParagraphList text="Reazioni all’anestetico, agli antibiotici e/o antidolorifici." />

        <ParagraphText text="L’incidenza delle complicanze sopra descritte varia da caso a caso, ma sono tutte poco frequenti." />
        <ParagraphText
          text="Io sottoscritto dichiaro di essere stato informato di quanto dal Dott. Antonio Cancelliere di aver avuto il tempo e la possibilità di rivolgere tutte le domande che ritenevo necessario e di aver ricevuto
risposte esaurienti ed in forma comprensibile, di avere pertanto compreso lo scopo e la natura dell’intervento indicato
nel presente modulo e di avere altresì consapevolezza dei rischi e delle complicazioni che ne potrebbero derivare
Acconsento pertanto ad essere sottoposto all’intervento chirurgico prospettato."
        />
        <Footer />
      </Page>
    </Document>
  );
};

export default ConsensoTerzoMolare;
