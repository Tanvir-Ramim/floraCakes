"use client";

import { IImage } from "@/services/product.service";
import { buildCloudinaryUrl } from "@/utils/cloudinary";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";


interface MainImageProps {
  src: IImage;
  title: string;
  onPrev: () => void;
  onNext: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MainImage: React.FC<MainImageProps> = ({
  src,
  title,
  onPrev,
  onNext,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
}) => {
  return (
    <div className="relative  rounded-md overflow-hidden  md:h-[400px]">
      <Image
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        src={
          buildCloudinaryUrl(
            src.public_id,
            "q_auto,f_auto,w_600,h_600,c_fill"
          ) || "/placeholder.svg"
        }
        alt={title || "Product Image"}
        width={100}
        height={100}
        sizes="25vw"
        className="w-full h-full object-contain cursor-move"
      />

      {/* Arrows */}
      <button
        onClick={onPrev}
        className="absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>


    </div>
  );
};

export default MainImage;
