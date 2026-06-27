import cakeService from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addUserDuringOrder } from "@/store/features/userSlice";
import { removeFromCart } from "@/store/features/cartSlice";

// Define proper TypeScript interfaces

export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  details: (id: string) => [...orderKeys.all, "detail", id] as const,
};

export const useOrderHook = (router: object) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (orderData: FormData) => cakeService.createOrder(orderData),
    onSuccess: (data) => {
      // Invalidate both lists and the specific order detail
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: orderKeys.details(data.orderId),
      });

      toast.success("Order created successfully!");
      console.log("order-data", data);
      dispatch(addUserDuringOrder(data.customer));
      dispatch(removeFromCart(data.order.cakeInfo.id));
      router.push(`/order/confirmation/${data.order.orderId}`);
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const errorMessage =
        error.response?.data?.message || "Failed to create order";
      toast.error(errorMessage);
    },
    // Optional: Reset form after successful submission
    onSettled: () => {
      // You could add any cleanup logic here
    },
  });
};

export const useOrderGetHook = (orderId: string) => {
  return useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const response = await cakeService.getOrderById(orderId);
      return response;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!orderId,
  });
};
