import { useState, useEffect } from "react";

interface DeliveryPaymentFormProps {
  deliveryOption: "delivery" | "pickup";
  paymentMethod: "cod" | "online";
  onDeliveryChange: (option: "delivery" | "pickup") => void;
  onPaymentChange: (method: "cod" | "online") => void;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function DeliveryPaymentForm({
  deliveryOption,
  paymentMethod,
  onDeliveryChange,
  onPaymentChange,
  onBack,
  onNext,
}: DeliveryPaymentFormProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <div
      className={`max-w-2xl mx-auto mt-8 transition-all duration-300 ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Delivery & Payment
      </h2>

      <div className="space-y-8">
        {/* Delivery Options */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Delivery Option
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => onDeliveryChange("delivery")}
              className={`p-4 border-2 rounded-lg transition-all ${
                deliveryOption === "delivery"
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryOption === "delivery"
                      ? "border-black bg-black"
                      : "border-gray-300"
                  }`}
                >
                  {deliveryOption === "delivery" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium">Home Delivery</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Get your order delivered to your address
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onDeliveryChange("pickup")}
              className={`p-4 border-2 rounded-lg transition-all ${
                deliveryOption === "pickup"
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    deliveryOption === "pickup"
                      ? "border-black bg-black"
                      : "border-gray-300"
                  }`}
                >
                  {deliveryOption === "pickup" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium">Store Pickup</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pick up your order from our store
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Payment Method
          </h3>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => onPaymentChange("cod")}
              className={`w-full p-4 border-2 rounded-lg transition-all ${
                paymentMethod === "cod"
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "cod"
                      ? "border-black bg-black"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "cod" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay when you receive your order
                  </p>
                </div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => onPaymentChange("online")}
              className={`w-full p-4 border-2 rounded-lg transition-all ${
                paymentMethod === "online"
                  ? "border-black bg-gray-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === "online"
                      ? "border-black bg-black"
                      : "border-gray-300"
                  }`}
                >
                  {paymentMethod === "online" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="text-left">
                  <p className="font-medium">Online Payment</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Pay securely with your card or mobile money
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-between md:pt-6 pt-1.5">
          <button
            type="button"
            onClick={onBack}
            className="md:px-6 px-3 py-2.5 cursor-pointer  rounded-sm md:text-base text-xs border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={onNext}
            className="md:px-6 cursor-pointer px-3 py-2.5 rounded-sm md:text-base text-xs bg-black hover:bg-gray-800 text-white font-medium transition-colors"
          >
            Continue to Review
          </button>
        </div>
      </div>
    </div>
  );
}
