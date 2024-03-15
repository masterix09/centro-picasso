"use client";
import HeroSection from "@/components/webapp/HeroSection";
import ServiceSection from "@/components/webapp/ServiceSection";
import { ESliderSection } from "@/enum/types";
import { useRef } from "react";

export default function Home() {
  const refBook = useRef<HTMLDivElement>(null);

  const handleNavigation = () => {
    let currentSectionRef = null;

    currentSectionRef = refBook;

    window.scrollTo({
      top: currentSectionRef?.current?.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <main>
      <HeroSection
        titleStrong="Siamo alleati"
        titleLight="del tuo sorriso"
        description="Con competenza e professionalità, offriamo trattamenti dentali di alta qualità per tutta la famiglia."
        section={ESliderSection.HOME}
      />
      <ServiceSection handleNavigation={handleNavigation} />
    </main>
  );
}
