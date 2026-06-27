"use client";

import type React from "react";

import type { GiftCard } from "@/@types";
import { CreditCard, User } from "lucide-react";
import OrderSummary from "./order-summary";
import Button from "../ui/button/button";

interface PaymentDetailsProps {
  formData: {
    recipientName?: string;
    recipientPhone?: string;
    recipientEmail?: string;
    message: string;
    giftId: string;
    purchasedByName: string;
    purchasedByIdentify: string;
    emailOption: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectedCard?: GiftCard;

  goBack: () => void;
}

export default function PaymentDetails({
  formData,
  handleInputChange,
  selectedCard,

  goBack,
}: PaymentDetailsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-3 md:p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Payment Details
      </h2>

      <div className="grid grid-cols-1 gap-6 mb-8">
        <div>
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Card ID
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              disabled
              value={formData.giftId||""}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none "
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="cardName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name on Card
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              id="cardName"
              name="cardName"
              type="text"
              value={formData?.recipientName||formData?.purchasedByName}
              onChange={handleInputChange}
              className="pl-10 w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none "
              placeholder="John Smith"
              required
            />
          </div>
        </div>

      
      </div>

      <OrderSummary selectedCard={selectedCard} showTax={true} />

      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={goBack}
          className="border border-gray-300 cursor-pointer text-gray-700 md:px-4 px-2 py-2 rounded-md  hover:bg-gray-50 transition-colors md:text-base text-sm font-medium"
        >
          Back
        </button>
        <button
        
          type="submit"
          className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white cursor-pointer md:text-base text-sm md:px-4 px-2 py-2 rounded-md flex items-center transition-colors font-medium"
        >
          Pay Now
        </button>

      </div>
    </div>
  );
}
