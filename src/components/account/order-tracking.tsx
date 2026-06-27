"use client";

import {
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Loader2,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../ui/button/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card/card";
import Input from "../ui/input/Input";

interface TrackingItem {
  name: string;
  quantity: number;
}

interface TrackingTimelineEvent {
  status: string;
  date: string;
  time: string;
  description: string;
}

interface TrackingOrder {
  orderId: string;
  orderDate: string;
  estimatedDelivery: string;
  deliveryAddress: string;
  status: string;
  currentStep: number;
  items: TrackingItem[];
  timeline: TrackingTimelineEvent[];
}

// Sample tracking data
const trackingData: Record<string, TrackingOrder> = {
  "ORD-2023-1001": {
    orderId: "ORD-2023-1001",
    orderDate: "May 15, 2023",
    estimatedDelivery: "May 16, 2023",
    deliveryAddress: "123 Main St, Gulshan, Dhaka",
    status: "Delivered",
    currentStep: 4,
    items: [
      { name: "Chocolate Birthday Cake", quantity: 1 },
      { name: "Gift Wrapping", quantity: 1 },
      { name: "Candles Set", quantity: 1 },
    ],
    timeline: [
      {
        status: "Order Placed",
        date: "May 15, 2023",
        time: "10:30 AM",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Preparation Started",
        date: "May 15, 2023",
        time: "12:45 PM",
        description: "Our bakers have started preparing your cake.",
      },
      {
        status: "Out for Delivery",
        date: "May 16, 2023",
        time: "09:15 AM",
        description: "Your cake is on the way to your location.",
      },
      {
        status: "Delivered",
        date: "May 16, 2023",
        time: "11:20 AM",
        description: "Your order has been delivered successfully.",
      },
    ],
  },
  "ORD-2023-0892": {
    orderId: "ORD-2023-0892",
    orderDate: "April 22, 2023",
    estimatedDelivery: "April 23, 2023",
    deliveryAddress: "456 Park Ave, Banani, Dhaka",
    status: "Delivered",
    currentStep: 4,
    items: [{ name: "Vanilla Cupcakes (12 pcs)", quantity: 1 }],
    timeline: [
      {
        status: "Order Placed",
        date: "April 22, 2023",
        time: "02:15 PM",
        description: "Your order has been received and is being processed.",
      },
      {
        status: "Preparation Started",
        date: "April 22, 2023",
        time: "03:30 PM",
        description: "Our bakers have started preparing your cupcakes.",
      },
      {
        status: "Out for Delivery",
        date: "April 23, 2023",
        time: "10:00 AM",
        description: "Your cupcakes are on the way to your location.",
      },
      {
        status: "Delivered",
        date: "April 23, 2023",
        time: "11:45 AM",
        description: "Your order has been delivered successfully.",
      },
    ],
  },
};

export default function OrderTracking() {
  const searchParams = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [activeOrder, setActiveOrder] = useState<TrackingOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const orderId = searchParams?.get("orderId");
    if (orderId && trackingData[orderId as keyof typeof trackingData]) {
      setActiveOrder(trackingData[orderId as keyof typeof trackingData]);
      setOrderIdInput(orderId);
    }
  }, [searchParams]);

  const handleTrackOrder = async () => {
    if (!orderIdInput) {
      toast.error("Please enter an order ID", {
        position: "bottom-right",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (trackingData[orderIdInput as keyof typeof trackingData]) {
        setActiveOrder(trackingData[orderIdInput as keyof typeof trackingData]);
      } else {
        setActiveOrder(null);
        toast.error(
          "Order not found. Please check the order ID and try again.",
          {
            position: "bottom-right",
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to track order. Please try again.", {
        position: "bottom-right",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (index: number, currentStep: number) => {
    if (index < currentStep) {
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    } else if (index === currentStep) {
      return <Clock className="h-6 w-6 text-blue-500" />;
    } else {
      return <div className="h-6 w-6 rounded-full border-2 border-gray-300" />;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Order Tracking</h2>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Track Your Order</CardTitle>
          <CardDescription>
            Enter your order ID to see the latest status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-between sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-[70%] transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                label="orderId"
                name="orderId"
                placeholder="e.g., ORD-2023-1001"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={handleTrackOrder} disabled={isLoading} label={isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Tracking...
                </>
              ) : (
                "Track Order"
              )} className="w-40 h-10 mt-5 " variant="outline"/>
          
        
           
          </div>
        </CardContent>
      </Card>

      {activeOrder && (
        <Card>
          <CardHeader className="bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between">
              <div>
                <CardTitle>Order #{activeOrder.orderId}</CardTitle>
                <CardDescription>
                  Placed on {activeOrder.orderDate}
                </CardDescription>
              </div>
              <div className="mt-2 sm:mt-0">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    activeOrder.status === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {activeOrder.status}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>
                    Estimated Delivery: {activeOrder.estimatedDelivery}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm text-gray-500">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                  <span>Delivery Address: {activeOrder.deliveryAddress}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">Order Items:</h4>
                <ul className="space-y-1">
                  {activeOrder.items.map((item: TrackingItem, index: number) => (
                    <li key={index} className="text-sm">
                      {item.quantity} × {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-medium mb-4">Tracking Timeline</h4>

              <div className="relative">
                {/* Vertical line connecting timeline points */}
                <div className="absolute left-3 top-1 bottom-1 w-0.5 bg-gray-200"></div>

                {/* Timeline events */}
                <div className="space-y-6">
                  {activeOrder.timeline.map((event: TrackingTimelineEvent, index: number) => (
                    <div key={index} className="flex gap-4">
                      <div className="relative z-10">
                        {getStatusIcon(index, activeOrder.currentStep)}
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <h5 className="font-medium">{event.status}</h5>
                          <span className="text-sm text-gray-500">
                            {event.date}, {event.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button className="flex items-center gap-2">
                <ShoppingBag size={16} />
                View Order Details
                <ChevronRight size={16} />
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {!activeOrder && orderIdInput && !isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <Package className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">Order Not Found</h3>
            <p className="text-gray-500 mt-1">
              We couldn&apos;t find an order with ID &quot;{orderIdInput}&quot;
            </p>
            <p className="text-gray-500 mt-1">
              Please check the order ID and try again.
            </p>
          </CardContent>
        </Card>
      )}

      {!activeOrder && !orderIdInput && !isLoading && (
        <Card>
          <CardContent className="text-center py-8">
            <Truck className="h-12 w-12 mx-auto text-gray-400 mb-2" />
            <h3 className="text-lg font-medium">Track Your Order</h3>
            <p className="text-gray-500 mt-1">
              Enter your order ID above to see the latest status of your cake.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
