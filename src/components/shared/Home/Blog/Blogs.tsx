"use client";

import Slider from "@/components/ui/CustomSlider";

import BlogCard from "../../card/BlogCard";
import Container from "../../container/Container";
import SectionTitle from "../../SectionTitle/SectionTitle";
import { useBlogHook } from "@/hooks/useBlogHook";
import { BlogPost } from "@/@types";
import BlogCardSkeleton from "../../card/BlogCardSkeleton";

export default function BlogPage() {
  const params = {
    limit: 10,
    fields: "blogId,title,author,thumbImage,createdAt,shortDescription",
  };
  const { data, isLoading, error } = useBlogHook(params);

  if (error) return <BlogCardSkeleton />;
  const blogs = data?.data?.blogs || [];
  console.log("Blogs Data:", blogs);
  return (
    <div className=" bg-white px-5 md:px-0">
      {/* Blog Posts Section */}
      <Container className="md:py-22 md:mt-10 mt-20">
        <div className=" ">
          <SectionTitle
            title="Our Blog Posts"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
          laudantium aut."
          ></SectionTitle>

          <div className=" md:mt-12 mt-6 relative group/button">
            <Slider
              content={blogs}
              // slidesPerView={3}
              nextEl="swiper-button-nexts-sale"
              prevEl="swiper-button-prevs-sale"
              breakpoints={{
                480: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              direction="next" // Pass direction for "next" or "prev"
              top="40%" // Control top position of navigation buttons
              left="2" // Control left position for prev button
              right="2" // Control right position for next button
              autoplay={false} // Enable autoplay
              renderContent={(item: BlogPost) => (
                <BlogCard key={item.blogId} isLoading={isLoading} item={item} />
              )}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
