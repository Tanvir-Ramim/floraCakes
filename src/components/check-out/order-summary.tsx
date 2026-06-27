"use client";

import CheckoutSummary from "../cart/CheckoutSummary";
import ShippingProgress from "../cart/shipping-progress";

export default function OrderSummary() {
 



  return (
    <div className=" p-4  rounded-lg">
      <div className="space-y-4">
        <ShippingProgress />

  


        <div className="pt-4 border-t border-border-color space-y-2  text-sm">
          <div className="mt-6">
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
