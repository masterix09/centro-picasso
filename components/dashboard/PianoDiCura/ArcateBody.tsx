"use client";
import React, { FC, useState } from "react";
// import styles from "@/style/gestionale/clinica/ClinicaDenti.module.scss";
import styles from "@/style/gestionale/clinica/clinicaDenti.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store/store";
import { EModalType } from "@/enum/types";

// import { useDispatch } from "react-redux";
// import { AppDispatch, useAppSelector } from "@/redux/store";
// import { setModalOpen, setModalType } from "@/redux/features/common-slice";
// import { EModalType } from "@/app/models/enums";
// import { message } from "antd";

type ArcateBodyProp = {
  denteNumber: number;
  setDenteNumber: React.Dispatch<React.SetStateAction<number>>;
};

const ArcateBody = () => {
  //   const dispatch = useDispatch<AppDispatch>();
  //   const pianoDiCura = useAppSelector(
  //     (state) => state.commonReducer.value.pianoCuraSelected
  //   );
  //   const user = useAppSelector((state) => state.userReducer.paziente.id);

  //   const openModal = (number: number) => {
  //     if (pianoDiCura !== "" && user !== "") {
  //       setDenteNumber(number);
  //       dispatch(setModalType(EModalType.DENTI_MODAL));
  //       dispatch(setModalOpen(true));
  //     } else if (user === "") {
  //       message.error("Seleziona prima un paziente!");
  //     } else {
  //       message.error("Seleziona prima un piano di cura!");
  //     }
  //   };

  const [denteNumber, setDenteNumber] = useState<number>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const { setModalOpen, setModalType, setIdDente } = useStore((state) => state);

  const openModal = (dente: number) => {
    // const params = new URLSearchParams(searchParams);
    // params.set("modalOpen", "true");
    // params.set("modalType", EModalType.ADD_PRESTAZIONE_PIANOCURA);
    // params.set("dente", dente as unknown as string);
    // replace(`${pathname}?${params.toString()}`);
    setModalOpen(true);
    setModalType(EModalType.ADD_PRESTAZIONE_PIANOCURA);
    setIdDente(dente as unknown as string);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        id="arcata_superiore"
        className={styles.arcata_superiore}
        onClick={() => openModal(1)}
      ></div>
      <div
        id="arcata_inferiore"
        className={styles.arcata_inferiore}
        onClick={() => openModal(2)}
      ></div>
      <div></div>
    </div>
  );
};

export default ArcateBody;
