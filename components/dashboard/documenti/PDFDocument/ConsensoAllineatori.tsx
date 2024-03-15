import React from "react";
import { StyleSheet, Document, Page } from "@react-pdf/renderer";
import Header from "../common/Header";
import Paragraph from "../common/Paragraph";
import ParagraphText from "../common/ParagraphText";
import Footer from "../common/Footer";
import ParagraphList from "../common/ParagraphList";

const styles = StyleSheet.create({
  page: {
    padding: 15,
  },
});

const ConsensoAllineatori = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Header />
        <Paragraph title="CONSENSO INFORMATO AL TRATTAMENTO ORTODONTICO CON ALLINEATORI">
          <ParagraphText
            text="Il trattamento ortodontico con allineatori è una terapia specialistica la cui realizzazione unisce competenze professionali
e continuata collaborazione del paziente per il raggiungimento del risultato."
          />
          <ParagraphText
            text="Nell’ambito delle possibilità terapeutiche esiste, come alternativa, la terapia con allineatori. Questa è una tecnica basata
su una programmazione virtuale dei movimenti ortodontici progressivi tramite un software dedicato. Questo sistema
genera una sequenza del movimento dentario in tempi prestabiliti finalizzato al raggiungimento del risultato attraverso
mascherine trasparenti che includano l’intera arcata dentaria. L’importanza della collaborazione del paziente è relativa
al fondamentale tempo di utilizzo dell’allineatore per almeno 22 ore al giorno. Solo in tal modo si otterranno i risultati
programmati, che perciò hanno nella collaborazione del paziente un’importanza fondamentale. Attualmente questa
terapia ha una validità consolidata per i movimenti esclusivamente dentari.
"
          />
          <ParagraphText
            text="Il paziente, fornendo gli esami radiografici preliminari richiesti ed accettando l’acquisizione della documentazione
            iniziale necessaria (foto, impronte/scansioni etc.), avrà modo di verificare virtualmente il suo stato clinico di partenza, la
            progressione dei movimenti dentari ed infine una simulazione dei risultati auspicabili."
          />
          <ParagraphText
            text="Pertanto, nell’accettazione e nella realizzazione del piano di trattamento, il paziente, avendo pienamente compreso le
finalità del trattamento ed il suo ruolo, presta il suo consenso alla assoluta collaborazione sia in termini di durata
quotidiana della terapia (almeno 22 ore) che della cadenza degli appuntamenti prefissati dallo specialista rispetto alle
necessità emerse dallo studio preliminar"
          />
          <ParagraphText
            text="In ogni caso il paziente deve essere informato che un trattamento ortodontico, come qualsiasi atto medico, ha alcuni
            rischi e fattori limitanti intrinseci. Molti dei problemi o condizioni di seguito menzionate si possono verificare
            occasionalmente o raramente e pertanto se ne richiede il consenso:"
          />
          <ParagraphList
            text="Dolenzia ai denti: può presentarsi all’inizio del trattamento e può ripresentarsi dopo ogni avanzamento di terapia
con cambio di mascherina. La risoluzione dei fastidi può essere spontanea o indotta da una terapia
antiinfiammatoria e/o antidolorifica non cortisonica.
"
          />
          <ParagraphList
            text="Ipersalivazione o iposalivazione: questo fenomeno soggettivo e transitorio può avvenire nei primi giorni
            dell’utilizzo della mascherina, ma solitamente si risolve con l’abitudine alla stessa in tempi ridotti"
          />
          <ParagraphList
            text="Pigmentazioni o lesioni dello smalto dentario: gli allineatori, in quanto rimovibili, consentono la corretta
            igiene del cavo orale. Qualora non si provveda alla detersione degli elementi dentari in maniera corretta e
            quotidiana si potrebbe verificare un conseguente accumulo di placca batterica ed un aumento della possibilità di
            formazione di lesioni cariose legata al biofilm batterico indipendentemente dalla presenza degli allineatori. Inoltre è
            sconsigliata durante il periodo di trattamento l’assunzione di sostanze acide (bevande gasate con coloranti,
            agrumi, succhi di frutta) senza prima rimuovere le mascherine; infatti, l’accumulo di tali sostanze acide all’interno
            delle mascherine potrebbe influire sulle lesioni dello smalto."
          />
          <ParagraphList
            text="Infiammazione delle gengive: un’igiene orale inadeguata può causare infiammazione dei tessuti gengivali con
            gonfiore, arrossamento e sanguinamento delle gengive. Pertanto, ai controlli clinici, possono essere necessarie
            sedute di igiene orale professionale con adeguata motivazione. Tale infiammazione non è dipendente dall’utilizzo
            degli allineatori."
          />
          <ParagraphList
            text="Disordini Temporomandibolari: premesso che la terapia con allineatori non risulta indicata in caso di dolore
            all’ATM e/o dei muscoli masticatori, non c’è ad oggi evidenza scientifica di controindicazioni al trattamento nei casi
            di lievi rumori articolari riscontrati in sede diagnostica né che tale terapia comporti un aumentato rischio di
            sviluppo di disturbi temporomandibolari."
          />
          <ParagraphList
            text="Riassorbimento delle radici: attualmente non emergono dalla letteratura scientifica internazionale fenomeni di
            riassorbimento radicolare durante la terapia con allineatori. Tale patologia, eliminando le cause traumatiche e
            farmacologiche, può però avere una causa genetica o congenita non accertabile preventivamente. Pertanto, il
            paziente presta il suo consenso ad un controllo radiografico annuale atto a verificare anche questa remota
            possibilità"
          />
          <ParagraphList
            text="Insorgenza di afte, ulcere o altre lesioni ai tessuti molli: gli allineatori nelle prime fasi della terapia, per una
            problematica meccanica, possono provocare piccole lesioni sui tessuti gengivali e sui tessuti molli del cavo orale. In
            tal caso si consiglia di recarsi subito dallo specialista che con una riduzione degli spessori e dell’altezza dei margini della mascherina eliminerà rapidamente l’inconveniente.
            "
          />
          <ParagraphList
            text="Reazioni allergiche e tossicità: non ci sono evidenze scientifiche che i materiali di cui sono composte le
            mascherine possano provocare reazioni allergiche o che abbiano un grado di tossicità clinicamente rilevante."
          />
          <ParagraphList
            text="Attachments: sono degli spessori di composito che devono essere applicati su alcuni denti che devono compiere
            movimenti complessi. Può verificarsi durante il trattamento il distacco di uno di questi, specialmente se collocato
            su denti con terapia restaurativa (ricostruzioni, protesi). In tal caso il paziente deve recarsi in tempi rapidi dal
            professionista per provvedere al ripristino dell’adesione.
            "
          />
          <ParagraphList
            text="Stabilizzazione del risultato e recidiva: a fine trattamento i denti necessitano di essere stabilizzati mediante
            apparecchi di contenzione che possono essere fissi o mobili a seconda della terapia effettuata rispetto alla
            malocclusione iniziale. L’assenza di una corretta contenzione potrebbe generare movimenti degli elementi dentari
            in differenti posizioni spaziali fino alla recidiva della malocclusione iniziale. Qualora il trattamento venga effettuato
            in pazienti ancora in crescita, per le modifiche ossee e dentarie possibili e non prevedibili nel tempo, risulta
            fondamentale ed è inteso nella continuità terapeutica il controllo clinico almeno trimestrale onde potere
            rapidamente apportare le necessarie modifiche. L’assenza del paziente ad un massimo di due controlli verrà intesa
            come interruzione volontaria del trattamento e comunicata per iscritto al paziente.
            "
          />
          <ParagraphList
            text="Il paziente, edotto di quanto sopra, che non si presenti né ai cambi delle mascherine per la progressione della terapia né
            ai controlli clinici successivi genererà con il suo comportamento il mancato raggiungimento del risultato parziale. Tutto
            ciò autorizza il professionista ad inviare una raccomandata con ricevuta di ritorno di invito presso lo studio odontoiatrico
            entro e non oltre i 15 giorni dall’avvenuta assenza onde non incorrere nella stasi della progressione terapeutica.
            Qualora il paziente non dia alcuna risposta il professionista comunicherà l’interruzione volontaria di trattamento per
            iscritto al paziente stesso non ritenendosi responsabile di recidive o di mancato conseguimento degli obiettivi
            terapeutici.
            "
          />
          <ParagraphList
            text="Il medico mi ha ampliamente illustrato sulla base della documentazione raccolta le peculiarità del mio caso clinico e
            con una simulazione digitale mi ha fatto comprendere quali possono essere le finalità terapeutiche e i possibili risultati
            ottenibili. Pertanto avendo compreso rischi e benefici del trattamento, presto il mio consenso.
            "
          />
        </Paragraph>
        <Footer />
      </Page>
    </Document>
  );
};

export default ConsensoAllineatori;
