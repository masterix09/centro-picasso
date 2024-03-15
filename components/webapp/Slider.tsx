"use client";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "@/style/ServiceSection/swiperSlide.css";
// import required modules
import { useIsSM } from "../../utils/useWindowSizes";

import { FC } from "react";
import styles from "@/style/common/Slider.module.scss";

import {
  DoctorCardProps,
  ESliderSection,
  ServiziProps,
  TSliderProps,
} from "@/enum/types";
import { Autoplay, Pagination } from "swiper/modules";
import CardSlideSwiper from "./CardSlideSwiper";
import CardSlideSwiperTestimonials from "./CardSlideSwiperTestimonials";
import ServiceCarousel from "./ServiceCarousel";
import DoctorCard from "./DoctorCard";

type SliderProps = {
  slidesPerViewMobile: number;
  slidesPerViewDesktop: number;
  card?: TSliderProps[];
  cardType: ESliderSection;
  pagination: boolean;
  heroContent?: ServiziProps[];
  doctorCardContent?: DoctorCardProps[];
};

const Slider: FC<SliderProps> = ({
  slidesPerViewMobile,
  slidesPerViewDesktop,
  card,
  cardType,
  pagination,
  heroContent,
  doctorCardContent,
}) => {
  return (
    <div
      className={
        cardType === ESliderSection.SERVICE_PAGE
          ? styles.containerFull
          : styles.container
      }
    >
      <Swiper
        slidesPerView={useIsSM() ? slidesPerViewMobile : slidesPerViewDesktop}
        pagination={pagination}
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        {cardType === ESliderSection.HOME_SERVICE &&
          card!.map((item, index) => (
            <SwiperSlide key={index}>
              <CardSlideSwiper image={item.image} text={item.text} />
            </SwiperSlide>
          ))}
        {cardType === ESliderSection.TESTIMONIALS &&
          card!.map((item, index) => (
            <SwiperSlide key={index}>
              <CardSlideSwiperTestimonials
                image={item.image}
                text={item.text}
                nome={item.nome!}
                cognome={item.cognome!}
                width={350}
                height={350}
                borderRadius={50}
              />
            </SwiperSlide>
          ))}
        {cardType === ESliderSection.TESTIMONIALS_SERVICE_PAGE &&
          card!.map((item, index) => (
            <SwiperSlide key={index}>
              <CardSlideSwiperTestimonials
                image={item.image}
                text={item.text}
                nome={item.nome!}
                cognome={item.cognome!}
                width={350}
                height={400}
                borderRadius={50}
              />
            </SwiperSlide>
          ))}
        {cardType === ESliderSection.SERVICE_PAGE &&
          heroContent!.map((item, index) => (
            <SwiperSlide key={index}>
              <ServiceCarousel icon={item.icon} text={item.text} />
            </SwiperSlide>
          ))}
        {cardType === ESliderSection.HOME_SERVICE_DOCTOR &&
          doctorCardContent!.map((item, index) => (
            <SwiperSlide key={index}>
              <DoctorCard
                image={item.image}
                name={item.name}
                surname={item.surname}
                profession={item.profession}
                mailto={item.mailto}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default Slider;
