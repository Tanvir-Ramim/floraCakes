import { useFilteredCakes } from "@/hooks/useFilteredCakes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IBest {
  title: string;
  category: string;
  id: string;
  thumbImage: {url:string};
  servingSize: [{weight:string,price:number}];
  rating: number;
}
const BestSellar = () => {
  const [bestSell, setBest] = useState([]);

  const param = {
    sortBy: "rating",
    fields: "title category id thumbImage servingSize rating",
    limit: 6,
  };
  const { data, error: queryError } = useFilteredCakes(param);

  useEffect(() => {
    if (data) {
      setBest(data?.data?.products || []);
    }
  }, [data, queryError]);

  return (
    <>
      {" "}
      <h3 className="font-medium text-lg mb-5">Best sellers</h3>
      <div className="space-y-4">
        {bestSell.map((cake:IBest) => (
          <div key={cake?.id}>
            <Link
              href={`/cakes/${cake.id}?category=${cake.category}
                .replace(/\s+/g, "-")
                .toLowerCase()`}
              className="flex gap-5"
            >
              <div>
                {cake?.thumbImage && (
                  <Image
                    src={cake?.thumbImage?.url || "/placeholder.svg"}
                    alt={cake.title}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                )}
              </div>
              <div>
                <h4 className="text-cardsub text-sm hover:text-author">
                  {cake?.title}
                </h4>
                 <div>
               {cake.rating}
              </div>
              </div>
             
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default BestSellar;
