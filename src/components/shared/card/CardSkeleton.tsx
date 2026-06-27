// src/components/shared/card/CardSkeleton.tsx
"use client";

import React from "react";

const CardSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      {/* Image section */}
      <div className="relative w-full aspect-[3/3.4] bg-gray-200 rounded-md overflow-hidden">
        {/* Zoom and heart icons */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2">
          <div className="w-10 h-10 bg-white rounded-full shadow-md" />
          <div className="w-10 h-10 bg-white rounded-full shadow-md" />
        </div>
      </div>

      {/* Title */}
      <div className="mt-2 h-4 w-2/3 bg-gray-300 rounded" />

      {/* Add to Cart */}
      <div className="mt-1 h-4 w-24 bg-gray-300 rounded" />
    </div>
  );
};

export default CardSkeleton;
