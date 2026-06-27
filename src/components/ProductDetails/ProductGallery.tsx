"use client";

import { useCallback, useEffect, useState } from "react";
import Magnifier from "./Magnifier";
import MainImage from "./MainImage";
import ThumbnailList from "./ThumbnailList";
import { IImageProps } from "@/services/product.service";

const ProductGallery = ({ images, title }: IImageProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(images[0] || "");
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setSelectedImage(images[selectedIndex] || "");
  }, [selectedIndex]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    else if (e.key === "ArrowRight") handleNext();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setCursorPosition({
      x: Math.max(0, Math.min(1, x)),
      y: Math.max(0, Math.min(1, y)),
    });
  };

  return (
    <div className="w-full relative" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex flex-col-reverse lg:flex-row lg:gap-6 justify-center items-center">
        <ThumbnailList
          images={images}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
        />
        <div className=" w-full">
          <div className="relative overflow-hidden">
            <MainImage
              src={selectedImage}
              title={title}
              onPrev={handlePrev}
              onNext={handleNext}
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
              onMouseMove={handleMouseMove}
            />

            {/* Magnifier (Desktop Only) */}
            {showMagnifier && (
              <div className="hidden lg:block absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <Magnifier
                  image={selectedImage}
                  position={cursorPosition}
                  zoomLevel={2}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
