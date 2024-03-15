"use client";
import { createImage } from "@/actions/actions.clinica";
import { CldUploadWidget } from "next-cloudinary";
import React, { SetStateAction } from "react";

const Uploader = ({ idPiano }: { idPiano: string }) => {
  //   let url: string[] = [];
  let url: string = "";
  console.log(idPiano);

  return (
    <CldUploadWidget
      uploadPreset="b59i7h4w"
      onSuccess={async (results) => {
        console.log(results);
        //@ts-ignore
        // setUrl([...url, results.info.url]);
        // url = [...url, results.info.url];
        url = results.info.url;
        console.log(url);

        // await createImage(url, idPiano);
      }}
    >
      {({ open }) => {
        return <button onClick={() => open()}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
};

export default Uploader;
