"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BiChevronRight } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import type { Swiper as SwiperClass } from "swiper"; // ✅ correct type import
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Banner.css";
import SubBanner from "./SubBanner";
import { useContent } from "@/hooks/cmsHook";
import { IContent } from "@/services/cms.service";
import Link from "next/link";
const BannerSlider = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null); // ✅ typed Swiper
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // banner fetch
  const params = {
    section: "banner",
    pageName: "Home",
    isActive: true,
  };

  const { data, isLoading } = useContent(params);
  const banners = data?.data?.contents;

  const handleSlideChange = (swiperInstance: SwiperClass) => {
    setActiveIndex(swiperInstance.activeIndex);
  };

  useEffect(() => {
    if (swiper && prevRef?.current && nextRef?.current) {
      if (!swiper.params.navigation) {
        swiper.params.navigation = {};
      }
      // Only set navigation params when swiper and refs are available

      // @ts-expect-error Swiper types are incomplete for navigation assignment
      swiper.params.navigation.prevEl = prevRef.current;
      // @ts-expect-error Swiper types are incomplete for navigation assignment
      swiper.params.navigation.nextEl = nextRef.current;

      // Initialize and update navigation
      if (swiper.navigation) {
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  }, [swiper]);
  if (isLoading) {
    return (
      <div className="animate-pulse relative">
        {/* 🔹 Top Banner Skeleton */}
        <div className="bg-gray-200">
          <div className="relative container mx-auto w-full z-10 lg:h-[95vh] h-[40vh] flex items-center">
            <div className="space-y-4">
              {/* Title skeleton */}
              <div className="h-10 w-72 bg-gray-300 rounded"></div>
              {/* Button skeleton */}
              <div className="h-10 w-40 bg-gray-300 rounded border border-gray-400"></div>
            </div>
          </div>
        </div>

        {/* 🔹 Bottom 3 Blocks Skeleton */}
        <div className="grid z-40 relative lg:-top-36 -top-20 container mx-auto grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {[1, 2, 3].map((_, idx) => (
            <div
              key={idx}
              className="bg-white p-3 rounded shadow flex flex-col overflow-hidden"
            >
              {/* Image placeholder */}
              <div className="h-48 w-full bg-gray-300 rounded mb-4"></div>
              {/* Title placeholder */}
              <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
              {/* Button / link placeholder */}
              <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div aria-label="Promotional Banner Section">
      <div className="relative group -z-99">
        <h2 className="sr-only">Promotional Banners</h2>
        <Swiper
          modules={[Pagination, Navigation, Autoplay, EffectFade]}
          slidesPerView={1}
          pagination={{
            el: ".custom-pagination",
            clickable: true,
          }}
          effect="fade"
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
        >
          {banners?.length > 0 ? (
            banners?.map((banner: IContent, index: number) => (
              <SwiperSlide key={index}>
                <div
                  className="relative h-[40vh] lg:h-screen py-20 lg:px-20 md:px-12 px-6 border border-[#E7E7E7] rounded flex items-center"
                  style={{
                    backgroundImage: banner?.image?.url
                      ? `url("${banner?.image?.url}")`
                      : "none",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute inset-0 bg-[#979696] opacity-10 rounded" />

                  <div className="relative  `@container container mx-auto  z-10 ">
                    <motion.h2
                      className="lg:text-4xl md:text-2xl text-xl text-[#333333] font-semibold  container line-clamp-2"
                      initial={{ y: 50, opacity: 0 }}
                      animate={
                        activeIndex === index
                          ? { y: 0, opacity: 1, scale: 1 }
                          : { y: 50, opacity: 0, scale: 0.98 }
                      }
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {banner.title}
                    </motion.h2>

                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={
                        activeIndex === index
                          ? { y: 0, opacity: 1 }
                          : { y: 50, opacity: 0 }
                      }
                      transition={{ delay: 0.3, duration: 0.7 }}
                    >
                      {banner?.link && (
                        <Link
                          href={banner.link}
                          className="inline-block mt-6 text-sm font-medium  px-6 py-3 uppercase border-2 border-[#333333] hover:bg-[#BD8448] hover:text-white hover:border-[#BD8448] duration-300"
                        >
                          Discover more
                        </Link>
                      )}
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-500">No images available</p>
          )}
          <div className="custom-pagination absolute bottom-3 lg:bottom-52 left-1/2 transform -translate-x-1/2 z-[999] flex gap-2 items-center justify-end" />
        </Swiper>

        {/* Navigation Arrows */}
        <button
          ref={prevRef}
          aria-label="Previous slide"
          className="custom-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <IoIosArrowBack />
        </button>
        <button
          aria-label="Next slide"
          ref={nextRef}
          className="custom-next opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full z-10"
        >
          <BiChevronRight />
        </button>
      </div>
      {/* Bottom Banners Section */}
      <div className="lg:-mt-36 max-w-7xl mx-auto z-9999">
        <h3 className="sr-only">More Offers</h3>
        <SubBanner />
      </div>
    </div>
  );
};

export default BannerSlider;
