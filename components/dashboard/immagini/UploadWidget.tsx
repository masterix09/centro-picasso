"use client";
import { createImage } from "@/actions/actions.clinica";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/store/store";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const UploadWidget = () => {
  let url: string = "";

  const { toast } = useToast();

  const { idPiano } = useStore();

  console.log(idPiano);

  return (
    <CldUploadWidget
      uploadPreset="b59i7h4w"
      // onSuccess={async (results) => {
      //   console.log(results);
      //   //@ts-ignore
      //   // setUrl([...url, results.info.url]);
      //   // url = [...url, results.info.url];
      //   url = results.info.url;
      //   // url = results.info.url;
      //   console.log(url);

      //   console.log(idPiano);

      //   if (idPiano !== null && idPiano !== undefined) {
      //     const res = await createImage(url, idPiano);

      //     if (res === "ok") {
      //       toast({
      //         title: "Immagine caricata.",
      //         description: "Immagine caricata correttamente.",
      //       });
      //     } else {
      //       toast({
      //         variant: "destructive",
      //         title: "Uh Oh! Errore nell upload.",
      //         description:
      //           "L'immagine non e' stata caricata correttamente. Riprova",
      //       });
      //     }
      //   }
      // }}
      onUpload={async (results) => {
        console.log(results);
        //@ts-ignore
        // setUrl([...url, results.info.url]);
        // url = [...url, results.info.url];
        url = results.info.url;
        // url = results.info.url;
        console.log(url);

        console.log(idPiano);

        if (idPiano !== null && idPiano !== undefined) {
          const res = await createImage(url, idPiano);

          if (res === "ok") {
            toast({
              title: "Immagine caricata.",
              description: "Immagine caricata correttamente.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Uh Oh! Errore nell upload.",
              description:
                "L'immagine non e' stata caricata correttamente. Riprova",
            });
          }
        }
      }}
    >
      {({ open }) => {
        return <Button onClick={() => open()}>Carica immagine</Button>;
      }}
    </CldUploadWidget>
  );
};

export default UploadWidget;
