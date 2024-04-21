"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { EModalType } from "@/enum/types";
import ModalCreatePianoCura from "../ModalDashboard/ModalCreatePianoCura";
import ModalCreatePaziente from "../ModalDashboard/ModalCreatePaziente";
import ModalAddPrestazionePianoCura from "../ModalDashboard/ModalAddPrestazionePianoCura";
import ModalCreatePrestazione from "../ModalDashboard/ModalCreatePrestazione";
import ModalCreateOperatore from "../ModalDashboard/ModalCreateOperatore";
import ModalCreateSede from "../ModalDashboard/ModalCreateSede";
import ModalCreatePagamento from "../ModalDashboard/ModalCreatePagamento";
import CreateDocumento from "../ModalDashboard/createDocumento/CreateDocumento";
import ModalDettaglio from "../ModalDashboard/modalAgenda/ModalDettaglio";
import ModalArrivo from "../ModalDashboard/modalAgenda/ModalArrivo";
import ModalUscita from "../ModalDashboard/modalAgenda/ModalUscita";
import ModalDeletePrestazionePianoCura from "../ModalDashboard/pianoCuraPrestazione/ModalDeletePrestazionePianoCura";
import ModalDataAppuntamento from "../ModalDashboard/pianoCuraPrestazione/ModalDataAppuntamento";
import ModalImpostaOrario from "../ModalDashboard/pianoCuraPrestazione/ModalImpostaOrario";
import ModalDeletePrestazione from "../ModalDashboard/prestazioni/ModalDeletePrestazione";
import ModalDeleteSede from "../ModalDashboard/sede/ModalDeleteSede";
import ModalEliminaOperatore from "../ModalDashboard/operatore/ModalEliminaOperatore";
import ModalDeleteDocumento from "../ModalDashboard/documento/ModalDeleteDocumento";
import { useStore } from "@/store/store";
import ModalModificaSede from "../ModalDashboard/sede/ModalModificaSede";
import ModalModificaOperatore from "../ModalDashboard/operatore/ModalModificaOperatore";
import ModalModificaPrestazione from "../ModalDashboard/prestazioni/ModalModificaPrestazione";
import ModalePrenotazione from "@/components/webapp/ModalePrenotazione";

const Modal = () => {
  const {
    modalOpen,
    modalType,
    setModalOpen,
    setModalType,
    idCliente,
    idPiano,
    successPrenotazione,
  } = useStore((state) => state);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <AlertDialog open={(modalOpen as unknown as boolean) ?? false}>
      {modalType === EModalType.ADD_PRESTAZIONE_PIANOCURA && (
        <ModalAddPrestazionePianoCura handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.CREATE_PRESTAZIONE && (
        <ModalCreatePrestazione handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.CREATE_OPERATORE && (
        <ModalCreateOperatore handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.CREATE_SEDE && (
        <ModalCreateSede handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.CREATE_PIANO_CURA && (
        <ModalCreatePianoCura
          idCliente={idCliente}
          handleCloseModal={handleCloseModal}
        />
      )}
      {modalType === EModalType.CREATE_PAZIENTE && (
        <ModalCreatePaziente handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.CREATE_DOCUMENTO && (
        <CreateDocumento handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.CREATE_PAGAMENTO && (
        <ModalCreatePagamento
          handleCloseModal={handleCloseModal}
          idPiano={idPiano}
        />
      )}
      {modalType === EModalType.DETTAGLIO_EVENTO && (
        <ModalDettaglio handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.ORA_ARRIVO && (
        <ModalArrivo handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.ORA_USCITA && (
        <ModalUscita handleCloseModal={handleCloseModal} />
      )}
      {/* {modalType === EModalType.ELIMINA_PRESTAZIONE_PIANOCURA && (
        <ModalDeletePrestazionePianoCura handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.IMPOSTA_DATA_APPUNTAMENTO && (
        <ModalDataAppuntamento handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.IMPOSTA_ORARIO_APPUNTAMENTO && (
        <ModalImpostaOrario handleCloseModal={handleCloseModal} />
      )} */}
      {modalType === EModalType.ELIMINA_OPERATORE && (
        <ModalEliminaOperatore handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.ELIMINA_PRESTAZIONE && (
        <ModalDeletePrestazione handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.ELIMINA_SEDE && (
        <ModalDeleteSede handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.ELIMINA_DOCUMENTO && (
        <ModalDeleteDocumento handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.MODIFICA_SEDE && (
        <ModalModificaSede handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.MODIFICA_OPERATORE && (
        <ModalModificaOperatore handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.MODIFICA_PRESTAZIONE && (
        <ModalModificaPrestazione handleCloseModal={handleCloseModal} />
      )}
      {modalType === EModalType.PRENOTAZIONE_SITO && (
        <ModalePrenotazione
          success={successPrenotazione}
          handleCloseModal={handleCloseModal}
        />
      )}
    </AlertDialog>
  );
};

export default Modal;
