import { IAddonProduct } from "@/@types";
import { ICus } from "@/app/(brc)/others-product/page";
import { useEffect, useState } from "react";

interface OrderSummaryProps {
  products: IAddonProduct[];
  formData: ICus;
  deliveryOption: "delivery" | "pickup";
  paymentMethod: "cod" | "online";
  onBack: () => void;
  onSubmit: () => void;
}

export default function OrderSummary({
  products,
  formData,
  deliveryOption,
  paymentMethod,
  onBack,
  onSubmit,
}: OrderSummaryProps) {
  const [isMounted, setIsMounted] = useState(false);
  const subtotal = products.reduce(
    (sum, product) => sum + product.price * (product.quantity || 1),
    0
  );
  const deliveryFee = formData.deliveryCharge || 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div
      className={`max-w-4xl mx-auto mt-8 transition-all duration-300 ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

      <div className="lg:flex gap-6">
        {/* Left Column - Products and Info */}
        <div className="lg:w-2/3 space-y-4">
          {/* Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Your Order ({products.length})
            </h3>
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex md:flex-row flex-col md:justify-between md:items-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 rounded-lg bg-gray-100 overflow-hidden">
                      <img
                        src={product.image?.url}
                        alt={product.name}
                        className="absolute h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        {product.quantity || 1} × ৳{product.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium md:mt-0 mt-3">
                    ৳{(product.price * (product.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & Delivery Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Customer Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{formData.phone}</p>
              </div>
              {formData.email && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
              )}
              {deliveryOption === "delivery" && (
                <>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Delivery Address</p>
                    <p className="font-medium">{formData.address}</p>
                  </div>
                  {formData.area && (
                    <div>
                      <p className="text-sm text-gray-500">Delivery Area</p>
                      <p className="font-medium">{formData.area}</p>
                    </div>
                  )}
                </>
              )}
              {formData.note && (
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500">Additional Notes</p>
                  <p className="font-medium">{formData.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:w-1/3 space-y-4 md:mt-0 mt-4">
          {/* Order Total */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              Order Total
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery</span>
                <span>৳{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-100 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Payment */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8 2a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              </svg>
              Delivery & Payment
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Delivery Method</p>
                <p className="font-medium mt-1 flex items-center gap-2">
                  {deliveryOption === "delivery" ? (
                    <>
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
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                      Home Delivery
                    </>
                  ) : (
                    <>
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
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      Store Pickup
                    </>
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Method</p>
                <p className="font-medium mt-1 flex items-center gap-2">
                  {paymentMethod === "cod" ? (
                    <>
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
                      >
                        <rect width="20" height="12" x="2" y="6" rx="2" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M6 12h.01M18 12h.01" />
                      </svg>
                      Cash on Delivery
                    </>
                  ) : (
                    <>
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
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                      Online Payment
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex  justify-between gap-4 mt-8">
        <button
          onClick={onBack}
          className="md:px-6 px-3 py-2.5 cursor-pointer  rounded-sm md:text-base text-xs border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors shadow-sm hover:shadow-md flex items-center justify-center gap-2"
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
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back
        </button>
        <button
          onClick={onSubmit}
          className="md:px-6 cursor-pointer px-3 py-2.5 rounded-sm md:text-base text-xs bg-black hover:bg-gray-800 text-white font-medium transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
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
          >
            <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" />
            <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" />
          </svg>
          Confirm Order
        </button>
      </div>
    </div>
  );
}
