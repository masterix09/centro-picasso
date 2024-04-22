"use client";
import SwitchAnamnesi from "@/components/dashboard/anamnesi/SwitchAnamnesi";
import styles from "@/style/anamnesi/Anamnesi.module.scss";
import Image from "next/image";
import CuffieDoctorSVG from "@/public/gestionale/clinica/icon-anamnesi-1.svg";
import { IAnamnesi } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { getAnamnesiById, updateAnamnesi } from "@/actions/actions.clinica";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaTeethSolid } from "react-icons/lia";
import { SlNote } from "react-icons/sl";
import { Textarea } from "@/components/ui/textarea";
import { BsInfoSquareFill } from "react-icons/bs";

export const dynamic = "force-dynamic";
export default function Page() {
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  if (status === "unauthenticated") redirect("/login");
  const [data, setData] = useState<IAnamnesi | null>({
    AffezioniCardiache: false,
    AlterazionePressioneSanguigna: false,
    AffezioniRenali: false,
    Affezionireumatiche: false,
    PatologieSangue: false,
    PatologieApparatoDigerente: false,
    PatologieSistemaNervoso: false,
    MalattiePsichiche: false,
    AssumeFarmaci: false,
    PatologieOculari: false,
    PatologieGenitoUrinarie: false,
    Emorragie: false,
    HaSoffertoSoffreMalattieInfettive: false,
    Diabete: false,
    Ulcere: false,
    AsmaOAltro: false,
    IpersensibilitaVersoFarmaci: false,
    Altro: false,
    RicoveriOMalattie: false,
    Fumatore: false,
    Bruxista: false,
    Copnseguenze: false,
    GiaSubitoAnestesia: false,
    Profilassi: false,
    TerapiaAnticoagulanti: false,
    Ematomi: false,
    EsamiOTerapia: false,
    FacilmenteInfezioni: false,
    Gravidanza: false,
    nomeMedico: "",
    numeroMedico: "",
    nomeDentista: "",
    numeroDentista: "",
    note: "",
  });

  // const { idCliente } = useStore((state) => state);

  useEffect(() => {
    if (searchParams.get("idCliente")) {
      getAnamnesiById(searchParams.get("idCliente") ?? "").then((data) =>
        setData(data)
      );
    }
  }, [searchParams]);

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    prop: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    setData((prevState) => ({
      ...prevState!,
      [prop]: e.target.value!,
    }));
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Image
            alt="anamnesi image"
            width={80}
            height={80}
            src={CuffieDoctorSVG}
          />
          <p className={styles.sectionTitle}>Il paziente soffre di...</p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodySx}>
            <SwitchAnamnesi
              label="Affezioni cardiache"
              setData={setData}
              data={data!}
              prop="AffezioniCardiache"
              value={data!.AffezioniCardiache ?? false}
            />
            <SwitchAnamnesi
              label="Alterazione della pressione sanguigna"
              setData={setData}
              data={data!}
              prop="AlterazionePressioneSanguigna"
              value={data!.AlterazionePressioneSanguigna ?? false}
            />
            <SwitchAnamnesi
              label="Affezioni renali"
              setData={setData}
              data={data!}
              prop="AffezioniRenali"
              value={data!.AffezioniRenali ?? false}
            />
            <SwitchAnamnesi
              label="Affezioni reumatiche"
              setData={setData}
              data={data!}
              prop="Affezionireumatiche"
              value={data!.Affezionireumatiche ?? false}
            />
            <SwitchAnamnesi
              label="Patologie del sangue"
              setData={setData}
              data={data!}
              prop="PatologieSangue"
              value={data!.PatologieSangue ?? false}
            />
            <SwitchAnamnesi
              label="Patologie dell'apparato digerente"
              setData={setData}
              data={data!}
              prop="PatologieApparatoDigerente"
              value={data!.PatologieApparatoDigerente ?? false}
            />
            <SwitchAnamnesi
              label="Patologie del sistema nervoso"
              setData={setData}
              data={data!}
              prop="PatologieSistemaNervoso"
              value={data!.PatologieSistemaNervoso ?? false}
            />
            <SwitchAnamnesi
              label="Malattie psichiche"
              setData={setData}
              data={data!}
              prop="MalattiePsichiche"
              value={data!.MalattiePsichiche ?? false}
            />
            <SwitchAnamnesi
              label="Assume farmaci"
              setData={setData}
              data={data!}
              prop="AssumeFarmaci"
              value={data!.AssumeFarmaci ?? false}
            />
          </div>
          <div className={styles.bodyDx}>
            <SwitchAnamnesi
              label="Patologie oculari"
              setData={setData}
              data={data!}
              prop="PatologieOculari"
              value={data!.PatologieOculari ?? false}
            />
            <SwitchAnamnesi
              label="Patologie genito-urinarie"
              setData={setData}
              data={data!}
              prop="PatologieGenitoUrinarie"
              value={data!.PatologieGenitoUrinarie ?? false}
            />
            <SwitchAnamnesi
              label="Emorragie"
              setData={setData}
              data={data!}
              prop="Emorragie"
              value={data!.Emorragie ?? false}
            />
            <SwitchAnamnesi
              label="Ha sofferto o soffre di malattie infettive"
              setData={setData}
              data={data!}
              prop="HaSoffertoSoffreMalattieInfettive"
              value={data!.HaSoffertoSoffreMalattieInfettive ?? false}
            />
            <SwitchAnamnesi
              label="Diabete"
              setData={setData}
              data={data!}
              prop="Diabete"
              value={data!.Diabete ?? false}
            />
            <SwitchAnamnesi
              label="Ulcere gastriche o duodenali"
              setData={setData}
              data={data!}
              prop="Ulcere"
              value={data!.Ulcere ?? false}
            />
            <SwitchAnamnesi
              label="Asma o altre allergie"
              setData={setData}
              data={data!}
              prop="AsmaOAltro"
              value={data!.AsmaOAltro ?? false}
            />
            <SwitchAnamnesi
              label="Ipersensibilità verso alcuni farmaci"
              setData={setData}
              data={data!}
              prop="IpersensibilitaVersoFarmaci"
              value={data!.IpersensibilitaVersoFarmaci ?? false}
            />
            <SwitchAnamnesi
              label="Altro"
              setData={setData}
              data={data!}
              prop="Altro"
              value={data!.Altro ?? false}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <BsInfoSquareFill
            color="b8b8b8"
            style={{ width: "70px", height: "70px" }}
          />
          <p className={styles.sectionTitle}>Altre informazioni</p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodySx}>
            <SwitchAnamnesi
              label="Ricoveri o malattie"
              setData={setData}
              data={data!}
              prop="RicoveriOMalattie"
              value={data!.RicoveriOMalattie ?? false}
            />
            <SwitchAnamnesi
              label="Fumatore"
              setData={setData}
              data={data!}
              prop="Fumatore"
              value={data!.Fumatore ?? false}
            />
            <SwitchAnamnesi
              label="Bruxista"
              setData={setData}
              data={data!}
              prop="Bruxista"
              value={data!.Bruxista ?? false}
            />
            <SwitchAnamnesi
              label="Conseguenze assunzione anestetici o altri farmaci"
              setData={setData}
              data={data!}
              prop="Copnseguenze"
              value={data!.Copnseguenze ?? false}
            />
            <SwitchAnamnesi
              label="Ha giá subito anestesie locali"
              setData={setData}
              data={data!}
              prop="GiaSubitoAnestesia"
              value={data!.GiaSubitoAnestesia ?? false}
            />
          </div>
          <div className={styles.bodyDx}>
            <SwitchAnamnesi
              label="Profilassi"
              setData={setData}
              data={data!}
              prop="Profilassi"
              value={data!.Profilassi ?? false}
            />
            <SwitchAnamnesi
              label="Terapia anticoagulanti"
              setData={setData}
              data={data!}
              prop="TerapiaAnticoagulanti"
              value={data!.TerapiaAnticoagulanti ?? false}
            />
            <SwitchAnamnesi
              label="Presenta ematomi o si gonfia facilmente"
              setData={setData}
              data={data!}
              prop="Ematomi"
              value={data!.Ematomi ?? false}
            />
            <SwitchAnamnesi
              label="Ha giá effettuato esami radiografici o terapia irradiante"
              setData={setData}
              data={data!}
              prop="EsamiOTerapia"
              value={data!.EsamiOTerapia ?? false}
            />
            <SwitchAnamnesi
              label="Facilmente soggetto a infezioni"
              setData={setData}
              data={data!}
              prop="FacilmenteInfezioni"
              value={data!.FacilmenteInfezioni ?? false}
            />
            <SwitchAnamnesi
              label="In gravidanza"
              setData={setData}
              data={data!}
              prop="Gravidanza"
              value={data!.Gravidanza ?? false}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <FaUserDoctor
            color="b8b8b8"
            style={{ width: "70px", height: "70px" }}
          />
          <p className={styles.sectionTitle}>Medico curante</p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodySx}>
            <Input
              placeholder="Nome medico curante"
              onChange={(e) => onChangeInput(e, "nomeMedico")}
              value={data!.nomeMedico ?? ""}
            />
          </div>
          <div className={styles.bodyDx}>
            <Input
              placeholder="Telefono medico curante"
              onChange={(e) => onChangeInput(e, "numeroMedico")}
              value={data!.numeroMedico ?? ""}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <LiaTeethSolid
            color="b8b8b8"
            style={{ width: "70px", height: "70px" }}
          />
          <p className={styles.sectionTitle}>Precedente dentista</p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodySx}>
            <Input
              placeholder="Nome dentista precedente"
              onChange={(e) => onChangeInput(e, "nomeDentista")}
              value={data!.nomeDentista ?? ""}
            />
          </div>
          <div className={styles.bodyDx}>
            <Input
              placeholder="Telefono dentista precedente"
              onChange={(e) => onChangeInput(e, "numeroDentista")}
              value={data!.numeroDentista ?? ""}
            />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <SlNote color="b8b8b8" style={{ width: "70px", height: "70px" }} />
          <p className={styles.sectionTitle}>Ulteriori Note</p>
        </div>
        <div className={styles.body}>
          <div className={styles.bodySx}>
            <Textarea
              rows={4}
              name="note"
              onChange={(e) => onChangeInput(e, "note")}
              placeholder="Note.."
              value={data!.note ?? ""}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        <Button
          onClick={() =>
            updateAnamnesi(
              searchParams.get("idCliente") ?? "",
              !!data!.AffezioniCardiache,
              !!data!.AffezioniRenali,
              !!data!.Affezionireumatiche,
              !!data!.AlterazionePressioneSanguigna,
              !!data!.Altro,
              !!data!.AsmaOAltro,
              !!data!.AssumeFarmaci,
              !!data!.Bruxista,
              !!data!.Copnseguenze,
              !!data!.Diabete,
              !!data!.Ematomi,
              !!data!.Emorragie,
              !!data!.EsamiOTerapia,
              !!data!.FacilmenteInfezioni,
              !!data!.Fumatore,
              !!data!.GiaSubitoAnestesia,
              !!data!.Gravidanza,
              !!data!.HaSoffertoSoffreMalattieInfettive,
              !!data!.IpersensibilitaVersoFarmaci,
              !!data!.MalattiePsichiche,
              !!data!.PatologieApparatoDigerente,
              !!data!.PatologieGenitoUrinarie,
              !!data!.PatologieOculari,
              !!data!.PatologieSangue,
              !!data!.PatologieSistemaNervoso,
              !!data!.Profilassi,
              !!data!.RicoveriOMalattie,
              !!data!.TerapiaAnticoagulanti,
              !!data!.Ulcere,
              data!.nomeDentista,
              data!.nomeMedico,
              data!.numeroDentista,
              data!.numeroMedico,
              data!.note
            )
          }
        >
          Salva anamnesi
        </Button>
      </div>
    </>
  );
}
