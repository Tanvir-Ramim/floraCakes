"use client";
import { IAddonProduct } from "@/@types";
import { useRouter } from "next/navigation";
import CustomerInfoForm from "@/components/other-products/CustomerInfoForm";
import DeliveryPaymentForm from "@/components/other-products/DeliveryPaymentForm";
import OrderSummary from "@/components/other-products/OrderSummary";
import ProductGrid from "@/components/other-products/ProductGrid";
import { useAddonHook, usePurchaseAddon } from "@/hooks/addonHook";
import { IPurchaseAddonPayload } from "@/services/addon-service";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import Container from "@/components/shared/container/Container";

export interface ICus {
  name: string;
  area: string;
  phone: string;
  email: string;
  address: string;
  note: string;
  deliveryCharge: number;
}
export default function OtherProductsPage() {
  const [step, setStep] = useState<number>(1);

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedProducts, setSelectedProducts] = useState<IAddonProduct[]>([]);
  const [deliveryOption, setDeliveryOption] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online">("cod");
  const router = useRouter();
  const { mutate: purchaseAddons } = usePurchaseAddon(router);
  const { data: addon, isLoading } = useAddonHook({
    type: "other",
    category: selectedCategory === "All" ? undefined : selectedCategory,
  });

  const products = addon?.data?.addons || [];
  const categories = ["All", "Flower", "Gift Box", "Candle", "Accessories"];
  console.log({ products, addon });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    note: "",
    deliveryCharge: 0,
    area: "",
  });

  const handleProductSelect = (product: IAddonProduct) => {
    setSelectedProducts((prev) => {
      const existingIndex = prev.findIndex((p) => p._id === product._id);
      if (existingIndex >= 0) {
        return prev.filter((p) => p._id !== product._id);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product._id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleNext = () => {
    if (step === 1 && selectedProducts.length === 0) {
      toast.warning("Please select at least one product");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmitOrder = () => {
    // Calculate subtotal and total with delivery charge
    const subtotal = selectedProducts.reduce(
      (sum, product) => sum + product.price * (product.quantity || 1),
      0
    );
    const total = subtotal + (formData.deliveryCharge || 0);

    // Prepare the order payload
    const orderData: IPurchaseAddonPayload = {
      products: selectedProducts.map((product) => ({
        productId: product._id,
        quantity: product.quantity || 1,
      })),
      customerInfo: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address || "",
        area: formData.area,
        note: formData.note,
      },
      deliveryOption: deliveryOption === "pickup" ? "pickup" : "delivery",
      paymentMethod: paymentMethod === "online" ? "online" : "cod",
      deliveryCharge: formData.deliveryCharge || 0,
      total,
    };

    // Submit the order
    purchaseAddons(orderData);
  };

  return (
    <Container className="mt-10 lg:mt-20">
      <div className="container mx-auto px-4 py-8">
        {step === 1 && (
          <>
            <h1 className="text-3xl font-bold text-center mb-8">
              Other Products
            </h1>

            {/* Category Filter */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
          px-5 py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-300
          ${
            selectedCategory === category
              ? "bg-black text-white shadow-md"
              : "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50"
          }
        `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <ProductGrid
            products={products}
            isLoading={isLoading}
            selectedProducts={selectedProducts}
            onSelect={handleProductSelect}
            onQuantityChange={handleQuantityChange}
          />
        )}

        {step === 2 && (
          <CustomerInfoForm
            onNext={handleNext}
            onBack={handleBack}
            onSubmit={handleSubmitOrder}
            setFormData={setFormData}
            formData={formData}
          />
        )}

        {step === 3 && (
          <DeliveryPaymentForm
            deliveryOption={deliveryOption}
            paymentMethod={paymentMethod}
            onDeliveryChange={setDeliveryOption}
            onPaymentChange={setPaymentMethod}
            onBack={handleBack}
            onNext={handleNext}
            onSubmit={handleSubmitOrder}
          />
        )}

        {step === 4 && (
          <OrderSummary
            products={selectedProducts}
            deliveryOption={deliveryOption}
            formData={formData}
            paymentMethod={paymentMethod}
            onBack={() => setStep(3)}
            onSubmit={handleSubmitOrder}
          />
        )}

        <div>
          {products.length > 0 &&
            selectedProducts?.length > 0 &&
            step < 2 &&
            step >= 1 && (
              <div className="flex justify-between mt-8 max-w-7xl mx-auto px-4">
                <button
                  disabled={step === 1}
                  onClick={handleBack}
                  className="bg-title rounded-sm hover:bg-[#BD8448] text-white cursor-pointer font-semibold text-sm md:w-[100px]  md:py-3 py-2 w-[80px]"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-title rounded-sm hover:bg-[#BD8448] text-white cursor-pointer font-semibold text-sm md:w-[100px]  md:py-3 py-2 w-[80px]"
                >
                  Next
                </button>
              </div>
            )}
        </div>

        {/* Gift Cards Section */}
        <section className="md:py-20 py-14 ">
          <div className=" mx-auto ">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Content Section */}
                <div className="p-3 lg:p-8 md:p-6 xl:p-10 flex flex-col justify-center relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-6 right-6">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z"
                        fill="#F3F4F6"
                      />
                      <path
                        d="M26 14H14V26H26V14Z"
                        stroke="#111827"
                        strokeWidth="2"
                      />
                      <path d="M20 10V30" stroke="#111827" strokeWidth="2" />
                      <path d="M10 20H30" stroke="#111827" strokeWidth="2" />
                    </svg>
                  </div>

                  {/* Heading */}
                  <div className="md:mb-8 mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full mb-4">
                      Sweet Gifting
                    </span>
                    <h2 className="md:text-4xl  text-2xl font-bold text-gray-900 md:tracking-tight">
                      <span className="block">The Art of</span>
                      <span className="block text-gray-800">Sweet Giving</span>
                    </h2>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600  md:mb-8 mb-4 md:text-lg  leading-relaxed max-w-lg">
                    Our exquisite gift cards unlock a world of premium cakes and
                    confections. The perfect present for birthdays,
                    anniversaries, or just because.
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:mb-10 mb-7 ">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          Flexible Amounts
                        </h3>
                        <p className="text-gray-500 text-sm">
                          From $25 to $500
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          12 Month Validity
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Plenty of time to enjoy
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          Instant Delivery
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Email or printed card
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 bg-gray-100 p-2 rounded-lg mr-4">
                        <svg
                          className="w-6 h-6 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          Secure & Protected
                        </h3>
                        <p className="text-gray-500 text-sm">
                          Balance always safe
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row md:mb-0 mb-4 gap-4">
                    <Link
                      href="/gift"
                      className="relative md:px-6 px-4 md:py-3 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-black transition-all duration-300 group overflow-hidden text-center"
                    >
                      <span className="relative z-10 md:text-base text-sm flex items-center justify-center">
                        <svg
                          className="w-5 h-5 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v13m0-13V6a2 2 0 012-2h3.5a2 2 0 011.7.9l.8 1.2a2 2 0 010 2.2l-.8 1.2a2 2 0 01-1.7.9H12zm0 0V8zm0 13v2a2 2 0 01-2 2H6.5a2 2 0 01-1.7-.9l-.8-1.2a2 2 0 010-2.2l.8-1.2a2 2 0 011.7-.9H12z"
                          />
                        </svg>
                        Purchase Gift Card
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </Link>
                  </div>
                </div>

                {/* Image Section */}
                <div className="relative h-96 lg:h-auto bg-gray-100">
                  <div className="absolute inset-0  to-transparent z-10"></div>
                  <Image
                    src="https://i.ibb.co/s9gmTmZw/10665174-4522230.jpg"
                    alt="Luxury cake with gift card"
                    fill
                    className="object-cover object-center"
                    priority
                  />

                  {/* Image Badge */}
                  <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm md:p-5 p-3 rounded-xl shadow-md max-w-xs border border-gray-100 z-20">
                    <div className="flex items-start mb-3">
                      <div className="bg-gray-100 p-2 rounded-lg mr-3">
                        <svg
                          className="w-5 h-5 text-gray-900"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12 8v13m0-13V6a2 2 0 012-2h3.5a2 2 0 011.7.9l.8 1.2a2 2 0 010 2.2l-.8 1.2a2 2 0 01-1.7.9H12zm0 0V8zm0 13v2a2 2 0 01-2 2H6.5a2 2 0 01-1.7-.9l-.8-1.2a2 2 0 010-2.2l.8-1.2a2 2 0 011.7-.9H12z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold md:text-base text-sm text-gray-900">
                          Perfect For Any Occasion
                        </h3>
                        <p className=" md:text-sm text-xs text-gray-600 mt-1">
                          Birthdays, Anniversaries, Holidays
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="bg-gray-50 rounded-md py-12">
          <div className="max-w-7xl mx-auto md:px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Featured Collections
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 space-y-4 gap-6">
              {/* Collection 1 */}
              <div className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src="https://i.ibb.co/FbdpTCS6/nick-stephenson-P-KESVNv-A84-unsplash.jpg"
                  alt="Birthday Essentials"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">
                    Birthday Essentials
                  </h3>
                  <p className="text-sm text-white/80 mb-2">
                    Everything you need for the perfect celebration
                  </p>
                  <Link
                    href="/accessories?category=birthday"
                    className="inline-block text-sm font-medium underline underline-offset-2"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>

              {/* Collection 2 */}
              <div className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src="https://i.ibb.co/0yRMMd2N/jakob-owens-Ibpq-Vl-Si5s4-unsplash.jpg"
                  alt="Personalized Gifts"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Personalized Gifts</h3>
                  <p className="text-sm text-white/80 mb-2">
                    Unique gifts with a personal touch
                  </p>
                  <Link
                    href="/accessories?category=personalized"
                    className="inline-block text-sm font-medium underline underline-offset-2"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>

              {/* Collection 3 */}
              <div className="relative h-64 rounded-lg overflow-hidden group">
                <Image
                  src="https://i.ibb.co/6JTdR77h/dana-sarsenbekova-Ru-Lyp-MSy-Tbw-unsplash.jpg"
                  alt="Premium Flowers"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">Premium Flowers</h3>
                  <p className="text-sm text-white/80 mb-2">
                    Elegant bouquets and preserved arrangements
                  </p>
                  <Link
                    href="/accessories?category=flowers"
                    className="inline-block text-sm font-medium underline underline-offset-2"
                  >
                    Shop Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}
