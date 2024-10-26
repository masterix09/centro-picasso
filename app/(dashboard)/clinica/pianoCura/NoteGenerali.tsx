"use client";

import {
  getNoteByIdPiano,
  updateNoteByIdPiano,
} from "@/actions/actions.clinica";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const NoteGenerali = () => {
  const searchParams = useSearchParams();

  const [data, setData] = useState<string>("");

  useEffect(() => {
    if (searchParams.get("idPiano")) {
      getNoteByIdPiano(searchParams.get("idPiano") ?? "").then((data) =>
        setData(data?.note ?? "")
      );
    }
  }, [searchParams]);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setData(e.target.value);
  };
  return (
    <>
      <h4 className="font-bold text-lg lg:text-2xl mt-5">Note Generali</h4>
      <form action={updateNoteByIdPiano} className="mt-2">
        <Textarea
          rows={4}
          name="note"
          onChange={(e) => onChangeInput(e)}
          placeholder="Note.."
          value={data ?? ""}
        />
        <input
          type="hidden"
          name="idPiano"
          value={searchParams.get("idPiano") ?? ""}
        />
        <Button type="submit" className="mt-3">
          Salva Note
        </Button>
      </form>
    </>
  );
};

export default NoteGenerali;
