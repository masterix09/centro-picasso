"use client";
import { getLastVisit } from "@/actions/actions.clinica";
import React, { useEffect, useState } from "react";

const UltimaVisita = ({ pianoCura }: { pianoCura: string }) => {
  const [data, setData] = useState<string>("");

  useEffect(() => {
    if (pianoCura) {
      getLastVisit(pianoCura ?? "").then((data) => setData(data ?? ""));
    }
  }, [pianoCura]);

  return <div className="mt-3">{data}</div>;
};

export default UltimaVisita;
