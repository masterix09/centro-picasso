"use client";
import { createImage } from "@/actions/actions.clinica";
import { Button } from "@/components/ui/button";
import { CldUploadWidget } from "next-cloudinary";
import React from "react";

const UploadWidget = ({ idPiano }: { idPiano: string }) => {
  let url: string[] = [];

  return (
    <CldUploadWidget
      uploadPreset="b59i7h4w"
      onSuccess={async (results) => {
        console.log(results);
        //@ts-ignore
        // setUrl([...url, results.info.url]);
        url = [...url, results.info.url];
        // url = results.info.url;
        console.log(url);

        console.log(idPiano);

        if (idPiano !== null && idPiano !== undefined) {
          await createImage(url, idPiano);
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
