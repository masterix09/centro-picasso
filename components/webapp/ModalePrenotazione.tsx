import React from "react";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "../ui/alert-dialog";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";

const ModalePrenotazione = ({
  success,
  handleCloseModal,
}: {
  success: boolean;
  handleCloseModal: () => void;
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>
          {success ? (
            <h3 className="text-2xl text-green-400 uppercase font-bold">
              Successo!
            </h3>
          ) : (
            <h3 className="text-2xl text-red-400 uppercase font-bold">
              Errore!
            </h3>
          )}
        </AlertDialogTitle>
      </AlertDialogHeader>
      {success ? (
        <p className="text-black text-xl">
          Richiesta di prenotazione avvenuta con successo. Attendi che un nostro
          operatore ti richiami
        </p>
      ) : (
        <p className="text-black text-xl">
          Errore nella richiesta di prenotazione. Riprova oppure chiama al
          numero che trovi in fondo alla pagina
        </p>
      )}
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>
          Annulla
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleCloseModal}>OK</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ModalePrenotazione;
