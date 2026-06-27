"use client";

import { ProductCardProps } from "@/@types";
import { buildCloudinaryUrl } from "@/utils/cloudinary";
import Image from "next/image";
import Link from "next/link";
import CardSkeleton from "./CardSkeleton";
import { useDispatch } from "react-redux";
import { addTowish } from "@/store/features/wishList";
import { AppDispatch } from "@/store";
import { toast } from "react-toastify";

const Card = ({
  item,
  isLoading,
}: ProductCardProps & { isLoading?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();

  const addToWishFun = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Wishlist button clicked");

    if (!item?.id) {
      console.warn("No item ID found");
      return;
    }

    dispatch(addTowish(item));
    toast.success("Item Added To Wishlist");
  };

  if (isLoading || !item) {
    return <CardSkeleton />;
  }

  const mainImageUrl = buildCloudinaryUrl(
    item?.thumbImage?.public_id,
    "q_auto,f_auto,w_600,h_600,c_fill"
  );
  const hoverImageUrl = buildCloudinaryUrl(
    item?.hoverImage?.public_id,
    "q_auto,f_auto,w_600,h_600,c_fill"
  );

  return (
    <div className="my-5 overflow-hidden w-full   group">
      {/*max-w-[788px] */}

      <div className="bg-[#F9F9F9] relative h-60 lg:h-96 w-full">
        {/* Images */}
        <div>
          <Image
            src={mainImageUrl}
            alt={item?.title || "Cake product"}
            fill
            sizes="25vw"
            className="absolute object-cover z-10 group-hover:opacity-0 transition-opacity ease-in-out duration-500"
          />
          <Image
            src={hoverImageUrl}
            alt={item?.title || "Cake product"}
            fill
            sizes="25vw"
            className="absolute object-cover"
          />
          {item?.tag && (
            <div className="absolute z-10 top-3 right-3 bg-author text-white px-2 py-1 text-xs font-bold rounded">
              {item?.tag}
            </div>
          )}
        </div>

        {/* Action Buttons - Fixed Version */}
        <div className="absolute right-6 bottom-6 flex flex-col gap-2">
          {/* search button */}
          <div
             title="Similar Cakes"
            className="w-[40px] h-[40px] cursor-pointer bg-white flex items-center justify-center rounded-full 
                      transform transition-all duration-500
                      opacity-0 group-hover:opacity-100
                      translate-x-full group-hover:translate-x-0
                      rotate-180 group-hover:rotate-0
                      z-50 relative"
          >
             
            <Link
              href={`/cakes?category=${ encodeURIComponent(item.category?.toLowerCase())
                }&name=${ encodeURIComponent(item.name?.toLowerCase()
                )}`}
              className="overflow-hidden block"
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
          {/* Wishlist Button */}
          <button
            title="Add To Wish"
            onClick={addToWishFun}
            className="w-[40px] h-[40px] cursor-pointer bg-white flex items-center justify-center rounded-full 
                      transform transition-all duration-500
                      opacity-0 group-hover:opacity-100
                      translate-x-full group-hover:translate-x-0
                      rotate-180 group-hover:rotate-0
                      z-50 relative" // Ensure it's above other elements
            aria-label="Add to wishlist"
          >
            <svg
              fill="#000000"
              height="20px"
              width="20px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 471.701 471.701"
            >
              <g>
                <path d="M433.601,67.001c-24.7-24.7-57.4-38.2-92.3-38.2s-67.7,13.6-92.4,38.3l-12.9,12.9l-13.1-13.1c-24.7-24.7-57.6-38.4-92.5-38.4c-34.8,0-67.6,13.6-92.2,38.2c-24.7,24.7-38.3,57.5-38.2,92.4c0,34.9,13.7,67.6,38.4,92.3l187.8,187.8c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-3.9l188.2-187.5c24.7-24.7,38.3-57.5,38.3-92.4C471.801,124.501,458.301,91.701,433.601,67.001z M414.401,232.701l-178.7,178l-178.3-178.3c-19.6-19.6-30.4-45.6-30.4-73.3s10.7-53.7,30.3-73.2c19.5-19.5,45.5-30.3,73.1-30.3c27.7,0,53.8,10.8,73.4,30.4l22.6,22.6c5.3,5.3,13.8,5.3,19.1,0l22.4-22.4c19.6-19.6,45.7-30.4,73.3-30.4c27.6,0,53.6,10.8,73.2,30.3c19.6,19.6,30.3,45.6,30.3,73.3C444.801,187.101,434.001,213.101,414.401,232.701z" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Product title */}
      <Link
        href={`/cakes/${item.id}?category=${item.category
          ?.replace(/\s+/g, "-")
          .toLowerCase()}&name=${item.title
          ?.replace(/\s+/g, "-")
          .toLowerCase()}`}
        className="overflow-hidden block"
      >
        <h2 className="text-sm  capitalize  text-cardsub hover:text-author pt-4 w-fit">
          {item?.title}
        </h2>
      </Link>

      {/* Price section */}
      <div className="flex items-center justify-between relative md:py-4">
        <div className="w-full">
          <p
            className="text-sm 
            font-medium text-title flex gap-2    left-0 
       group-hover:-translate-x-full -translate-x-0   transform transition-all 
       duration-150"
          >
            ৳{item?.servingSize && item?.servingSize[0]?.price}
            {item?.discount && item?.discount > 0 && (
              <span className="text-price  line-through">
                ৳{item?.discount}
              </span>
            )}
          </p>
        </div>
        {/* add to cart */}
        <div
          className="   translate-x-full group-hover:-translate-x-full   transform transition-all 
        w-full
         duration-300"
        >
          <Link
            href={`/cakes/${item.id}?category=${item.category
              ?.replace(/\s+/g, "-")
              .toLowerCase()}&name=${item.title
              ?.replace(/\s+/g, "-")
              .toLowerCase()}`}
            className="flex items-center text-sm cursor-pointer gap-1
           text-title font-medium border-b border-b-gray-200
            hover:text-author hover:border-b-author duration-300"
          >
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="10px"
                height="10px"
                className="fill-gray-600 group-hover:fill-author
                 transition-colors duration-300"
              >
                <path
                  fillRule="evenodd"
                  d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
                />
              </svg>
            </div>
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
