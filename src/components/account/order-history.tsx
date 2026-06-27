
"use client";

import { Search, ShoppingBag } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import OrderCard from "../shared/card/Order/OrderCard";
import { Card, CardContent } from "../ui/card/card";
import Input from "../ui/input/Input";
import { useCustomerInfo } from "../utils/selectedItem";
import apiClient from "@/services/api-client";
import type { OrderTypeA } from "@/@types";

export default function OrderHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderTypeA[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useCustomerInfo();

  const fetchOrders = useCallback(async () => {
    if (!user?.customerId) return;
    
    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `/orders/filter?customerInfo.customerId=${user?.customerId}&sort=-orderDate`
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [user?.customerId]);

  const filteredOrders = useMemo(() => 
    orders.filter(order => 
      order?.orderId.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [orders, searchTerm]
  );

  const handleToggleOrder = useCallback((orderId: string) => 
    setExpandedOrder(prev => prev === orderId ? null : orderId),
    []
  );

  const handleReorder = useCallback((orderId: string) => {
    // Implement actual reorder logic here
    console.log("Reordering:", orderId);
    toast.success("Items added to cart!");
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders..."
            name="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <p className="text-gray-500">
              {searchTerm 
                ? `No orders found matching "${searchTerm}"`
                : "You haven't placed any orders yet"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              expanded={expandedOrder === order.orderId}
              toggleExpand={() => handleToggleOrder(order.orderId)}
              onReorder={() => handleReorder(order.orderId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}