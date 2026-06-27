"use client";

import Slider from "@/components/ui/CustomSlider";
import "swiper/swiper-bundle.css";
import LogoCard from "../../card/LogoCard";
import Container from "../../container/Container";

const LogoList = () => {
  const logos = [
    "https://vela-kazan.myshopify.com/cdn/shop/files/logo_image1_210x100.png",
    "https://vela-kazan.myshopify.com/cdn/shop/files/logo_image2_210x100.png?v=1613719814",
    "https://vela-kazan.myshopify.com/cdn/shop/files/logo_image3_210x100.png?v=1613719814",
    "https://vela-kazan.myshopify.com/cdn/shop/files/logo_image4_210x100.png",
    "https://vela-kazan.myshopify.com/cdn/shop/files/logo_image5_210x100.png",
    "https://vela-kazan.myshopify.com/cdn/shop/files/logo_image6_210x100.png",
    // Add more images as needed
  ];

  return (
    <section className="overflow-hidden md:py-12  ">
      <Container className=" px-5 relative group/button">
        <Slider
          content={logos}
          slidesPerView={3}
          nextEl="swiper-button-nextsss"
          prevEl="swiper-button-prevsss"
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          direction="next" // Pass direction for "next" or "prev"
          top="50%" // Control top position of navigation buttons
          left="2" // Control left position for prev button
          right="2" // Control right position for next button
          autoplay={true} // Enable autoplay
          renderContent={(item) => (
            <LogoCard item={item} /> // Render content for each slide
          )} // Render content for each slide0
        />
      </Container>
    </section>
  );
};

export default LogoList;
