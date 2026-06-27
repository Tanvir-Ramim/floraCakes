"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Loader2,
  MapPin,
  CalendarDays,
  CreditCard,
  Truck,
  UserRound,
  Phone,
  Mail,
  Calendar,
  Home,
} from "lucide-react";
import apiClient from "@/services/api-client";
import Button from "@/components/ui/button/button";
import Container from "@/components/shared/container/Container";

export default function AddonConfirmationPage({
  params,
}: {
  params: { orderId: string };
}) {
  const router = useRouter();

  type Order = {
    orderId: string;
    createdAt: string;
    paymentMethod: string;
    deliveryOption: string;
    total: number;
    deliveryInfo: {
      name: string;
      phone: string;
      email: string;
      address: string;
      deliveryCharge: number;
    };
  };

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const sessionOrder = sessionStorage.getItem("currentAddonOrder");
        if (sessionOrder) {
          setOrder(JSON.parse(sessionOrder));
          sessionStorage.removeItem("currentAddonOrder");
          setLoading(false);
          return;
        }

        const response = await apiClient.get(
          `/add-on/purchase/${params.orderId}`
        );
        if (!response.status) throw new Error("Order not found");
        setOrder(response.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load order details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [params.orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-400" />
          <p className="mt-3 text-gray-500">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Unable to load order
          </h2>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => router.push("/addon")}
            className="w-full max-w-xs mx-auto px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Addons
          </button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
            <svg
              className="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn't find details for order {params.orderId}
          </p>
          <button
            onClick={() => router.push("/addon")}
            className="w-full max-w-xs mx-auto px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Back to Addons
          </button>
        </div>
      </div>
    );
  }

  return (
    <Container className="mt-10 lg:mt-20">
      <div className="min-h-screen  py-12 px-3 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Confirmation Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-10 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-green-400" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">
                Order Confirmed
              </h1>
              <p className="text-gray-300">Thank you for your purchase</p>
            </div>

            <div className="md:p-6 p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div>
                  <h2 className="flex items-center text-lg font-semibold mb-4">
                    <ShoppingBag className="h-5 w-5 mr-2 text-gray-700" />
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">৳{order.total}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Delivery</span>
                      <span className="font-medium">
                        ৳{order.deliveryInfo.deliveryCharge}
                      </span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg">
                        ৳{order.total + order.deliveryInfo.deliveryCharge}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 mr-3 mt-0.5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <CreditCard className="h-5 w-5 mr-3 mt-0.5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium">
                          {order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "Online Payment"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Truck className="h-5 w-5 mr-3 mt-0.5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Delivery Method</p>
                        <p className="font-medium">
                          {order.deliveryOption === "delivery"
                            ? "Home Delivery"
                            : "Store Pickup"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div>
                  <h2 className="flex items-center text-lg mt-2 font-semibold mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    Customer Information
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Home className="h-5 w-5 mr-3 mt-0.5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Name</p>
                        <p className="font-medium">{order.deliveryInfo.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 mt-0.5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">
                          {order.deliveryInfo.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 mt-0.5 text-gray-600" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">
                          {order.deliveryInfo.email}
                        </p>
                      </div>
                    </div>

                    {order.deliveryOption === "delivery" && (
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-3 mt-0.5"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <div>
                          <p className="text-sm text-gray-600">
                            Delivery Address
                          </p>
                          <p className="font-medium">
                            {order.deliveryInfo.address}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/others-product" className="w-full sm:w-auto">
                  <Button
                    label="Continue Shopping"
                    className="w-full bg-gray-900 hover:bg-gray-800"
                    icon={<ShoppingBag size={18} className="ml-1" />}
                  />
                </Link>
                <Button
                  label="Print Receipt"
                  variant="outline"
                  onClick={() => window.print()}
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50"
                  icon={<Printer size={18} className="ml-1" />}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          {/* <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/others-product" className="flex-1">
            <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Continue Shopping
            </button>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <Printer className="h-5 w-5 mr-2" />
            Print Receipt
          </button>
        </div> */}

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Need help?{" "}
              <a href="#" className="text-gray-900 font-medium hover:underline">
                Contact our support
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
