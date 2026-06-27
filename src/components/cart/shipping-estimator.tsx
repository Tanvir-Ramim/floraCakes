"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "../ui/button/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addShippingInfo } from "@/store/features/cartSlice";
import { useSelectedItem } from "../utils/selectedItem";

interface Props {
  estimatedCost: number | null;
  setEstimatedCost: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AREA_COSTS: Record<string, number> = {
  Mirpur: 60,
  Mohammadpur: 70,
  Uttara: 80,
  Banani: 90,
  Gulshan: 100,
};

const DHAKA_AREAS = Object.keys(AREA_COSTS);

export default function ShippingEstimator({
  estimatedCost,
  setEstimatedCost,
}: Props) {
  const item = useSelectedItem();
  const [city, setCity] = useState("Dhk");
  const [area, setArea] = useState(item?.shipping?.area || "");
  const dispatch = useDispatch<AppDispatch>();

  // Sync with item.shipping changes
  useEffect(() => {
    if (item?.shipping) {
      setCity(item.shipping.city || "");
      setArea(item.shipping.area || "");
    }
  }, [item?.shipping]);

  const handleEstimate = () => {
    if (!city) {
      toast.error("Please select a city");
      return;
    }

    let calculatedCost: number | null = null;

    if (city === "Dhk") {
      if (!area) {
        toast.error("Please select an area for Dhaka");
        return;
      }
      calculatedCost = AREA_COSTS[area] || null;
    } else {
      calculatedCost = 500;
    }

    setEstimatedCost(calculatedCost);

    // Dispatch the shipping info to the store
    if (calculatedCost !== null) {
      console.log({ calculatedCost });
      dispatch(
        addShippingInfo({
          city,
          area,
          cost: calculatedCost,
        })
      );
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCity = e.target.value;
    setCity(newCity);
    setArea(""); // Reset area on city change
    setEstimatedCost(null);
  };

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setArea(e.target.value);
    setEstimatedCost(null);
  };
  console.log({ area });
  return (
    <div className=" mb-10 shadow-lg bg-slat-100 rounded p-2">
      <h3 className="font-medium mb-4 text-lg">Estimate Shipping</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* City Selector */}
        <div>
          <label htmlFor="city" className="block text-sm mb-1">
            City
          </label>
          <select
            id="city"
            disabled
            name="city"
            value={city}
            onChange={handleCityChange}
            className="w-full   rounded px-3 py-2 text-sm  bg-gray-100"
          >
            <option value="">Select City</option>
            <option value="Dhk">Dhaka</option>
          </select>
        </div>

        {/* Area Selector (only if Dhaka is selected) */}
        {city === "Dhk" && (
          <div>
            <label htmlFor="area" className="block text-sm mb-1">
              Area
            </label>
            <select
              id="area"
              name="area"
              value={area}
              onChange={handleAreaChange}
              className="w-full bg-gray-100 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Select area</option>
              {DHAKA_AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Estimate Button */}
        <Button
          label="Estimate"
          onClick={handleEstimate}
          className="w-1/4 secondary"
        />

        {/* Show estimated cost */}

        <p className="text-sm text-green-600 mt-2">
          Estimated Shipping Cost:{" "}
          <strong>{item?.shipping?.cost ?? estimatedCost} BDT</strong>
        </p>
      </div>
    </div>
  );
}
