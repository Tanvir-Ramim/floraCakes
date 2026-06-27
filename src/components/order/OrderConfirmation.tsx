"use client";

import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/container/Container";
import {
  CheckCircle,
  Clock,
  ShieldCheck,
  Truck,
  Cake,
  Gift,
  MessageSquare,
  Info,
  CreditCard,
  MapPin,
  User,
} from "lucide-react";

type OrderData = {
  customerInfo: {
    email: string;
    name: string;
    phone: string;
    street: string;
    city: string;
    zip: string;
  };
  orderId: string;
  orderDate: string;
  cakeInfo: {
    images: { url: string; alt: string }[];
    name: string;
    flavor: { name: string; price: number };
    servingSize: string;
    sizePrice: number;
    message?: string;
    note?: string;
  };
  addOn?: Array<{ name: string; price: number }>;
  discountAmount: number;
  couponAmount: number;
  shipping: {
    area: string;
    cost: number;
  };
  paymentInfo: {
    orderAmount: number;
  };
  deliveryInfo: {
    deliveryDate: string;
    deliveryTime: string;
    deliveryAddress: {
      street: string;
      city: string;
      zip: string;
    };
    deliveryNotes?: string;
  };
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
};

type Props = {
  order: OrderData;
};

export default function OrderConfirmation({ order }: Props) {
  return (
    <Container>
      <div className="mt-10 lg:mt-20">
        {/* Confirmation Header */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-5">
            <CheckCircle className="mx-auto text-gray-900 text-5xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Order Confirmed
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Thank you for your order, {order.customerInfo.name.split(" ")[0]}.
            We've sent a confirmation to{" "}
            <span className="font-medium text-gray-900">
              {order.customerInfo.email}
            </span>
          </p>

          <div className="mt-5 bg-gray-50 p-4 rounded-lg inline-block border border-gray-200">
            <p className="font-medium text-gray-900">
              Order #<span className="font-semibold">{order.orderId}</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(order.orderDate), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <Cake className="text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Your Cake
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-5 mb-5">
                <div className="relative w-full sm:w-32 h-32 rounded-md overflow-hidden border border-gray-200">
                  <Image
                    src={order?.cakeInfo?.images[0].url}
                    alt={order?.cakeInfo?.images[0].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 128px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900">
                    {order.cakeInfo.name}
                  </h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="text-gray-500">Flavor:</span>{" "}
                      {order.cakeInfo.flavor.name}
                    </p>
                    <p>
                      <span className="text-gray-500">Size:</span>{" "}
                      {order.cakeInfo.servingSize} kg
                    </p>
                    <p className="mt-2 font-medium text-gray-900">
                      {order.cakeInfo.sizePrice} BDT
                    </p>
                  </div>
                </div>
              </div>

              {order.cakeInfo.message && (
                <div className="mb-5 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex items-center gap-2 mb-1 text-gray-700">
                    <MessageSquare size={16} />
                    <h4 className="text-sm font-medium">Message on Cake</h4>
                  </div>
                  <p className="text-sm text-gray-700 italic">
                    "{order.cakeInfo.message}"
                  </p>
                </div>
              )}

              {order.cakeInfo.note && (
                <div className="mb-5 p-3 bg-gray-50 rounded-md border border-gray-200">
                  <div className="flex items-center gap-2 mb-1 text-gray-700">
                    <Info size={16} />
                    <h4 className="text-sm font-medium">
                      Special Instructions
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700">{order.cakeInfo.note}</p>
                </div>
              )}

              {/* Order Details */}
              <div className="border-t border-gray-200 pt-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Order Details
                </h3>

                <div className="space-y-2 text-sm">
                  {order.addOn?.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">
                        Add-ons:
                      </h4>
                      {order.addOn.map((addon, idx) => (
                        <div key={idx} className="flex justify-between pl-3">
                          <span className="text-gray-600">{addon.name}</span>
                          <span className="font-medium">{addon.price} BDT</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {order?.shipping.cost > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {order.shipping.cost} BDT
                      </span>
                    </div>
                  )}

                  {order.discountAmount > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Discount ({order.discountAmount}%)</span>
                      <span>
                        -
                        {(order.cakeInfo.sizePrice * order.discountAmount) /
                          100}{" "}
                        BDT
                      </span>
                    </div>
                  )}

                  {order.couponAmount > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Coupon Discount</span>
                      <span>-{order.couponAmount} BDT</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between font-semibold text-gray-900">
                  <span>Total Amount:</span>
                  <span>{order.paymentInfo.orderAmount} BDT</span>
                </div>
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-5">
                <Truck className="text-gray-700" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Status
                </h2>
              </div>

              <div className="relative pl-8">
                {/* Timeline */}
                <div className="absolute left-4 top-0 h-full w-px bg-gray-200"></div>

                {/* Step 1 */}
                <div className="relative pb-5">
                  <div className="absolute  top-0 w-6 h-6 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <ShieldCheck className="text-gray-700" size={14} />
                  </div>
                  <h3 className="text-base pl-8 font-medium text-gray-900">
                    Order Confirmed
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    We've received your order
                  </p>
                  <div className="text-xs text-gray-500 mt-1">
                    {format(new Date(order.orderDate), "MMM d, h:mm a")}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative pb-5">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <Clock className="text-gray-700" size={14} />
                  </div>
                  <h3 className="text-base pl-8 font-medium text-gray-900">
                    In Progress
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Preparing your {order.cakeInfo.name}
                  </p>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center">
                    <Truck className="text-gray-700" size={14} />
                  </div>
                  <h3 className="text-base pl-8 font-medium text-gray-900">
                    Delivery
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {format(
                      new Date(order.deliveryInfo.deliveryDate),
                      "MMMM d"
                    )}
                    , {order.deliveryInfo.deliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Information */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <User className="text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Customer
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="space-y-3.5 flex md:flex-row flex-col justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.customerInfo.name}
                    </p>
                    <p>{order.customerInfo.email}</p>
                  </div>
                  <div className="text-left">
                    <p className="text-gray-500">Phone</p>
                    <p>{order.customerInfo.phone}</p>
                  </div>
                </div>
                <div></div>
                <div>
                  {" "}
                  <p className="text-gray-500">Address</p>
                  <p>
                    {order.customerInfo.street} , {order.customerInfo.city},{" "}
                    {order.customerInfo.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">
                  Delivery
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="space-y-3.5 flex md:flex-row flex-col justify-between">
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {format(
                        new Date(order.deliveryInfo.deliveryDate),
                        "MMMM d"
                      )}
                      , {order.deliveryInfo.deliveryTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p>{order.deliveryInfo.deliveryAddress.street}</p>
                    <p>
                      {order.deliveryInfo.deliveryAddress.city},{" "}
                      {order.deliveryInfo.deliveryAddress.zip}
                    </p>
                  </div>
                </div>
                {order.deliveryInfo.deliveryNotes && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-gray-500">Delivery Notes</p>
                    <p>{order.deliveryInfo.deliveryNotes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      order.paymentStatus === "Paid"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Order Status</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      order.orderStatus === "Completed"
                        ? "bg-gray-100 text-gray-900"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Support Card */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Need Help?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our customer support for any questions about your order.
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href="mailto:support@example.com"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <MessageSquare size={14} />
                  support@example.com
                </a>
                <a
                  href="tel:+880XXXXXXXXXX"
                  className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
                >
                  <CreditCard size={14} />
                  +880 XXXX XXXXX
                </a>
              </div>

              <Link
                href="/cakes"
                className="block w-full mt-5 bg-gray-900 text-white text-center py-2.5 rounded-md font-medium hover:bg-gray-800"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
