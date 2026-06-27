// components/other-products/ProductGrid.tsx
import { IAddonProduct } from "@/@types";
import Image from "next/image";
import { Plus, Minus, ShoppingCart, X } from "lucide-react";

interface ProductGridProps {
  products: IAddonProduct[];
  isLoading: boolean;
  selectedProducts: IAddonProduct[];
  onSelect: (product: IAddonProduct) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

export default function ProductGrid({
  products,
  isLoading,
  selectedProducts,
  onSelect,
  onQuantityChange,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            <div className="animate-pulse">
              <div className="bg-gray-100 h-60 w-full"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-100 rounded w-3/4"></div>
                <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                <div className="h-10 bg-gray-100 rounded-lg mt-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 max-w-7xl mx-auto px-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-400 mb-4"
        >
          <path d="m7.5 4.27 9 5.15"></path>
          <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
          <path d="m3.3 7 8.7 5 8.7-5"></path>
          <path d="M12 22V12"></path>
        </svg>
        <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-500 text-center max-w-md">
          We couldn't find any products matching your selection. Try another category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8  mx-auto ">
      {products.map(product => {
        const isSelected = selectedProducts.some(p => p._id === product?._id);
        const selectedProduct = selectedProducts.find(p => p._id === product?._id);
        const quantity = selectedProduct?.quantity || 1;

        return (
          <div
            key={product?._id}
            className={`
              group relative bg-white border border-gray-100 rounded-xl overflow-hidden 
              shadow-sm hover:shadow-md transition-all duration-300
              ${isSelected ? "ring-1  ring-gray-500" : ""}
            `}
          >
            {/* Favorite button */}
            <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 hover:text-pink-500 transition-colors"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
            </button>

            {/* Product image */}
            <div className="relative h-60 bg-gray-50">
              <Image
                src={product?.image?.url}
                alt={product?.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </div>

            {/* Product info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 line-clamp-1">{product?.name}</h3>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                    {product?.category}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-gray-500 text-sm line-through">৳{Math.round(product?.price * 1.2)}</p>
                  <p className="font-bold text-gray-900 text-lg">৳{product?.price}</p>
                </div>
                
                {isSelected ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuantityChange(product?._id, Math.max(1, quantity - 1));
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                      <span className="px-3 py-1 bg-white text-center min-w-[2rem]">
                        {quantity}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuantityChange(product?._id, quantity + 1);
                        }}
                        className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(product);
                      }}
                      className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors"
                      title="Remove"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-700"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(product);
                    }}
                    className={`
                      px-4 py-2 rounded-sm text-sm font-medium transition-all
                      flex items-center gap-2 border border-transparent
                      ${isSelected
                        ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        : "bg-black hover:bg-gray-800 text-white hover:shadow-md"}
                    `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={isSelected ? "text-gray-700" : "text-white"}
                    >
                      <circle cx="10" cy="20.5" r="1"></circle>
                      <circle cx="18" cy="20.5" r="1"></circle>
                      <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"></path>
                    </svg>
                    {isSelected ? "Remove" : "Add to Cart"}
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
