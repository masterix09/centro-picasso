"use client";
import React, { FC, useState } from "react";
// import styles from "@/style/gestionale/clinica/ClinicaDenti.module.scss";
import styles from "@/style/gestionale/clinica/clinicaDenti.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EModalType } from "@/enum/types";
import { useStore } from "@/store/store";
// import { useDispatch } from "react-redux";
// import { AppDispatch, useAppSelector } from "@/redux/store";
// import { setModalOpen, setModalType } from "@/redux/features/common-slice";
// import { EModalType } from "@/app/models/enums";
// import { message } from "antd";

type DentiTableProp = {
  denteNumber: number;
  setDenteNumber: React.Dispatch<React.SetStateAction<number>>;
};

const DentiTable = () => {
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
  // const searchParams = useSearchParams();
  // const pathname = usePathname();
  // const { replace } = useRouter();

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
    <table
      id="c_ajax"
      width="100%"
      //   border="0"
      //   cellspacing="0"
      //   cellpadding="0"
      //   style="visibility: visible;"
    >
      <tbody>
        <tr>
          <td valign="top" id="geng_up" className={styles.dentiGengiveTop}>
            <table
              width="50%"
              //   border="0"
              //   align="center"
              //   cellpadding="0"
              //   cellspacing="1"
            >
              <tbody>
                <tr style={{ height: "46px" }}>
                  {" "}
                  <td width="10" className="dent front" rel="18">
                    <div id="livello0">
                      <div
                        id="dente18_sup"
                        className={`${styles.dente18_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(18)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="17">
                    <div id="livello0" className="css_tooltip">
                      <div
                        id="dente17_sup"
                        className={`${styles.dente17_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(17)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="16">
                    <div id="livello0">
                      <div
                        id="dente16_sup"
                        className={`${styles.dente16_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(16)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="15">
                    <div id="livello0">
                      <div
                        id="dente15_sup"
                        className={`${styles.dente15_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(15)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="14">
                    <div id="livello0">
                      <div
                        id="dente14_sup"
                        className={`${styles.dente14_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(14)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="13">
                    <div id="livello0">
                      <div
                        id="dente13_sup"
                        className={`${styles.dente13_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(13)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="12">
                    <div id="livello0">
                      <div
                        id="dente12_sup"
                        className={`${styles.dente11_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(12)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="11">
                    <div id="livello0">
                      <div
                        id="dente11_sup"
                        className={`${styles.dente11_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(11)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="21">
                    <div id="livello0">
                      <div
                        id="dente21_sup"
                        className={`${styles.dente21_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(21)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="22">
                    <div id="livello0">
                      <div
                        id="dente22_sup"
                        className={`${styles.dente22_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(22)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="23">
                    <div id="livello0">
                      <div
                        id="dente23_sup"
                        className={`${styles.dente23_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(23)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="24">
                    <div id="livello0">
                      <div
                        id="dente24_sup"
                        className={`${styles.dente24_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(24)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="25">
                    <div id="livello0">
                      <div
                        id="dente25_sup"
                        className={`${styles.dente25_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(25)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="26">
                    <div id="livello0">
                      <div
                        id="dente26_sup"
                        className={`${styles.dente26_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(26)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="27">
                    <div id="livello0">
                      <div
                        id="dente27_sup"
                        className={`${styles.dente27_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(27)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="28">
                    <div id="livello0">
                      <div
                        id="dente28_sup"
                        className={`${styles.dente28_sup} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(28)}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div id="numero18" className="numeroDente">
                      18{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero17" className="numeroDente">
                      17{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero16" className="numeroDente">
                      16{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero15" className="numeroDente">
                      15{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero14" className="numeroDente">
                      14{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero13" className="numeroDente">
                      13{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero12" className="numeroDente">
                      12{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero11" className="numeroDente">
                      11{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero21" className="numeroDente">
                      21{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero22" className="numeroDente">
                      22{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero23" className="numeroDente">
                      23{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero24" className="numeroDente">
                      24{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero25" className="numeroDente">
                      25{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero26" className="numeroDente">
                      26{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero27" className="numeroDente">
                      27{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero28" className="numeroDente">
                      28{" "}
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "46px" }}>
                  <td width="10" className="dent sect " rel="18">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente18"
                        className={`${styles.dente18} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(18)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect css_tooltip" rel="17">
                    <div id="livello0" className="css_tooltip">
                      {" "}
                      <div
                        id="dente17"
                        className={`${styles.dente17} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(17)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="16">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente16"
                        className={`${styles.dente16} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(16)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="15">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente15"
                        className={`${styles.dente15} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(15)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="14">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente14"
                        className={`${styles.dente14} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(14)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="13">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente13"
                        className={`${styles.dente13} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(13)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="12">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente12"
                        className={`${styles.dente12} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(12)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="11">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente11"
                        className={`${styles.dente11} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(11)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="21">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente21"
                        className={`${styles.dente21} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(21)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="22">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente22"
                        className={`${styles.dente22} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(22)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="23">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente23"
                        className={`${styles.dente23} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(23)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="24">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente24"
                        className={`${styles.dente24} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(24)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="25">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente25"
                        className={`${styles.dente25} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(25)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="26">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente26"
                        className={`${styles.dente26} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(26)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="27">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente27"
                        className={`${styles.dente27} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(27)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect " rel="28">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente28"
                        className={`${styles.dente27} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(28)}
                      ></div>
                    </div>
                  </td>{" "}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td id="geng_low" className={styles.dentiGengiveBottom}>
            <table
              width="50%"
              //   border="0"
              align="center"
              //   cellpadding="0"
              //   cellspacing="1"
            >
              <tbody>
                <tr>
                  <td width="10" className="dent sect" rel="48">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente48"
                        className={`${styles.dente48} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(48)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="47">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente47"
                        className={`${styles.dente47} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(47)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="46">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente46"
                        className={`${styles.dente46} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(46)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="45">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente45"
                        className={`${styles.dente45} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(45)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="44">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente44"
                        className={`${styles.dente44} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(44)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="43">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente43"
                        className={`${styles.dente43} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(43)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="42">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente42"
                        className={`${styles.dente42} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(42)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="41">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente41"
                        className={`${styles.dente41} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(41)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="31">
                    <div id="livello0" className="css_tooltip">
                      {" "}
                      <div
                        id="dente31"
                        className={`${styles.dente31} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(31)}
                      ></div>
                      <span
                        className="tooltip-denti"
                        title="<i className='ttip-indicator fa fa-circle fa-fw kanino-txt-blue'></i> CURETTAGE 1 SETTORE <br/>"
                      ></span>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="32">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente32"
                        className={`${styles.dente32} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(32)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="33">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente33"
                        className={`${styles.dente33} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(33)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="34">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente34"
                        className={`${styles.dente34} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(34)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="35">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente35"
                        className={`${styles.dente35} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(35)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="36">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente36"
                        className={`${styles.dente36} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(36)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="37">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente37"
                        className={`${styles.dente37} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(37)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent sect" rel="38">
                    <div id="livello0">
                      {" "}
                      <div
                        id="dente38"
                        className={`${styles.dente38} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(38)}
                      ></div>
                    </div>
                  </td>{" "}
                </tr>
                <tr>
                  <td>
                    <div id="numero48" className="numeroDente">
                      48{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero47" className="numeroDente">
                      47{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero46" className="numeroDente">
                      46{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero45" className="numeroDente">
                      45{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero44" className="numeroDente">
                      44{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero43" className="numeroDente">
                      43{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero42" className="numeroDente">
                      42{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero41" className="numeroDente">
                      41{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero31" className="numeroDente">
                      31{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero32" className="numeroDente">
                      32{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero33" className="numeroDente">
                      33{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero34" className="numeroDente">
                      34{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero35" className="numeroDente">
                      35{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero36" className="numeroDente">
                      36{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero37" className="numeroDente">
                      37{" "}
                    </div>
                  </td>
                  <td>
                    <div id="numero38" className="numeroDente">
                      38{" "}
                    </div>
                  </td>
                </tr>
                <tr style={{ height: "46px" }}>
                  <td width="10" className="dent front" rel="48">
                    <div id="livello0">
                      <div
                        id="dente48_inf"
                        className={`${styles.dente48_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(48)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="47">
                    <div id="livello0">
                      <div
                        id="dente47_inf"
                        className={`${styles.dente47_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(47)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="46">
                    <div id="livello0">
                      <div
                        id="dente46_inf"
                        className={`${styles.dente46_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(46)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="45">
                    <div id="livello0">
                      <div
                        id="dente45_inf"
                        className={`${styles.dente45_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(45)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="44">
                    <div id="livello0">
                      <div
                        id="dente44_inf"
                        className={`${styles.dente44_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(44)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="43">
                    <div id="livello0">
                      <div
                        id="dente43_inf"
                        className={`${styles.dente43_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(43)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="42">
                    <div id="livello0">
                      <div
                        id="dente42_inf"
                        className={`${styles.dente42_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(42)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="41">
                    <div id="livello0">
                      <div
                        id="dente41_inf"
                        className={`${styles.dente41_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(41)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="31">
                    <div id="livello0" className="css_tooltip">
                      <div
                        id="dente31_inf"
                        className={`${styles.dente31_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(31)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="32">
                    <div id="livello0">
                      <div
                        id="dente32_inf"
                        className={`${styles.dente32_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(32)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="33">
                    <div id="livello0">
                      <div
                        id="dente33_inf"
                        className={`${styles.dente33_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(33)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="34">
                    <div id="livello0">
                      <div
                        id="dente34_inf"
                        className={`${styles.dente34_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(34)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="35">
                    <div id="livello0">
                      <div
                        id="dente35_inf"
                        className={`${styles.dente35_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(35)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="36">
                    <div id="livello0">
                      <div
                        id="dente36_inf"
                        className={`${styles.dente36_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(36)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="37">
                    <div id="livello0">
                      <div
                        id="dente37_inf"
                        className={`${styles.dente37_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(37)}
                      ></div>
                    </div>
                  </td>
                  <td width="10" className="dent front" rel="38">
                    <div id="livello0">
                      <div
                        id="dente38_inf"
                        className={`${styles.dente38_inf} ${styles.schemaDentiSprite}`}
                        onClick={() => openModal(38)}
                      ></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan={16}>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default DentiTable;
