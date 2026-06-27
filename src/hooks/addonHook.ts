

import addonService, {
  IAddonParams,
  IPurchaseAddonPayload,
} from "@/services/addon-service";
import {
  useMutation,
 
  useQuery,
} from "@tanstack/react-query";
import { toast } from "react-toastify";

export function useAddonHook(params: IAddonParams) {
  return useQuery({
    queryKey: ["add-on", params],
    queryFn: async () => {
      return addonService.getAddons(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddonById(id: string) {
  return useQuery({
    queryKey: ["add-on", id],
    queryFn: async () => {
      return addonService.getAddonById(id);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function usePurchaseAddon(router: object) {
  
  return useMutation({
    mutationFn: async (payload: IPurchaseAddonPayload) => {
      return await addonService.purchaseAddons(payload);
    },
    onSuccess: (response) => {
      console.log("Order submitted successfully:", response.data);
      toast.success(
        `Order submitted successfully! Order ID: ${response.data.data.orderId}`
      );
      router.push(
        `/others-product/${response.data.data.orderId}?type=addon`
      );
      return;
    },
    onError: (error: Error) => {
      toast.error(`Order failed: ${error.message}`);
    },
  });
}

// Optional: Hook for fetching purchase history
export function useAddonPurchaseHistory(customerEmail: string) {
  return useQuery({
    queryKey: ["add-on-purchases", customerEmail],
    queryFn: async () => {
      return await addonService.getPurchaseHistory(customerEmail);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!customerEmail, // Only run if email exists
  });
}

// Optional: Hook for fetching order details
export function useAddonOrderDetails(orderId: string) {
  return useQuery({
    queryKey: ["add-on-order", orderId],
    queryFn: async () => {
      return await addonService.getPurchaseDetails(orderId);
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId, // Only run if orderId exists
  });
}
