import {
  categories,
  // dietaryNeeds,
  occasions,
} from "@/constants/filterdata";
import BestSellar from "./BestSellar";
import FilterGroup from "./FilterGroup";
import { useAddonHook } from "@/hooks/addonHook";
import { useEffect, useState } from "react";
// import PriceRangeFilter from "./PriceSlider";

const Filter = () => {
  const [flavors,setFlavors]=useState([])
  const params = {
    type: "flavor",
    fields: "name -_id",
    limit:30
  };


  const { data , error: queryError } = useAddonHook(params);

  useEffect(() => {
    if (data) {
      setFlavors(data?.data?.addons || []);
    
    }
  
  }, [data, queryError]);





  return (
    <div className="space-y-5">
      <FilterGroup title="Categories" items={categories}  />
      <FilterGroup title="Filter by Flavor" items={flavors} />
      {/* <PriceRangeFilter /> */}
      <FilterGroup title="Filter by Occasion" items={occasions} />
      {/* <FilterGroup title="Filter by Dietary Needs" items={dietaryNeeds} /> */}
      <BestSellar />
    </div>
  );
};

export default Filter;
