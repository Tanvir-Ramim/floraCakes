"use client";

import Slider from "@/components/ui/CustomSlider";

import "swiper/swiper-bundle.css";
import Card from "../../card/ProductCard";
import Container from "../../container/Container";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { useFilteredCakes } from "@/hooks/useFilteredCakes";
import { Product } from "@/@types";
import CardSkeleton from "../../card/CardSkeleton";

const SaleOff = () => {
  const params = {
    limit: 10,
    page: 1,
    sortBy: "discount",
    fields: "thumbImage,hoverImage,title,price,discount,id,servingSize category name short_description rating flavor",
  };

  const { data, isLoading, error } = useFilteredCakes(params);

  if (error)
    return (
      <div className="md:py-22 mt-8 px-5 md:px-0">
        <CardSkeleton />
      </div>
    );
  const cakes = data?.data?.products || [];
  const pagination = data?.data?.pagination || {};
  console.log("offer Cakes Data:", pagination);
  return (
    <Container className="md:py-24 py-10 mt-8 px-5 md:px-0">
      <div className="mb-5">
        <SectionTitle
          title="Offer/Discount"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
          laudantium aut."
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

export default SaleOff;
