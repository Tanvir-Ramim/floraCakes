import { applyCoupon } from "@/services/coupon.service";
import { addCoupon } from "@/store/features/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

export function useCoupon(code: string, enabled: boolean) {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["coupon", code],
    queryFn: async () => {
      const response = await applyCoupon(code);
      // Dispatch to Redux only after successful API call

      console.log("cop",response.data.coupon)
      if (response.data?.coupon) {
        dispatch(addCoupon({
          code: response.data.coupon.code,
          discount: response.data.coupon.discount
        }));
      }
      return response;
    },
    enabled: enabled && !!code.trim(),
    retry: false,
    staleTime: 1000 * 60 * 5, 
  });
}