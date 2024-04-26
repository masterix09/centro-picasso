import { getPrestazioneAgendaById } from "@/actions/actions.clinica";

const ModalDettaglio = ({
  // categoria,
  nomePrestazione,
  operatoreCognome,
  operatoreNome,
  oraArrivo,
  oraUscita,
  nomeCognomePaziente,
}: {
  nomeCognomePaziente: string;
  // categoria: string;
  nomePrestazione: string;
  operatoreNome: string;
  operatoreCognome: string;
  oraArrivo: string;
  oraUscita: string;
}) => {
  return (
    <div className="w-full">
      <p className="font-bold">
        Paziente: <span className="font-normal">{nomeCognomePaziente}</span>
      </p>
      {/* <p className="font-bold">
        Categoria della prestazione da effettuare:{" "}
        <span className="font-normal">{categoria}</span>
      </p> */}
      <p className="font-bold">
        Prestazione da effettuare:{" "}
        <span className="font-normal">{nomePrestazione}</span>
      </p>
      <p className="font-bold">
        Operatore assegnato:{" "}
        <span className="font-normal">
          {operatoreCognome} {operatoreNome}
        </span>
      </p>
      <p className="font-bold">
        Orario di arrivo del paziente:{" "}
        <span className="font-normal">{oraArrivo}</span>
      </p>
      <p className="font-bold">
        Orario di uscita del paziente:{" "}
        <span className="font-normal">{oraUscita}</span>
      </p>
    </div>
  );
};

export default ModalDettaglio;
