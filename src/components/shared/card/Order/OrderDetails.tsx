import { OrderTypeA } from "@/@types";
import Button from "@/components/ui/button/button";
import Link from "next/link";
import { FC } from "react";

import { Clock, Package, Truck } from "lucide-react";
import { format } from "date-fns";

interface OrderDetailsProps {
  onReorder: () => void;
}

const OrderDetailsA: FC<OrderDetailsProps> = ({ order, onReorder }) => {
  // Calculate estimated delivery date (add 3-5 days to order date)
  const estimatedDeliveryDate = new Date(order?.orderDate);
  estimatedDeliveryDate.setDate(
    estimatedDeliveryDate.getDate() + Math.floor(Math.random() * 3) + 3
  );

  return (
    <div className="border-t border-border-color p-4 bg-white space-y-4">
      {/* Order Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h3 className="font-medium text-lg">Order Summary</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>
              Order placed: {format(new Date(order?.orderDate), "MMM dd, yyyy")}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="h-4 w-4" />
            <span>Order #: {order?.orderId}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="h-4 w-4" />
            <span>
              Estimated delivery:{" "}
              {format(estimatedDeliveryDate, "MMM dd, yyyy")}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-lg">Delivery Address</h3>
          <p className="text-sm text-gray-600">
            {order?.deliveryInfo?.deliveryAddress?.street}
            <br />
            {order?.deliveryInfo?.deliveryAddress?.city}
            <br />
            {order?.deliveryInfo?.deliveryAddress?.zip}
          </p>
        </div>
      </div>

      {/* Order Total Section */}
      <div className="space-y-2 pt-2 border-t border-border-color">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {order?.cakeInfo?.servingSize}= ${order?.cakeInfo?.sizePrice}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Falvor</span>
          <span>${order?.cakeInfo?.flavor?.price || "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Add-on</span>
          <span>${order?.addonPrice || "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${order?.deliveryFee || "0.00"}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$ 0.00</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total</span>
          <span>${order?.paymentInfo.orderAmount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href={`/order/confirmation/${order?.orderId}`} className="flex-1">
          <Button
            label="Track Order"
            className="w-full"
            icon={<Truck className="h-4 w-4" />}
          />
        </Link>

        <Link href={`/cakes/${order?.cakeInfo?.id}`} className="flex-1">
          <Button
            label="Reorder"
            variant="outline"
            className="w-full flex-1"
            onClick={onReorder}
            icon={<Package className="h-4 w-4" />}
          />
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailsA;
