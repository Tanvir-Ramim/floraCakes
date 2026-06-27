import { motion } from "framer-motion";
import { X } from "lucide-react";
import BestSellar from "./BestSellar";

import { categories, dietaryNeeds, occasions } from "@/constants/filterdata";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import FilterGroup from "./FilterGroup";
import PriceRangeFilter from "./PriceSlider";
import { useEffect, useState } from "react";
import { useAddonHook } from "@/hooks/addonHook";

interface MobileFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileFilter = ({ isOpen, onClose }: MobileFilterProps) => {
  useLockBodyScroll(isOpen);
  const [flavors, setFlavors] = useState([]);
  const params = {
    type: "flavor",
    fields: "name -_id",
  };

  const { data, error: queryError } = useAddonHook(params);

  useEffect(() => {
    if (data) {
      setFlavors(data?.data?.addons || []);
    }
  }, [data, queryError]);
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-9999 md:hidden"
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute top-0 left-0 h-full w-[280px] bg-white overflow-y-auto"
      >
        <div className="p-4 border-b sticky top-0 bg-white z-10 flex justify-between items-center">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button onClick={onClose} className="p-1 cursor-pointer">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <FilterGroup title="Categories" items={categories} />
          <FilterGroup title="Filter by Flavor" items={flavors} />
          <PriceRangeFilter />
          <FilterGroup title="Filter by Occasion" items={occasions} />
          <FilterGroup title="Filter by Dietary Needs" items={dietaryNeeds} />
        </div>

        <div className="p-4">
          <BestSellar />
        </div>

        <div className="p-4 border-t z-20 sticky bottom-0 bg-white">
          <div className="flex gap-2">
            <button
              className="flex-1 px-4 py-2 cursor-pointer border border-gray-300 rounded-md text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 cursor-pointer bg-gray-900 text-white rounded-md text-sm font-medium"
              onClick={onClose}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileFilter;
