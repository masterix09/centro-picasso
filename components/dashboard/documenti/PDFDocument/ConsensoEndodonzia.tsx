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

const ConsensoEndodonzia: FC<{ nome: string; cognome: string }> = ({
  nome,
  cognome,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="DICHIARAZIONE DI RICEVUTA INFORMAZIONE E CONSENSO AD INTERVENTO DI TERAPIA CONSERVATIVA E/O ENDODONTICA">
          <ParagraphText
            text="Gentile Paziente,
in questo modulo vengono riassunti i concetti a Lei già espressi verbalmente nel corso delle visite
precedenti, precisandoli e definendoli nelle loro linee essenziali, in modo da avere anche per iscritto il Suo
assenso all’esecuzione delle terapie prescritte e concordate.
"
          />
        </Paragraph>
        <Paragraph title="Diagnosi">
          <ParagraphList text="Denti permanenti con lesioni cariose;" />
          <ParagraphList text="Denti permanenti con patologia pulpare giudicata irreversibile;" />
          <ParagraphList text="Denti permanenti con polpa necrotica con o senza tracce evidenti di patologie rarefattive (radiotrasparenti) ossee peri-radicolari;" />
          <ParagraphList text="Denti permanenti caratterizzati da una polpa che potrebbe essere stata compromessa da eventi operativi clinici (es. denti utilizzati come pilastri protesici, denti mal posizionati);" />
          <ParagraphList text="Denti permanenti caratterizzati da una polpa che andrebbe incontro a compromissione in seguito a interventi odontoiatrici successivi;" />
          <ParagraphList text="Denti permanenti avulsi o lussati in seguito a traumi;" />
          <ParagraphList text="Denti permanenti con riassorbimenti interni o esterni;" />
          <ParagraphList text="Denti permanenti incrinati o fratturati, con interessamento della polpa (con o senza sintomi clinici), per i quali è ragionevolmente prevista la conservazione di condizioni di salute parodontale soddisfacenti;" />
          <ParagraphList text="Denti permanenti caratterizzati da ipersensibilità dentinale resistente alle normali procedure di trattamento." />
        </Paragraph>
        <Paragraph title="Descrizione dell'intervento">
          <ParagraphText
            text="Per terapia endodontica si intende l’insieme delle manovre operative di seguito indicate atte alla
rimozione, tramite strumenti rotanti e manuali, del tessuto carioso e del tessuto pulpare (fascio vascolonervoso
dell’elemento dentale):"
          />
          <ParagraphList
            text=" Devitalizzazione: Il trattamento endodontico o terapia canalare, definita meno correttamente nel linguaggio
comune “devitalizzazione” è una procedura con la quale si preserva un dente affetto da patologie della polpa
(“nervo”) e/o dell’apice della radice (“granulomi”) dovute a carie profonda, a lesioni del dente da traumi o altre
cause. Con il trattamento endodontico si rimuove il tessuto pulpare infiammato o infetto contenuto all’interno della
corona del dente e dei canali delle radici e si procede con la successiva ricostruzione del dente interessato."
          />
          <ParagraphList
            text="Otturazione: L'otturazione (o riempimento) dentale è una comune procedura odontoiatrica indicata per restaurare i
denti danneggiati da processi cariogeni, ripristinandone struttura, morfologia ed integrità."
          />
          <ParagraphList
            text="Ritrattamento canalare: Il ritrattamento endodontico non chirurgico rappresenta una procedura per asportare dal
sistema radicolare di un dente il materiale da otturazione precedentemente inserito o per completare un
precedente trattamento canalare non soddisfacente.
"
          />
        </Paragraph>
        <Paragraph title="Benefici dell'intervento">
          <ParagraphText
            text="In generale, i benefici della terapia conservativa ed endodontica sono rappresentati dall’eliminazione della
patologia e della sintomatologia ad essa correlata (eliminazione di infezione, infiammazione e dolore derivanti dalla
patologia dentale) con conseguente conservazione funzionale ed estetica."
          />
        </Paragraph>
        <Paragraph title="Rischi dell'intervento">
          <ParagraphText text="I principali rischi sono relativi:" />
          <ParagraphList text="all'impiego inevitabile di anestetico locale, con vasocostrittore o senza, a cui alcuni soggetti possono risultare particolarmente sensibili per allergie, patologie renali, cardiache, endocrine o stato di gravidanza;" />
          <ParagraphList text="alla possibilità di traumi sulle mucose a causa degli strumenti manuali o meccanici;" />
          <ParagraphList text="alla frattura di piccoli strumenti all’interno della radice del dente;" />
          <ParagraphList text="all’eventualità di ingestione accidentale di detti strumenti;" />
          <ParagraphList text="all’aggravamento della patologia cariosa con possibile pulpite e successivo ascesso periapicale." />
        </Paragraph>
        <Paragraph title="Materiali impiegati">
          <ParagraphText text="Otturazione provvisoria: cemento per otturazione provvisoria a base di ossido di Zn ed eugenolo" />
          <ParagraphText text="Otturazione definitiva: ricostruzione in composito/manufatto protesico (corona) – eventuale provvisorio in resina" />
          <ParagraphText text="Otturazione del canale radicolare: guttaperca (fluida e solida) + cemento all’ossido di zinco ed eugenolo" />
          <ParagraphText text="Perni endocanalari costituiti da: resina epossidica e fibre di vetro" />
        </Paragraph>
        <Paragraph title="Complicanze dell’intervento:">
          <ParagraphText
            text="Una volta effettuata l'otturazione, è possibile la permanenza per tempi più o meno lunghi di sensibilità termica o ad
alcune sostanze; è possibile che ci sia un’accentuazione dei sintomi che rendano necessaria la devitalizzazione
dell'elemento per evitare la diffusione dell'infezione. Una ricostruzione in materiale composito può nel tempo cambiare
tonalità di colore. In caso di terapia canalare è possibile avvertire temporaneamente alcuni sintomi spiacevoli quali, ad
esempio, dolore o sensazione di allungamento del dente. I denti devitalizzati possono risultare più fragili del normale. In
alcuni casi è possibile che sia necessario provvedere alla protesizzazione, alla resezione del suo apice (apicectomia) o
all'estrazione dell'elemento dentario"
          />
        </Paragraph>
        <Paragraph title="Indicazioni post trattamento:">
          <ParagraphText text="Ai fini della buona riuscita dell’intervento, è fondamentale:" />
          <ParagraphList text="alimentarsi con dieta soffice per almeno una settimana" />
          <ParagraphList text="mantenere una buona igiene orale" />
          <ParagraphList text="sottoporsi a controlli periodici nel tempo" />
        </Paragraph>
        <Paragraph title="Alternative all’intervento:">
          <ParagraphText text="Non esistono alternative terapeutiche alla devitalizzazione. Nel caso sia già presente una devitalizzazione e permanesse un granuloma si può eseguire un approccio chirurgico per la rimozione dello stesso." />
        </Paragraph>

        <ParagraphText text={`Io sottoscritto/a ${cognome} ${nome}`} />
        <ParagraphText text="DICHIARO" />
        <ParagraphList
          text="di aver ricevuto in consegna e di aver preso visione della presente dichiarazione, integrativa della
comunicazione verbale, al fine di poterla esaminare e/o farla analizzare anche da persone di mia fiducia;"
        />
        <ParagraphList
          text="di aver letto integralmente e con attenzione la presente dichiarazione e informativa e di aver
          pienamente compreso lo scopo e la natura della terapia conservativa e/o endodontica indicata nel
          presente modulo e di avere, altresì, consapevolezza dei rischi e delle complicanze che ne potrebbero derivare."
        />
        <ParagraphList
          text="di essere ben consapevole che qualunque atto medico può comportare rischi e complicanze non
          sempre prevedibili né prevenibili."
        />
        <ParagraphText
          text="Presto, pertanto, il mio consenso alla terapia che mi è stata descritta e prospettata con il presente
consenso informato"
        />
        <Footer />
      </Page>
    </Document>
  );
};

export default ConsensoEndodonzia;
