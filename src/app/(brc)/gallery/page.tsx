"use client";

import GlobalBanner from "@/components/shared/globalBanner";

import { useEffect, useState } from "react";

import { IGalleryItem, useInfiniteGallery } from "@/hooks/cmsHook";
import { useInView } from "react-intersection-observer";
import GalleryCard from "@/components/shared/card/GalleryCard";
import { Skeleton } from "@/components/ui/Skeleton";

export default function GalleryPage() {
  const [page, setPage] = useState(1);
  const limit = 10; // Number of items per load

  const {
    data,
    isLoading,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGallery({
    page,
    limit,
  });

  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
      setPage((prev) => prev + 1);
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages data

  const galleryItems = data?.pages[0].galleries || [];
  console.log(galleryItems, "5");
  return (
    <>
      <GlobalBanner url={galleryItems[0]?.image?.url} title="Gallery" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-xl md:text-3xl font-bold mb-4">
            Our Cake Gallery
          </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
				Give the gift of delicious artisanal cakes. Our gift cards are perfect
				for birthdays, anniversaries, or any special occasion.
			</p>
        </section>

        {/* Gallery Grid */}
        <div className=" w-full">
          {galleryItems.map((item: IGalleryItem, index: number) => (
            <div key={index} className="mb-16">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <div
                  className={`flex flex-col lg:flex-row ${
                    index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  }`}
               
                >
                  <GalleryCard item={item} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Loading indicator and infinite scroll trigger */}
        <div ref={ref} className="h-10 flex justify-center items-center">
          {isFetchingNextPage && <GallerySkeleton />}
          {!hasNextPage && !isLoading && (
            <p className="text-gray-500">No more items to load</p>
          )}
        </div>
      </div>
    </>
  );
}

export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`${
            index % 2 === 0 ? "md:justify-self-end" : "md:justify-self-start"
          }`}
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Image Skeleton */}
            <Skeleton className="h-64 w-full rounded-none" />

            {/* Content Skeleton */}
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>

              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-1/3 rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-5/6 rounded-md" />
                <Skeleton className="h-3 w-4/6 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
