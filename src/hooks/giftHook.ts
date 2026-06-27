import { FormData } from "@/app/(brc)/gift/page";
import giftService from "@/services/gift.service";
import {
  useMutation,
  UseMutationResult,
  useQuery,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useFetchGiftCard() {
  return useQuery({
    queryKey: ["filtered-giftCard"],
    queryFn: () => giftService.fetchGiftCard(),
    staleTime: 1000 * 60 * 5,
  });
}

export function useGiftHook() {}
export function useGiftPurchase(): UseMutationResult<
  void,
  Error,
  FormData,
  unknown
> {
  return useMutation({
    mutationFn: async (giftData: FormData) => {
      try {
        await giftService.purchaseGift(giftData);
      } catch (error) {
        throw new Error(
          error instanceof Error
            ? error.message
            : "Failed to purchase gift card"
        );
      }
    },
    onSuccess: () => {
      // toast.success("Gift card purchased successfully");
    },
    onError: (error: Error) => {
      // toast.error("Purchase error:", error.message);
    },
  });
}
