"use client";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React, { useEffect, useMemo, useState } from "react";

import { EDOcumenti, EFetchLabel, SmartTAGPropsDocument } from "@/enum/types";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TrattamentoDatiPersonali from "../../documenti/PDFDocument/TrattamentoDatiPersonali";
import ConsensoChirurgia from "../../documenti/PDFDocument/ConsensoChirurgia";
import IstruzioniPostChirurgia from "../../documenti/PDFDocument/IstruzioniPostChirurgia";
import ConsensoTerzoMolare from "../../documenti/PDFDocument/ConsensoTerzoMolare";
import ConsensoEndodonzia from "../../documenti/PDFDocument/ConsensoEndodonzia";
import ConsensoCBCT from "../../documenti/PDFDocument/ConsensoCBCT";
import ConsensoAllineatori from "../../documenti/PDFDocument/ConsensoAllineatori";
import { createDocumento } from "@/actions/actions.clinica";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useStore } from "@/store/store";
import { useToast } from "@/components/ui/use-toast";

const CreateDocumento = ({
  handleCloseModal,
}: {
  handleCloseModal: () => void;
}) => {
  //   const searchParams = useSearchParams();
  //   const idPiano = searchParams.get("idPiano");
  //   const idCliente = searchParams.get("idCliente");

  const { idPiano, idCliente, setFetchLabel } = useStore((state) => state);
  const { toast } = useToast();

  const [modelSelected, setModelSelected] = useState(
    EDOcumenti["Trattamento dati personali"]
  );
  const [description, setDescription] = useState<SmartTAGPropsDocument>({
    Benefici: "",
    Diagnosi: "",
    Rischi: "",
  });

  const [user, setUser] = useState<{
    id: string;
    nome: string;
    cognome: string;
    codice_fiscale: string;
  }>({
    codice_fiscale: "",
    cognome: "",
    id: "",
    nome: "",
  });

  useEffect(() => {
    if (idCliente) {
      fetch(`/api/getInfoPaziente/${idCliente}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => setUser(data));
    }
  }, [idCliente]);

  const document = useMemo(() => {
    if (modelSelected === EDOcumenti["Trattamento dati personali"])
      return (
        <TrattamentoDatiPersonali
          nome={user.nome}
          cf={user.codice_fiscale}
          cognome={user.cognome}
        />
      );

    if (modelSelected === EDOcumenti["Consenso chirurgia"])
      return (
        <ConsensoChirurgia
          description={description}
          cognome={user.cognome}
          nome={user.nome}
        />
      );

    if (modelSelected === EDOcumenti["Istruzioni post chirurgia"])
      return (
        <IstruzioniPostChirurgia cognome={user.cognome} nome={user.nome} />
      );

    if (modelSelected === EDOcumenti["Consenso terzo molare"])
      return <ConsensoTerzoMolare cognome={user.cognome} nome={user.nome} />;

    if (modelSelected === EDOcumenti["Consenso endodenzia"])
      return <ConsensoEndodonzia cognome={user.cognome} nome={user.nome} />;

    if (modelSelected === EDOcumenti["Consesno CBCT"])
      return <ConsensoCBCT cognome={user.cognome} nome={user.nome} />;

    if (modelSelected === EDOcumenti["Consenso allineatori"])
      return <ConsensoAllineatori />;

    return (
      <TrattamentoDatiPersonali
        cognome={user.cognome}
        nome={user.nome}
        cf={user.codice_fiscale}
      />
    );
  }, [
    description,
    modelSelected,
    user.codice_fiscale,
    user.cognome,
    user.nome,
  ]);
  const result = (Object.keys(EDOcumenti) as (keyof typeof EDOcumenti)[]).map(
    (key) => {
      return EDOcumenti[key];
    }
  );
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Crea un nuovo documento</AlertDialogTitle>
      </AlertDialogHeader>
      <div className="w-full">
        <Select
          onValueChange={(value) => setModelSelected(value as EDOcumenti)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleziona un modello" />
          </SelectTrigger>
          <SelectContent>
            {result.map((item) => {
              return (
                <SelectItem value={item} key={item}>
                  {item}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {(modelSelected === EDOcumenti["Consenso chirurgia"] ||
          modelSelected === EDOcumenti["Consenso protesi fissa"]) && (
          <div className="flex flex-col gap-y-4 my-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Diagnosi</Label>
              <Textarea
                placeholder="Inserisci diagnosi..."
                onChange={(e) =>
                  setDescription({
                    Diagnosi: e.target.value,
                    Benefici: description.Benefici,
                    Rischi: description.Rischi,
                  })
                }
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Benefici</Label>
              <Textarea
                placeholder="Inserisci benefici..."
                onChange={(e) =>
                  setDescription({
                    Diagnosi: description.Diagnosi,
                    Benefici: e.target.value,
                    Rischi: description.Rischi,
                  })
                }
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Rischi</Label>
              <Textarea
                placeholder="Inserisci rischi..."
                onChange={(e) =>
                  setDescription({
                    Diagnosi: description.Diagnosi,
                    Benefici: description.Benefici,
                    Rischi: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        {modelSelected && idCliente && idPiano && (
          <PDFDownloadLink
            document={document}
            fileName={`${user.nome}_${user.cognome}_${modelSelected}`}
            onClick={async () => {
              if (idPiano) {
                try {
                  const result = await createDocumento(idPiano, modelSelected);
                  if (result === "ok") {
                    toast({
                      title: "Creazione documento con successo.",
                      description: "Creazione documento avvenuta con successo",
                    });
                    setFetchLabel(EFetchLabel.LISTA_DOCUMENTI);
                  } else throw new Error();
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "Uh oh! Qualcosa e' andato storto.",
                    description:
                      "Creazione documento non andato a buon fine. Chiudi la modale e riprova",
                  });
                }
              }
            }}
            className="bg-blue-300 rounded shadow-lg w-full px-6"
          >
            Download
          </PDFDownloadLink>
        )}
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default CreateDocumento;
