"use client";

import { availableCoupons } from "@/constants/couponData";
import { initialItems } from "@/constants/filterdata";
import CouponCode from "../cart/CouponCode";
import { useApplyCoupon } from "../hooks/useApplyCoupon";
import CheckCard from "../shared/card/checkCard";

export default function OrderDetails() {
  const {
    applyCoupon, // your reusable function
    appliedCoupon,
    couponError,
  } = useApplyCoupon(availableCoupons);
  const subtotal = 125.0;
  const shipping = 20.0;
  const total = subtotal + shipping;

  return (
    <div className=" p-4 shadow-md rounded-lg">
      <div className="space-y-4">
        {initialItems.map((item) => (
          <CheckCard key={item.id} item={item} />
        ))}
        <div className="pt-4 border-t border-border-color">
          {" "}
          <CouponCode
            onApply={applyCoupon}
            error={couponError}
            appliedCoupon={appliedCoupon}
          />
        </div>

        <div className="pt-4 border-t border-border-color space-y-2  text-sm">
          <div className="flex justify-between">
            <p className="text-sm">
              Subtotal: <span className="text-xs text-gray-500">2 items</span>
            </p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center  text-sm">
            <div className="flex items-center gap-1">
              <p className="text-sm">Shipping</p>
              <span className="inline-block w-4 h-4 rounded-full border border-border-color text-xs text-center">
                ?
              </span>
            </div>
            <p>${shipping.toFixed(2)}</p>
          </div>

          <div className="flex justify-between font-medium pt-2 border-t border-border-color  text-sm">
            <p className="text-sm">Total</p>
            <p className="text-right">
              <span className="text-xs text-gray-500 block">USD</span>$
              {total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
