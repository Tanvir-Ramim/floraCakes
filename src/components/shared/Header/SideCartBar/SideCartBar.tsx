"use client";

import CheckoutSummary from "@/components/cart/CheckoutSummary";
import ShippingProgress from "@/components/cart/shipping-progress";
import { useApplyCoupon } from "@/components/hooks/useApplyCoupon";
import useOutsideClick from "@/components/hooks/useOutsideClick";
import Button from "@/components/ui/button/button";
import { availableCoupons } from "@/constants/couponData";
import { giftOptions, initialItems } from "@/constants/filterdata";
import { backdropVariants, modalVariants } from "@/constants/motion-varient";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import ActionButton from "./ActionButton";
import SideCart from "./side-cart";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface SideCartBarProps {
  onClose: () => void;
}

const SideCartBar = ({ onClose }: SideCartBarProps) => {
  const cartRef = useRef<HTMLDivElement | null>(null);
  const [items] = useState(initialItems);
  const [selectedGiftIds, setSelectedGiftIds] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const cartItems = useSelector((state: RootState) => state.wish.items);
  useOutsideClick(cartRef, onClose);
  const {
    applyCoupon, // your reusable function
    appliedCoupon,
  } = useApplyCoupon(availableCoupons);

  const couponName = appliedCoupon?.code || "";

  console.log({ note, couponName, appliedCoupon });

  const handleSaveNote = (noteText: string) => {
    setNote(noteText);
  };

  const handleGiftCheckboxChange = (giftId: string) => {
    const updatedSelection = selectedGiftIds.includes(giftId)
      ? selectedGiftIds.filter((id) => id !== giftId)
      : [...selectedGiftIds, giftId];

    setSelectedGiftIds(updatedSelection);
  };
  const giftTotal = giftOptions
    .filter((gift) => selectedGiftIds.includes(gift.id))
    .reduce((sum, gift) => sum + gift.price, 0);

  const subtotal =
    items.reduce((acc, item) => acc + item.price * item.quantity, 0) +
    giftTotal;
  const discount =
    appliedCoupon && new Date(appliedCoupon?.expiresAt) > new Date()
      ? (subtotal * appliedCoupon?.discountPercentage) / 100
      : 0;
  const totalPrice = Math.max(subtotal - discount, 0);
  const shippingCost = totalPrice >= 500 ? 0 : 120;
  return (
<motion.div
  variants={backdropVariants}
  initial="hidden"
  animate="visible"
  exit="exit"
  className="fixed inset-0 bg-[#262626]/20 z-40 h-full w-full flex items-center justify-center"
>
  <motion.div
    variants={modalVariants}
    ref={cartRef}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="
      bg-white
      lg:w-2/6 md:w-3/5 w-4/5
      h-full
      absolute top-0 right-0
      shadow-lg
      flex flex-col
      overflow-y-auto
    "
  >
    {/* Header */}
    <div className="sm:px-6 px-2 py-3 flex items-center justify-between text-xl shadow-md text-title shrink-0">
      <h2 className="text-lg font-medium">Your cart</h2>

      <FaXmark
        onClick={onClose}
        className="cursor-pointer text-title"
      />
    </div>

    {/* Shipping Progress */}
    <div className="sm:px-6 sm:h-88 px-2 bg-[#F8F9FA] shrink-0">
      <ShippingProgress />
    </div>


    {/* Bottom section */}
    <div className=" sm:px-6 px-2 pb-5 w-full z-10 bg-white ">
      <div className="py-5">
        <ActionButton
          onSaveNote={handleSaveNote}
          onApplyCoupon={applyCoupon}
          onGiftChange={handleGiftCheckboxChange}
          giftOptions={giftOptions}
          selectedGiftIds={selectedGiftIds}
        />
      </div>

      <CheckoutSummary
        subtotal={subtotal}
        shippingCost={shippingCost}
        discount={discount}
      />

      <div className="mt-4 flex items-center gap-2">
        <Link href="/cart" className="w-full">
          <Button
            onClick={onClose}
            label="More Cart"
            variant="primary"
          >
            View Cart
          </Button>
        </Link>

        <Link href="/checkout" className="w-full">
          <Button
            onClick={onClose}
            label="Check Outs"
            variant="secondary"
          />
        </Link>
      </div>
    </div>
  </motion.div>
</motion.div>
  );
};

export default SideCartBar;
