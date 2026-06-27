"use client";

import { Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/button/button";
import AddonItems from "./AddonItems";
import ReviewModal from "./Review";
import SkuDetails from "./SkuDetails";
import { createSafeHTML } from "../utils/safe-html";
import { IProduct } from "@/services/product.service";
import { IAddon } from "@/@types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addToCart, ICartItem } from "@/store/features/cartSlice";
import { toast } from "react-toastify";

interface ProductInfoProps {
  title: string;
  price?: number;
  description: string;
  cake: IProduct;
  addons: IAddon[];
}
const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  price = 0,
  description,
  cake,
}) => {
  const addonRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedWeight, setSelectedWeight] = useState<{
    weight: string;
    price: number;
  }>({ weight: "", price: 0 });
  const [selectedFlavours, setSelectedFlavours] = useState<{
    name: string;
    price: number;
  }>({ name: "", price: 0 });
  const [selectedItems, setSelectedItems] = useState<IAddon[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // add to redux store or context:
  const handleAddToCart = () => {
    // validate for add to cart
    if (!selectedWeight.weight) {
      toast.warning("Please select a weight");
      return;
    }
    // flavor price calculation
    let flavorPrice = 0;
    const mx = Number(selectedWeight.weight.split(" ")[0]);
    if (selectedFlavours.name) {
      flavorPrice = selectedFlavours.price * mx;
      console.log("weight", selectedFlavours.price * mx);
    }
    // cake price calculation by discount
    let cakePrice = selectedWeight.price;
    if (cake.discount && cake.discount > 0) {
      cakePrice = cakePrice - (cakePrice * cake.discount) / 100;
    }
    const cakeData: ICartItem = {
      cake: cake,
      id: cake.id,
      title: cake.name,
      weight: Number(selectedWeight.weight.split(" ")[0]),
      priceRegular: selectedWeight.price,
      priceWithDiscount: cakePrice,
      flavor: { name: selectedFlavours.name, price: flavorPrice },
      addons: selectedItems,
      quantity: 1,
      totalPrice:
        cakePrice +
        flavorPrice +
        selectedItems.reduce((acc, item) => acc + item.price, 0),
      img: cake.thumbImage.url,
      discount: cake.discount ? cake.discount : 0,
    };

    dispatch(addToCart(cakeData));

    // addcart success message
    toast.dismiss();
    toast.success("Cake added to cart successfully!");
  };

  useEffect(() => {
    const uniqueFlavors = cake.flavor.map((flavor) => flavor.name);
    setFlavors(uniqueFlavors);
  }, [cake.flavor]);
  return (
    <section aria-labelledby="product-title" className="space-y-6 ">
      <h1
        id="product-title"
        className="text-lg text-title lg:text-2xl font-bold"
      >
        {title}
      </h1>
      {/* <p className="text-2xl text-title">${price.toFixed(2)}</p> */}

      <p
        className="text-subtitle text-sm"
        dangerouslySetInnerHTML={{
          __html: createSafeHTML(description, 300),
        }}
      />

      {/* Weight Selection */}
      <div>
        <h3 className="text-sm font-medium mb-2">
          Weight:{" "}
          <span className="text-subtitle text-sm capitalize">
            {selectedWeight.weight}
          </span>
        </h3>
        <div className="flex flex-wrap overflow-x-auto gap-2 mb-5">
          {cake.servingSize.map((w, ind: number) => (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedWeight(w)}
              className={`rounded border text-sm px-2 py-1 cursor-pointer ${
                w.weight === selectedWeight.weight
                  ? "border-author"
                  : "border-gray"
              }`}
              aria-label={`Select ${w} weight`}
            >
              {w.weight} : {w.price}
            </button>
          ))}
        </div>
      </div>

      {/* Addons */}

      <div ref={addonRef} className=" w-full">
        {/* Addon Items Hover Table */}

        <AddonItems
          selectedflavors={selectedFlavours}
          setSelectedflavors={setSelectedFlavours}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          flavors={cake.flavor}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button
          label="Add To Cart"
          variant="primary"
          icon={<Plus />}
          className="px-6 py-2 bg-title text-white hover:bg-author border-none "
          onClick={() => {
            // Handle add to cart logic here
            handleAddToCart();
            console.log("Add to Cart clicked");
          }}
        />
        <Button
          label="Buy Now"
          variant="outline"
          className="px-6 py-2 bg-buy-now text-white hover:bg-author border-none"
        />
      </div>

      {/* sku */}
      <SkuDetails
        avail="In stock"
        category={cake.category}
        sku={cake.id}
        tags={flavors}
        title={cake.title}
      />
      <div>
        <Button
          onClick={() => setIsReviewModalOpen(true)}
          variant="outline"
          label="add Review"
        />

        <ReviewModal
          cake={cake}
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default ProductInfo;
