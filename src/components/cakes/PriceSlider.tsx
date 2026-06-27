"use client";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

const PriceRangeFilter = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([106, 187]);
  const minPrice = 0;
  const maxPrice = 260;

  return (
    <div className="space-y-3 max-w-md mx-auto ">
      <h3 className="font-medium text-lg ">Filter by price</h3>

      <div className="relative pt-6 px-1">
        {/* Price indicators */}
        <div className="flex justify-between items-center mb-2">
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">
            ${minPrice}
          </span>
          <span
            className="absolute"
            style={{
              left: `${
                ((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100
              }%`,
              transform: "translateX(-50%)",
            }}
          >
            <span className="bg-author text-white px-2 py-1 rounded text-sm">
              ${priceRange[0]}
            </span>
          </span>
          <span
            className="absolute"
            style={{
              left: `${
                ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100
              }%`,
              transform: "translateX(-50%)",
            }}
          >
            <span className="bg-author text-white px-2 py-1 rounded text-sm">
              ${priceRange[1]}
            </span>
          </span>
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded text-sm">
            ${maxPrice}
          </span>
        </div>

        {/* Slider */}
        <Slider
          min={minPrice}
          max={maxPrice}
          value={priceRange}
          onChange={(value) => setPriceRange(value as [number, number])}
          range={{ draggableTrack: true }}
          allowCross={false}
          trackStyle={[{ backgroundColor: "#C0841A", height: 6 }]}
          railStyle={{ backgroundColor: "#E5E7EB", height: 6 }}
          handleStyle={[
            {
              borderColor: "#C0841A",
              backgroundColor: "#fff",
              height: 20,
              width: 20,
              marginTop: -7,
              boxShadow: "0 0 0 2px #C0841A",
            },
            {
              borderColor: "#C0841A",
              backgroundColor: "#fff",
              height: 20,
              width: 20,
              marginTop: -7,
              boxShadow: "0 0 0 2px #C0841A",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PriceRangeFilter;
