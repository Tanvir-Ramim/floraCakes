"use client";
import NotFound from "@/app/not-found";
import LoadingSpinner from "@/components/loading/LoadingSpinner";
import OrderConfirmation from "@/components/order/OrderConfirmation";
import { useOrderGetHook } from "@/hooks/orderHook";

import { useParams } from "next/navigation";

// export const dynamicParams = true;

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params?.orderId as string;

  const { data: order, isLoading, isError } = useOrderGetHook(orderId);
  console.log( order );

  if (!orderId || isError) return NotFound();
  if (isLoading) return <LoadingSpinner />;

  return <OrderConfirmation order={order} />;
}
