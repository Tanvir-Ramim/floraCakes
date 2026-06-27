"use client";

import { useFilteredCakes } from "@/hooks/useFilteredCakes";
import Card from "../../card/ProductCard";
import Container from "../../container/Container";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { Product } from "@/@types";
import BlogCardSkeleton from "../../card/BlogCardSkeleton";

const TrendingCakes = () => {
  const params = {
    category: "anniversary",

    limit: 4,
    sortBy: "-createdAt",
    fields: "thumbImage,hoverImage,title,price,discount,id,servingSize category name short_description rating flavor",
  };

  const { data, isLoading, error } = useFilteredCakes(params);

  const cakes = data?.data?.products || [];
  console.log("Trending Cakes Data:", cakes);

  if (error) return <BlogCardSkeleton />;

  return (
    <Container className="py-18 md:mt-8 px-5 md:px-0">
      <div className="mb-5">
        <SectionTitle
          title="Trending Cakes"
          description="Discover our most loved cakes by customers."
        />
      </div>
      <div
        className="pt-8 grid grid-cols-1 xs:grid-cols-2
       @md:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-4 @2xs:gap-2.5  @4xl:gap-10"
      >
        {cakes?.map((item: Product) => (
          <Card isLoading={isLoading} item={item} key={item.id} />
        ))}
      </div>
    </Container>
  );
};

export default TrendingCakes;
