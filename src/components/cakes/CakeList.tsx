// "use client";

// import { SetStateAction, useEffect, useState } from "react";
// import Card from "../shared/card/ProductCard";

// import { FilterParams, useFilteredCakes } from "@/hooks/useFilteredCakes";

// const CakeList = () => {
//   const [sortBy, setSortBy] = useState<SetStateAction<string | null>>(null);
//   const [cakes, setCakes] = useState([]);
//   const [pagi, setPagi] = useState({});
//   const [flavors, setFlavors] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<SetStateAction<string | null>>(null);

//   const params: FilterParams = {
//     ...(sortBy && { sortBy }),
//   };

//   const {
//     data,
//     isLoading: queryLoading,
//     error: queryError,
//   } = useFilteredCakes(params);
//   console.log("filt", data);
//   useEffect(() => {
//     if (data) {
//       setCakes(data?.data?.products || []);
//       setPagi(data?.data?.pagination|| {})
//       setIsLoading(false);
//     }
//     if (queryError) {
//       setError(queryError);
//       setIsLoading(false);
//     }
//   }, [data, queryError]);

//   if (error) {
//     return (
//       <div className="text-red-500">Error loading flavors: {error.message}</div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col md:flex-row justify-between items-end">
//         <p className="text-subtitle md:block hidden text-sm">
//           Showing 1-6 of 24 Results
//         </p>
//         <div className="flex items-center gap-2">
//           <span className="text-sm sr-only text-subtitle">Sort by:</span>
//           <select
//             onChange={(e) => setSortBy(e.target.value)}
//             className="
//               text-sm focus:outline-none cursor-pointer"
//           >
//             <option>Select</option>
//             <option value="latest">Newest</option>

//             <option value="discount">Discount</option>
//             <option value="rating">Popular</option>
//           </select>
//         </div>
//       </div>

//       <div
//         className="grid grid-cols-1 @2xs:grid-cols-2
//        @md:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-3 @2xs:gap-2.5  @6xl:gap-5"
//       >
//         {cakes?.map((cake) => (
//           <div
//             key={cake.id}
//             // className="group relative border border-gray-100 rounded-lg p-2 overflow-hidden hover:shadow-md transition-shadow"
//           >
//             <Card key={cake?.id} isLoading={queryLoading} item={cake} />
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-center mt-8">
//         <div className="flex items-center gap-2">
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
//             &lt;
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md bg-gray-900 text-white">
//             1
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
//             2
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
//             3
//           </button>
//           <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100">
//             &gt;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CakeList;

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Card from "../shared/card/ProductCard";
import { FilterParams, useFilteredCakes } from "@/hooks/useFilteredCakes";

import { Product } from "@/@types";
import Pagination from "../shared/Pagination";
import { title } from "process";

const CakeList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all query parameters
  const category = searchParams.get("category");
  const name = searchParams.get("name");
  const title = searchParams.get("title");
  const occasion = searchParams.get("occasion");
  const page = searchParams.get("page") || "1";
  const sortBy = searchParams.get("sortBy");

  // Initialize params with defaults
  const params: FilterParams = {
    page: Number(page),
    limit: 10,
    ...(category && { category }),
    ...(occasion && { occasion }),
    ...(name && {
      name: name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }),
    ...(title && {
      title: title
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    }),
    ...(sortBy && { sortBy }),
  };

  const { data, isLoading: queryLoading } = useFilteredCakes(params);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    if (error) {
      setIsLoading(false);
    }
  }, [data, error]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());

    if (newSortBy) {
      newParams.set("sortBy", newSortBy);
    } else {
      newParams.delete("sortBy");
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", newPage.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };
  const handleLoadMore = () => {
    if (!isLoading && data?.data?.pagination?.hasNext) {
      const nextPage = Number(page) + 1;
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", nextPage.toString());
      router.push(`${pathname}?${newParams.toString()}`);
    }
  };
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-end">
        <p className="text-subtitle md:block hidden text-sm">
          Showing {(Number(page) - 1) * 10 + 1}-
          {Math.min(Number(page) * 10, data?.data?.pagination?.total || 0)} of{" "}
          {data?.data?.pagination?.total || 0} Results
        </p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-subtitle">Sort by:</span>
          <select
            value={sortBy || ""}
            onChange={handleSortChange}
            className="text-sm focus:outline-none cursor-pointer"
          >
            <option value="">Select</option>
            <option value="latest">Newest</option>
            <option value="discount">Discount</option>
            <option value="rating">Popular</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 @2xs:grid-cols-2 @md:grid-cols-2 @4xl:grid-cols-3 @5xl:grid-cols-3 @2xs:gap-2.5 @6xl:gap-5">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-lg animate-pulse"
              />
            ))
          : data?.data?.products?.map((cake: Product) => (
              <Card isLoading={queryLoading} key={cake.id} item={cake} />
            ))}
      </div>

      {data?.data?.pagination && (
        <Pagination
          currentPage={Number(page)}
          totalPages={data?.data?.pagination?.totalPages || 1}
          onPageChange={handlePageChange}
          isLoading={isLoading}
          hasMore={data?.data?.pagination?.hasNext}
          onLoadMore={handleLoadMore}
        />
      )}
    </div>
  );
};

export default CakeList;
