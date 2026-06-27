"use client";

import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import NavigationButton from "./NavigationButton";

interface SliderProps<T> {
  content: T[]; //  generic content array
  slidesPerView?: number;
  autoPlayTime?: number;
  nextEl: string;
  prevEl: string;
  loop?: boolean; // Optional loop
  breakpoints: Record<number, { slidesPerView: number }>; // Proper type for breakpoints
  direction?: string; // Direction for navigation (prev/next)
  top?: string; // Top position of buttons
  left?: string; // Left position of buttons
  right?: string; // Right position of buttons
  autoplay?: boolean; // Optional autoplay

  // @ts-expect-error:renderContent is not typed correctly
  renderContent: (item: T) => JSX.Element; // Adjusted to avoid 'any' type
}

const Slider = <T,>({
  content,
  slidesPerView,
  breakpoints,
  nextEl,
  prevEl,
  top = "50%",
  left,
  right,
  renderContent,
  autoplay = false, // Optional autoplay
  loop = true, // Optional loop
  autoPlayTime = 1000,
}: SliderProps<T>) => {
  return (
    <div className="relative">
      <Swiper
        spaceBetween={10}
        slidesPerView={slidesPerView}
        navigation={{
          nextEl: `.${nextEl}`,
          prevEl: `.${prevEl}`,
        }}
        modules={[Pagination, Navigation, Autoplay, EffectFade]}
        loop={loop}
        autoplay={autoplay ? { delay: autoPlayTime } : false}
        breakpoints={breakpoints}
        className="relative"
      >
        {content?.map((item, index) => (
          <SwiperSlide key={index}>{renderContent(item)}</SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <NavigationButton
        direction={"prev"}
        className={`${prevEl} ${top} ${left} top-1/2`}
      />
      <NavigationButton
        direction="next"
        className={`${nextEl} ${top} ${right} top-1/2`}
      />
    </div>
  );
};

export default Slider;
