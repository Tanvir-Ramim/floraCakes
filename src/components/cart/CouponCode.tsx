import { useState, FormEvent } from "react";
import Button from "../ui/button/button";
import { useCoupon } from "@/hooks/couponHook";
import { useDebounce } from 'use-debounce';
export default function Coupon() {
  const [coupon, setCoupon] = useState("");
  const [shouldValidate, setShouldValidate] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [value]=useDebounce(coupon,200)

  const { data, isLoading, isError, error } = useCoupon(value, shouldValidate);
  const couponData = data?.data.coupon;
  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setShouldValidate(!!coupon.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
    if (isError) setShouldValidate(false);
  };

  return (
    <div className="my-5">
      <form onSubmit={handleApplyCoupon}>
        <div className="grid grid-cols-3 gap-2 mb-2">
          <input
            type="text"
            placeholder="Coupon code"
            value={coupon}
            onChange={handleInputChange}
            disabled={isLoading}
            className="w-full col-span-2 text-primary rounded bg-white
              focus:outline-none border border-border-color p-2
              disabled:opacity-50"
          />
          <Button
            type="submit"
            label={isLoading ? "Applying..." : "Apply"}
            variant="outline"
            disabled={isLoading || !coupon.trim()}
            className="bg-transparent border border-border-color
              text-primary w-20 disabled:opacity-50"
          />
        </div>
      </form>

      {couponData && (
        <div className="text-green-600 text-sm mt-2">
          <p>
            Applied Coupon: <strong>{couponData.code}</strong> (
            {couponData.discount}% off)
          </p>
          {couponData.expiresAt && (
            <p className="text-xs text-green-500">
              Expires: {new Date(couponData.expiresAt).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-sm mt-2">
          {error instanceof Error ? error.message : "Invalid coupon code"}
        </p>
      )}

      {isSubmitted && !coupon.trim() && (
        <p className="text-yellow-500 text-sm mt-2">
          Please enter a coupon code
        </p>
      )}
    </div>
  );
}
