"use client";

import { useCalculatedItem } from "../utils/calculationItem";

export const PriceBreakdown = () => {
  const prices = useCalculatedItem();

  if (!prices) return <div>No item selected</div>;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Regular Price:</span>
        <span>{prices.regularPrice.toFixed(2)} BDT</span>
      </div>
      <div className="flex justify-between text-green-600">
        <span>Product Discount:</span>
        <span>
          -{(prices.regularPrice - prices.priceWithDiscount).toFixed(2)} BDT
        </span>
      </div>
      <div className="flex justify-between">
        <span>Flavor:</span>
        <span>+{prices.flavorPrice.toFixed(2)} BDT</span>
      </div>
      <div className="flex justify-between">
        <span>Addons:</span>
        <span>+{prices.addonsTotal.toFixed(2)} BDT</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery:</span>
        <span>+{prices.deliveryCharge.toFixed(2)} BDT</span>
      </div>
      <div className="border-t border-gray-200 pt-2">
        <div className="flex justify-between font-medium">
          <span>Subtotal:</span>
          <span>{prices.sumPrice.toFixed(2)} BDT</span>
        </div>
      </div>
      {prices.couponDiscount > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Coupon Discount:</span>
          <span>-{prices.couponDiscount.toFixed(2)} BDT</span>
        </div>
      )}
      <div className="border-t border-gray-200 pt-2">
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>{prices.finalPrice.toFixed(2)} BDT</span>
        </div>
      </div>
    </div>
  );
};
