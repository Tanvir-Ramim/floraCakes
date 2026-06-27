"use client";

import type { GiftCard } from "@/@types";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

interface GiftCardItemProps {
  card: GiftCard;
  isSelected: boolean;
  onClick: () => void;
}

export default function GiftCardItem({
  card,
  isSelected,
  onClick,
}: GiftCardItemProps) {
  return (
 <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`relative cursor-pointer rounded-lg overflow-hidden
        transition-all duration-300 
        ${isSelected 
          ? "shadow-xl border border-blue-600" 
          : "shadow-md border border-gray-200 hover:shadow-lg hover:border-gray-400"
        }`}
    >
      {/* Right-side selected indicator */}
      {isSelected && (
        <div className="absolute top-0 right-0 h-full w-10 bg-blue-600 flex items-center justify-center">
          <CheckCircle2 className="text-white w-6 h-6" />
        </div>
      )}

      {/* Image with overlay */}
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={card.image.url || "/placeholder.svg"}
          alt={card.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-5">
          <h3 className="text-white font-semibold text-lg truncate drop-shadow-md">
            {card.title}
          </h3>
          <p className="text-gray-200 text-sm mt-1 font-medium drop-shadow-sm">
            ৳ {card.amount}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
