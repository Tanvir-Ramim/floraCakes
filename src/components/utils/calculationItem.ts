"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";


export interface ICalculatedPrices {
  regularPrice: number;
  priceWithDiscount: number;
  flavorPrice: number;
  addonsTotal: number;
  deliveryCharge: number;
  couponDiscount: number;
  sumPrice: number;
  finalPrice: number;
}

export const useCalculatedItem = (): ICalculatedPrices | null => {
  const items = useSelector((state: RootState) => state.cart.items);
  const selectedItem = items.find((item) => item.isSelected);

  if (!selectedItem) return null;

  // Base cake prices
  const regularPrice = selectedItem.priceRegular * selectedItem.quantity;
  const priceWithDiscount = selectedItem.priceWithDiscount * selectedItem.quantity;
  
  // Flavor and addons
  const flavorPrice = selectedItem.flavor?.price ? selectedItem.flavor.price * selectedItem.quantity : 0;
  const addonsTotal = selectedItem.addons?.reduce((sum, addon) => sum + (addon.price * selectedItem.quantity), 0) || 0;
  
  // Delivery
  const deliveryCharge = selectedItem.shipping?.cost || 0;
  
  // Sum before coupon
  const sumPrice = priceWithDiscount + flavorPrice + addonsTotal + deliveryCharge;
  
  // Coupon discount (percentage based)
  const couponDiscount = selectedItem.coupon?.discount 
    ? (sumPrice * selectedItem.coupon.discount) / 100 
    : 0;
  
  // Final price after all discounts
  const finalPrice = sumPrice - couponDiscount;

  return {
    regularPrice,
    priceWithDiscount,
    flavorPrice,
    addonsTotal,
    deliveryCharge,
    couponDiscount,
    sumPrice,
    finalPrice
  };
};