import type { Metadata } from "next";

import DetailsTabs from "./DetailsTabs";
import ProductInfo from "./ProductInfo";
import ProductGallery from "./ProductGallery";
import { IProductProps } from "@/services/product.service";


export const metadata: Metadata = {
  title: "Plastic Dining Armchair - Buy Now",
  description:
    "High-quality plastic dining armchair, stylish and comfortable. Shop now!",
};

const ProductDetailPageComponent = ({ cake,addons,review }: IProductProps) => {
  const productImages = cake.images;
  const thumbImg = cake.thumbImage;
  const hoverImg = cake.hoverImage;

  productImages.unshift(thumbImg);
  productImages.push(hoverImg);

  return (
    <div className="pt-20 lg:mt-8 lg:px-5 container mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Shared wrapper to constrain sticky behavior */}
        <div className="flex flex-col gap-6 md:sticky top-28 md:h-fit">
          <ProductGallery
            images={productImages}
            title="Plastic Dining Armchair"
          />
        </div>
      
        {/* Sticky inside the same height as gallery */}
        <div className="">
          <ProductInfo
            title={cake.title}
            price={120}
            description={cake.short_description}
            cake={cake}
            addons={addons}
          />
        </div>
      </div>

      {/* details tab */}
      <div className="pt-8 lg:pt-16">
        <DetailsTabs review={review} description={cake.description} additional={cake.additional} />
      </div>
    </div>
  );
};

export default ProductDetailPageComponent;
