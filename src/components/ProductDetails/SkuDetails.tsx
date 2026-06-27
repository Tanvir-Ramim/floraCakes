import Image from "next/image";

import ssl from "../../app/(brc)/assets/logo/ssl.png";
import Social from "../ui/Social/Social";

import Link from "next/link";

interface SkuDetailsProps {
  avail: string;
  sku: string;
  category: string;
  title: string;
  tags: string[];
}
const SkuDetails = ({ avail, sku, tags, category,title }: SkuDetailsProps) => {
  
  return (
    <div className="space-y-4 text-sm text-subtitle">
      {/* Availability */}
      <p>
        <span className="">Availability:</span>{" "}
        <span className="text-avail ">{avail}</span>
      </p>

      {/* SKU */}
      <p>
        <span className="">SKU:</span> {sku}
      </p>

      {/* Brand */}
      <p className="capitalize">
        <Link href={`/cakes?category=${category}`}>
          <span className="capitalize">Category:</span> <span>{category}</span>
        </Link>
      </p>
      {/* Tags */}
      <p>
        <span className="font-medium">Flavor:</span>{" "}
        {tags.slice(0,10).map((tag, index) => (
          <span
            key={index}
            className="text-avail hover:underline cursor-pointer text-[13px]"
          >
            {tag}
            {index < tags.length - 1 && ", "}
          </span>
        ))}
      </p>

      {/* Share icons */}
      <div className="flex items-center gap-3">
        <span className="font-medium">Share:</span>
        <div className="flex gap-3 text-gray-500 text-lg">
          <Social
            shareUrl={`http://localhost:3000/cakes/${sku}?category=${category?.replace(/\s+/g, "-").toLowerCase()}&name=${title?.replace(/\s+/g, "-").toLowerCase()}`}
            title={title}
          />
        </div>
      </div>

      <hr className="my-4 border-gray-300" />

      {/* Delivery & Shipping Info */}
      {/* <div className="space-y-2">
        <p className="flex items-center gap-2">
          <FaTruck className="text-gray-500" />
          <span>
            Estimated Delivery:{" "}
            <span className="text-author font-medium">{formatDateRange()}</span>
          </span>
        </p>

        <p className="flex items-center gap-2">
          <FaUndo className="text-subtitle" />
          <span>
            Free Shipping & Returns:{" "}
            <span className="font-medium text-subtitle">
              On all orders over $500.00
            </span>
          </span>
        </p>
      </div> */}

      {/* Safe Checkout */}
      <div className="mt-6 border border-gray-200 rounded-md p-4 text-center">
        <h3 className="font-medium mb-4 text-title">
          Guaranteed SAFE Checkout
        </h3>
        <div
          className="flex justify-center items-center
         flex-wrap gap-3"
        >
          <Image
            src={ssl}
            alt="SSLCommerz"
            width={1000}
            height={400}
            className=" object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SkuDetails;
