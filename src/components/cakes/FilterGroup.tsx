

import Link from "next/link";

interface FilterGroupProps {
  title: string;
  items: string[] | Array<{ name: string }>;
}

const FilterGroup = ({ title, items }: FilterGroupProps) => {
  // Map component titles to URL parameters
  const paramMap: Record<string, string> = {
    "Categories": "category",
    "Filter by Flavor": "flavor",
    "Filter by Occasion": "occasion"
  };

  // Get the URL parameter key based on the title
  const getParamKey = () => {
    return paramMap[title] || title.toLowerCase();
  };

  return (
    <div className="py-2">
      <h3 className="font-medium text-lg mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const itemName = typeof item === 'string' ? item : item.name;
          const paramKey = getParamKey();
          
          return (
            <Link
              key={itemName}
              href={`/cakes?${paramKey}=${encodeURIComponent(itemName.toLowerCase())}`}
              aria-label={`Filter by ${itemName}`}
              className="px-3 py-1 border border-gray-300 capitalize text-sm text-title cursor-pointer transition-colors hover:text-white hover:bg-primary rounded-md"
            >
              {itemName}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FilterGroup;