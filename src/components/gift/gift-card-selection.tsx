"use client";

import type { GiftCard } from "@/@types";
import { ChevronRight } from "lucide-react";
import GiftCardItem from "./gift-card-item";
import OrderSummary from "./order-summary";

interface GiftCardSelectionProps {
  giftCardData?: GiftCard[];
  selectedCard?: GiftCard;
  setSelectedCard: (card: GiftCard) => void;
  setStep: (step: number) => void;
}

export default function GiftCardSelection({
  giftCardData,
  selectedCard,
  setSelectedCard,
  setStep,
}: GiftCardSelectionProps) {
  return (
    <div className="bg-white rounded shadow p-3 md:p-6 space-y-8">
      <h2 className="md:text-2xl  text-xl font-bold text-gray-800">
        Choose Your Gift Card
      </h2>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {giftCardData?.map((card) => (
          <GiftCardItem
            key={card.giftId}
            card={card}
            isSelected={selectedCard?.giftId === card?.giftId}
            onClick={() => setSelectedCard(card)}
          />
        ))}
      </div>

      {/* Order Summary */}
      <OrderSummary selectedCard={selectedCard} />

      {/* Continue Button */}
         <div className="flex justify-end">
        <button
          type="button"
          disabled={!selectedCard}
          title={!selectedCard ? "Select a Card" : ""}
          onClick={() => setStep(2)}
          className="bg-black text-white rounded cursor-pointer border border-transparent
                     hover:border-gray-300 sm:text-base text-sm  flex items-center py-2 px-5 hover:bg-white hover:text-black"
        >
          Continue <ChevronRight className="ml-2 h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
