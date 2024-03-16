import { ESliderSection } from "@/enum/types";


export type TSliderProps = {
  image: string;
  text: string;
  nome?: string;
  cognome?: string;
};

export type HeroProps = {
  titleStrong: string;
  titleLight: string;
  description: string;
  icon?: string;
  section: ESliderSection;
};

export type ServiziProps = {
  icon: string;
  text: string;
};

export type DoctorCardProps = {
  image: string;
  name: string;
  surname: string;
  profession: string;
  mailto: string;
}
