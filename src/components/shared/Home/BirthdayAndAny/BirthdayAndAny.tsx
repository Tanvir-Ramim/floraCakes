"use client";

import Slider from "@/components/ui/CustomSlider";

import "swiper/swiper-bundle.css";

import { useFilteredCakes } from "@/hooks/useFilteredCakes";
import { Product } from "@/@types";
import CardSkeleton from "../../card/CardSkeleton";
import Container from "../../container/Container";
import SectionTitle from "../../SectionTitle/SectionTitle";
import Card from "../../card/ProductCard";

const BirthdayAndAny = () => {
  const params = {
    limit: 10,
    page: 1,
    category: "anniversary",
    fields:
      "thumbImage,hoverImage,title,price,discount,id,servingSize category",
  };

  const { data, isLoading, error } = useFilteredCakes(params);

  if (error)
    return (
      <div className="py-20 mt-8 px-5 md:px-0">
        <CardSkeleton />
      </div>
    );
  const cakes = data?.data?.products || [];
  const pagination = data?.data?.pagination || {};
  console.log("offer Cakes Data:", pagination);
  return (
    <Container className="md:py-24 py-7 mt-8 px-5 md:px-0">
      <div className="mb-5">
        <SectionTitle
          title=" Anniversary Cakes"
          description="Sweeten your special day with our delightful anniversary cakes."
        ></SectionTitle>
      </div>

      <div className="container mx-auto relative group/button overflow-hidden py-5">
        <Slider
          content={cakes}
          slidesPerView={2}
          nextEl="swiper-button-nexts-sale"
          prevEl="swiper-button-prevs-sale"
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1250: { slidesPerView: 4 },
          }}
          direction="next"
          top="50%"
          left="2"
          right="2"
          autoPlayTime={2000}
          autoplay={false}
          renderContent={(item: Product) => (
            <Card isLoading={isLoading} item={item} key="1" />
          )}
        />
      </div>
    </Container>
  );
};

export default BirthdayAndAny;
