"use client";
import React from "react";
import Image from "next/image";
// import { museoBold } from "../../utils/font";
import { useIsSM } from "@/utils/useWindowSizes";
import { ESliderSection } from "@/enum/types";
import CtaButton from "./CtaButton";

const HeroSection = ({
  titleStrong,
  titleLight,
  description,
  icon,
  section,
}: {
  titleStrong: string;
  titleLight: string;
  description: string;
  icon?: string;
  section: ESliderSection;
}) => {
  return (
    <div
      className={
        section === ESliderSection.HOME
          ? "bg-[#f2f2f2] w-full flex h-auto md:h-[90vh] justify-center items-center flex-col md:flex-row"
          : "bg-[#2a4b9a] w-full flex h-auto md:h-[90vh] justify-center items-center flex-col md:flex-row"
      }
    >
      <div className="w-screen h-[50vh] md:h-full relative">
        <Image
          src="/images/Centro_Picasso_dentisti_dal_1999.png"
          alt="Immagine di sfondo del servizio"
          fill
          className="md:object-cover md:object-center bg-[#2a4b9a] md:bg-transparent"
        />
      </div>
      <div
        className={
          section === ESliderSection.HOME
            ? "w-full md:w-[55%] lg:w-full h-full p-[15px] lg:p-[30px] flex flex-row lg:flex-col justify-center items-center text-[#2a4b9a]"
            : "w-full md:w-[55%] lg:w-full h-full p-[15px] lg:p-[30px] flex flex-row lg:flex-col justify-center items-center text-white"
        }
      >
        <div className="w-scren flex justify-center items-center flex-col p-0 md:p-[30px] gap-[60px] xl:gap-[30px]">
          {!useIsSM() && (
            <Image
              src="/images/Centro_Picasso_Logotipo.svg"
              alt="logo dello studio dentistico Centro picasso in Sant'antimo provincia di Napoli"
              width={340}
              height={45}
            />
          )}

          <div className="flex flex-col md:flex-row">
            {icon && (
              <div className="w-full flex justify-center items-center md:hidden">
                <Image
                  src={`/images/services/${icon}`}
                  alt={`${titleStrong} ${titleLight}`}
                  width={50}
                  height={50}
                />
              </div>
            )}
            <div className="w-full">
              <h1 className="text-5xl md:text-7xl text-left font-bold mt-4 md:mt-0 ">
                {titleStrong}
              </h1>
              <h1 className="text-5xl md:text-7xl text-left ">{titleLight}</h1>
            </div>
          </div>
          <p className="text-2xl text-center lg:text-center lg:px-[2%] px-0">
            {description}
          </p>

          <div className="w-[90%] md:w-full my-0 mx-auto flex flex-col md:flex-row gap-[30px] md:gap-[20px] mt-[30px] md:mt-[60px]">
            <CtaButton href="/contatti" title="FISSA UN APPUNTAMENTO" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
