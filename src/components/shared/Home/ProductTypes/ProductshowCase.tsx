"use client";

import Link from "next/link";
import Container from "../../container/Container";
import { useFilteredCakes } from "@/hooks/useFilteredCakes";
import { buildCloudinaryUrl } from "@/utils/cloudinary";
import { Product as cak } from "@/@types";

interface ProductProps {
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const Product = ({
  category,
  name,
  description,
  price,
  image,
}: ProductProps) => {
  return (
    <div
      className="flex flex-col md:flex-row items-center md:bg-[#f6f6f6] md:py-14 md:mt-12 md:mb-4 mb-2  mt-4 md:px-10 sm:px-8 xs:px-6 px-3"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "",
      }}
    >
      <div className=" md:pr-8 mt-4 lg:mt-0  mb-8 md:mb-0">
        <div className="text-amber-600 font-medium mb- text-[12px] @5xl:text-[14px] capitalize ">
          {category}
        </div>
        <h2 className="text-normal text-[#323232] @5xl:text-lg text-normal font-semibold mb-2">
          {name}
        </h2>
        <p className="text-[#323232] mb-5 @5xl:my-5 max-w -sm text-[10px] @5xl:text-sm">
          {description}
        </p>
        <Link
          href="/cakes"
          className="inline-block border border-gray-800 px-6 md:py-3 py-1.5 text-[#757575]  text-[12px]
          font-semibold hover:bg-gray-800 hover:text-white transition-colors"
        >
          ORDER NOW / ${price.toFixed(2)}
        </Link>
      </div>
    </div>
  );
};

export default function ProductShowcase() {
  const params = {
    category: "theme",
    limit: 2,
    sortBy: "-createdAt",
    fields:
      "thumbImage,hoverImage,name,category,short_description,id,servingSize name short_description rating flavor",
  };

  const { data, isLoading, error } = useFilteredCakes(params);

  if (isLoading) {
    return (
      <Container className="w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2].map((_, idx) => (
            <div key={idx} className="rounded-md overflow-hidden relative">
              {/* Image Skeleton */}
              <div className="h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>

              {/* Content Skeleton */}
              <div className="absolute top-20 left-5 space-y-3 text-white w-3/4">
                <div className="h-4 w-20 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-6 w-1/2 bg-gray-300 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-300 animate-pulse rounded"></div>

                <div className="mt-4 h-10 w-40 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <div className="md:py-20 py-10 mt-8 px-5 md:px-0">
        <p className="text-red-500">Error loading products.</p>
      </div>
    );
  }

  const cake = data?.data?.products || [];

  return (
    <Container className="w-full ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cake?.map((product: cak, index: number) => (
          <Product
            key={index}
            category={product.category ?? ""}
            name={product.name ?? ""}
            description={product.short_description ?? ""}
            price={product.servingSize[0].price}
            image={buildCloudinaryUrl(
              product?.thumbImage?.public_id,
              "q_auto,f_auto,w_2000,h_800,c_fill"
            )}
          />
        ))}
      </div>
    </Container>
  );
}
