"use client";

import type { GiftCard } from "@/@types";

interface OrderSummaryProps {
  selectedCard?: GiftCard;
  showTax?: boolean;
}

export default function OrderSummary({
  selectedCard,
  showTax = false,
}: OrderSummaryProps) {
  if (!selectedCard) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center text-gray-600 text-sm">
        Select a gift card to see details
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 space-y-4">
      <h3 className="font-semibold text-gray-800 text-sm uppercase tracking-wide">
        Order Summary
      </h3>

      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{selectedCard.title}</span>
        <span className="text-gray-900 font-medium">৳ {selectedCard.amount}</span>
      </div>

      {showTax && (
        <div className="flex justify-between text-sm border-t border-gray-300 pt-2">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900 font-medium">৳ 0.00</span>
        </div>
      )}

      <div className="flex justify-between border-t border-gray-300 pt-3 text-base font-semibold">
        <span className="text-gray-800">Total</span>
        <span className="text-gray-900">৳ {selectedCard.amount}</span>
      </div>
    </div>
  );
}
