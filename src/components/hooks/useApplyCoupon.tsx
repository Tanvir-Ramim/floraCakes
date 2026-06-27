// hooks/useApplyCoupon.ts
import { Coupon } from "@/constants/couponData";
import { useState } from "react";
import { toast } from "react-toastify";

export const useApplyCoupon = (
  availableCoupons: Coupon[]
): {
  applyCoupon: (code: string) => void;
  appliedCoupon: Coupon | null;
  couponError: string;
  setAppliedCoupon: React.Dispatch<React.SetStateAction<Coupon | null>>;
} => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = (code: string) => {
    if (!code) {
      setCouponError("Please enter a coupon code");
      setAppliedCoupon(null);
      toast.error("Please enter a coupon code");
      return;
    }

    const matched = availableCoupons.find(
      (c) => c.code.toLowerCase() === code.toLowerCase()
    );

    if (!matched) {
      setCouponError("Invalid coupon code");
      setAppliedCoupon(null);
      toast.error("Invalid coupon code");
      return;
    }

    if (new Date(matched.expiresAt) < new Date()) {
      setCouponError("Coupon has expired");
      setAppliedCoupon(null);
      toast.error("Coupon has expired");
      return;
    }

    setAppliedCoupon(matched);
    setCouponError("");
    toast.success(`Coupon "${matched.code}" applied!`);
  };

  return {
    applyCoupon,
    appliedCoupon,
    couponError,
    setAppliedCoupon,
  };
};
