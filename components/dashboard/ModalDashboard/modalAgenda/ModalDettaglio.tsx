import { getPrestazioneAgendaById } from "@/actions/actions.clinica";
import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ModalDettaglio = async ({
  idPrestazioneAgenda,
}: {
  idPrestazioneAgenda: string;
}) => {
  // const { idPrestazioneAgenda } = useStore((state) => state);
  // const [data, setData] = useState<{
  //   categoria: string | null;
  //   nome: string | null;
  //   ora_arrivo: string | null;
  //   ora_saluta: string | null;
  //   operatore: {
  //     nome: string | null;
  //     id: string;
  //     cognome: string | null;
  //   };
  //   pianoCura: {
  //     cliente: {
  //       cognome: string | null;
  //       nome: string | null;
  //     };
  //   };
  // } | null>({
  //   categoria: "",
  //   nome: "",
  //   operatore: {
  //     cognome: "",
  //     id: "",
  //     nome: "",
  //   },
  //   ora_arrivo: "",
  //   ora_saluta: "",
  //   pianoCura: {
  //     cliente: {
  //       cognome: "",
  //       nome: "",
  //     },
  //   },
  // });

  // useEffect(() => {
  //   if (idPrestazioneAgenda) {
  //     getPrestazioneAgendaById(idPrestazioneAgenda).then((data) =>
  //       setData(data)
  //     );
  //   }
  // }, [idPrestazioneAgenda]);

  const data: {
    categoria: string | null;
    nome: string | null;
    ora_arrivo: string | null;
    ora_saluta: string | null;
    operatore: {
      nome: string | null;
      id: string;
      cognome: string | null;
    };
    pianoCura: {
      cliente: {
        cognome: string | null;
        nome: string | null;
      };
    };
  } | null = await getPrestazioneAgendaById(idPrestazioneAgenda);
  return (
    // <AlertDialogContent>
    //   <AlertDialogHeader>
    //     <AlertDialogTitle>Dettaglio appuntamento</AlertDialogTitle>
    //   </AlertDialogHeader>

    <>
      <p className="font-bold">
        Paziente:{" "}
        <span className="font-normal">
          {data?.pianoCura.cliente.cognome} {data?.pianoCura.cliente.nome}
        </span>
      </p>
      <p className="font-bold">
        Categoria della prestazione da effettuare:{" "}
        <span className="font-normal">{data?.categoria}</span>
      </p>
      <p className="font-bold">
        Prestazione da effettuare:{" "}
        <span className="font-normal">{data?.nome}</span>
      </p>
      <p className="font-bold">
        Operatore assegnato:{" "}
        <span className="font-normal">
          {data?.operatore.cognome} {data?.operatore.nome}
        </span>
      </p>
      <p className="font-bold">
        Orario di arrivo del paziente:{" "}
        <span className="font-normal">{data?.ora_arrivo}</span>
      </p>
      <p className="font-bold">
        Orario di uscita del paziente:{" "}
        <span className="font-normal">{data?.ora_saluta}</span>
      </p>
    </>

    //   <AlertDialogFooter>
    //     <AlertDialogCancel>Cancel</AlertDialogCancel>
    //   </AlertDialogFooter>
    // </AlertDialogContent>
  );
};

export default ModalDettaglio;
