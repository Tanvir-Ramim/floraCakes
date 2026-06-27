"use client";

import { IImage } from "@/services/product.service";
import { buildCloudinaryUrl } from "@/utils/cloudinary";
import Image from "next/image";

interface ThumbnailListProps {
  images: IImage[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const ThumbnailList = ({
  images,
  selectedIndex,
  onSelect,
}: ThumbnailListProps) => {
  return (
    <div
      //   className="flex flex-row justify-center items-center
      // lg:flex-col gap-2 overflow-x-auto  lg:overflow-y-auto w-xs lg:max-w-[120px] mt-4
      // lg:mt-0 pb-2 px-2 lg:h-[400px] scrollbar-hide"

      className="flex items-center flex-row lg:flex-col gap-2
   overflow-x-auto lg:overflow-y-auto
  lg:w-[120px]  max-w-xs full lg:max-w-[120px]
     mt-4 lg:mt-0 pb-2 lg:h-[400px] lg:px-2 scrollbar-hide"
    >
      {images.map((img, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`flex-shrink-0 border-2 rounded-md overflow-hidden ${
            selectedIndex === index ? "border-blue-500" : "border-gray-200"
          }`}
          aria-label={`View image ${index + 1}`}
          aria-current={selectedIndex === index ? "true" : "false"}
        >
          <div className="md:w-24 w-16 md:h-20 h-16 relative">
            <Image
              src={buildCloudinaryUrl(img.public_id,"q_auto,f_auto,w_600,h_600,c_fill") || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className=" object-fit object-center"
            />
          </div>
        </button>
      ))}
    </div>
  );
};

export default ThumbnailList;
