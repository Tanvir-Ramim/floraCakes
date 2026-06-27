// components/CustomerOrderForm.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { CustomerOrderForm } from "@/@types";
import { useOrderHook } from "@/hooks/orderHook";
import { mapCustomerOrderToModel } from "../utils/orderMapping";
import Button from "../ui/button/button";
import ShippingEstimator from "../cart/shipping-estimator";
import { useSelectedItem } from "../utils/selectedItem";
import { useCalculatedItem } from "../utils/calculationItem";
import CheckoutSummary from "../cart/CheckoutSummary";
import { useRouter } from "next/navigation";

const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(1, "Phone is required"),
    street: z.string().optional(),
    city: z.string().min(1, "City is required"),
    zip: z.string().min(1, "ZIP code is required"),
    address: z.string().min(1, "Address is required"),
  }),
  isDelivery: z.boolean(),
  isGift: z.boolean(),
  customized: z.boolean(),
  addOn: z
    .array(
      z.object({
        name: z.string(),
        price: z.number(),
      })
    )
    .optional(),
  paymentType: z.string().min(1, "Payment type is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  deliveryDate: z.date(),
  deliveryTime: z.string().min(1, "Delivery time is required"),
  flavor: z.string().optional(),
  flavorPrice: z.number().optional(),
  cakePrice: z.number().optional(),
  sizePrice: z.number().optional(),
  discountAmount: z.number().optional(),
  finalPrice: z.number().optional(),
  title: z.string().optional(),
  weight: z.string().optional(),
  message: z.string().optional(),
  note: z.string().optional(),
  deliveryCharge: z.number().default(0),
  shipping: z.object({ cost: z.number(), area: z.string() }),
  regularFiles: z.any().optional().nullable(),
  customFiles: z.any().optional().nullable(),
  cakeId: z.string().min(1, "ID is required"),
  category: z.string().min(1, "Category is required"),
  addonPrice: z.number().default(0),
  coupon: z.object({ code: z.string(), discount: z.number() }).optional(),
  couponAmount: z.number().optional(),
  customizedCakeDetails: z
    .object({
      cakeName: z.string().optional(),
      cakeWeight: z.string().optional(),
      shape: z.string().optional(),
      layers: z.string().optional(),
      price: z.number().optional(),
      description: z.string().optional(),
    })
    .optional(),

  delivery: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      zip: z.string().optional(),
      address: z.string().optional(),
    })
    .optional(),
  deliveryNote: z.string().optional(),
  nameGift: z.string().optional(),
  phoneGift: z.string().optional(),
});

export default function OrderForm() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const createOrderMutation = useOrderHook(router);
  const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
  // Get Redux values at the top level
  const item = useSelectedItem();
  const cal = useCalculatedItem();

  // Track the initial load state
  const [isInitialized, setIsInitialized] = useState(false);
  const prevItemId = useRef(item?.id);

  // const {
  //   register,
  //   handleSubmit,
  //   watch,

  //   formState: { errors },
  //   setValue,
  // } = useForm<CustomerOrderForm>({
  //   resolver: zodResolver(orderSchema),
  //   mode: "onChange",
  //   defaultValues: {
  //     customer: {
  //       name: "",
  //       email: "",
  //       phone: "",
  //       city: "",
  //       zip: "",
  //       address: "",
  //     },
  //     isDelivery: false,
  //     isGift: false,
  //     customized: false,
  //     addOn: item?.addons ?? [],
  //     paymentType: "Unpaid",
  //     paymentMethod: "Cash On Delivery",
  //     deliveryDate: new Date(),
  //     deliveryTime: "",
  //     shipping: item?.shipping,
  //     flavor: item?.flavor?.name ?? "",
  //     flavorPrice: cal?.flavorPrice || 0,
  //     cakePrice: cal?.finalPrice || 0,
  //     sizePrice: cal?.regularPrice || 0,
  //     discountAmount: item?.discount ?? 0,
  //     coupon: {
  //       code: item?.coupon?.code ?? "",
  //       discount: item?.coupon?.discount ?? 0,
  //     },
  //     couponAmount: cal?.couponDiscount ?? 0,
  //     finalPrice: cal?.finalPrice ?? 0,
  //     addonPrice: cal?.addonsTotal ?? 0,
  //     deliveryCharge: item?.shipping?.cost ?? 0,

  //     cakeId: item?.id ?? "",
  //     regularFiles: undefined,
  //     customFiles: undefined,
  //   },
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<CustomerOrderForm>({
    resolver: zodResolver(orderSchema),
    mode: "onChange",
    defaultValues: {
      // Initialize with empty/default values
      customer: {
        name: "",
        email: "",
        phone: "",
        city: "",
        zip: "",
        address: "",
      },
      isDelivery: false,
      isGift: false,
      customized: false,
      addOn: [],
      paymentType: "Unpaid",
      paymentMethod: "Cash On Delivery",
      deliveryDate: new Date(),
      deliveryTime: "",
      shipping: { cost: 0, area: "" },
      flavor: "",
      flavorPrice: 0,
      cakePrice: 0,
      sizePrice: 0,
      discountAmount: 0,
      coupon: { code: "", discount: 0 },
      couponAmount: 0,
      finalPrice: 0,
      addonPrice: 0,
      deliveryCharge: 0,
      cakeId: "",
      regularFiles: undefined,
      customFiles: undefined,
    },
  });

  // Only run once on initial mount and when item ID changes
  useEffect(() => {
    if (item && cal && (!isInitialized || item.id !== prevItemId.current)) {
      reset({
        addOn: item.addons ?? [],
        shipping: item.shipping ?? { cost: 0, area: "" },
        flavor: item.flavor?.name ?? "",
        flavorPrice: cal.flavorPrice || 0,
        cakePrice: cal.finalPrice || 0,
        sizePrice: cal.regularPrice || 0,
        discountAmount: item.discount ?? 0,
        coupon: {
          code: item.coupon?.code ?? "",
          discount: item.coupon?.discount ?? 0,
        },
        couponAmount: cal.couponDiscount ?? 0,
        finalPrice: cal.finalPrice ?? 0,
        addonPrice: cal.addonsTotal ?? 0,
        deliveryCharge: item.shipping?.cost ?? 0,
        cakeId: item.id ?? "",
        paymentType: "Unpaid",
      });

      setIsInitialized(true);
      prevItemId.current = item.id;
    }
  }, [item, cal, reset, isInitialized]);

  // For individual field updates (without full reset)
  useEffect(() => {
    if (isInitialized) {
      // Only update specific fields that might change
      if (cal?.flavorPrice !== watch("flavorPrice")) {
        setValue("flavorPrice", cal?.flavorPrice || 0);
      }
      if (cal?.finalPrice !== watch("finalPrice")) {
        setValue("finalPrice", cal?.finalPrice || 0);
      }
      // Add other fields that need reactive updates
    }
  }, [cal, isInitialized, setValue, watch]);

  // Debugging
  useEffect(() => {
    console.log("Current form values:", watch());
  }, [watch]);

  const isDelivery = watch("isDelivery");
  const isGift = watch("isGift");
  const customized = watch("customized");
  const deliveryDate = watch("deliveryDate");
  console.log(watch());

  // customer
  const watchedFields = watch([
    "customer.name",
    "customer.email",
    "customer.phone",
    "customer.city",
    "customer.zip",
  ]);
  const hasRequiredFields = watchedFields.every(
    (field) => field && field.trim() !== ""
  );

  const canProceed = hasRequiredFields;

  // delivery info
  const watchedFieldsDelivery = watch(["deliveryDate", "deliveryTime"]);
  const hasRequiredFieldsDelivery = watchedFieldsDelivery.every(
    (field) => field && field !== ""
  );

  const canProceedDelivery = hasRequiredFieldsDelivery;

  const handleCreateOrder = async (data: CustomerOrderForm) => {
    console.log("Form submitted with data:", data);

    try {
      const orderPayload = mapCustomerOrderToModel(data);
      await createOrderMutation.mutateAsync(orderPayload);
      // router.push("/checkout/confirmation");
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  // Also add this to see if form is being submitted at all
  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Add a loading guard
  if (!item || !cal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto md:p-6 p-2">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`flex items-center justify-center w-8 h-8 rounded-full ${
                step >= num ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-between md:text-sm text-xs mt-2">
          <span>Customer Info</span>
          <span>Cake Details</span>
          <span>Delivery</span>
          <span>Payment</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(handleCreateOrder, onError)}
        className="space-y-6"
      >
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Customer Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Name
                </label>
                <input
                  {...register("customer.name")}
                  className="w-full p-2  bg-gray-100"
                  placeholder="Your full name"
                />
                {errors.customer?.name && (
                  <p className="text-red-500 text-sm">
                    {errors.customer.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Email
                </label>
                <input
                  {...register("customer.email")}
                  type="email"
                  className="w-full p-2  bg-gray-100"
                  placeholder="your@email.com"
                />
                {errors.customer?.email && (
                  <p className="text-red-500 text-sm">
                    {errors.customer.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Phone
                </label>
                <input
                  {...register("customer.phone")}
                  className="w-full p-2  bg-gray-100"
                  placeholder="Your phone number"
                />
                {errors.customer?.phone && (
                  <p className="text-red-500 text-sm">
                    {errors.customer.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  City
                </label>
                <input
                  {...register("customer.city")}
                  className="w-full p-2  bg-gray-100"
                  placeholder="Your city"
                />
                {errors.customer?.city && (
                  <p className="text-red-500 text-sm">
                    {errors.customer.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  ZIP Code
                </label>
                <input
                  {...register("customer.zip")}
                  className="w-full p-2  bg-gray-100"
                  placeholder="ZIP code"
                />
                {errors.customer?.zip && (
                  <p className="text-red-500 text-sm">
                    {errors.customer.zip.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Street Address
                </label>
                <input
                  {...register("customer.street")}
                  className="w-full p-2  bg-gray-100"
                  placeholder="Street address (optional)"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Full Address
              </label>
              <input
                {...register("customer.address")}
                className="w-full p-2  bg-gray-100"
                placeholder="Complete address"
              />
              {errors.customer?.address && (
                <p className="text-red-500 text-sm">
                  {errors.customer.address.message}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                label="Next"
                onClick={nextStep}
                disabled={!canProceed}
                className={`w-1/4 md:w-1/6 md:w-1/6 ${
                  !canProceed ? "opacity-50 cursor-not-allowed" : "secondary"
                }`}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Cake Details</h2>

            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("customized")}
                  className="mr-2"
                />
                Custom Cake
              </label>
            </div>

            {!customized ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Cake Name
                  </label>
                  <input
                    value={item?.title}
                    {...register("title")}
                    className="w-full p-2 border bg-gray-200 rounded "
                    placeholder="Select cake"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Cake Id
                  </label>
                  <input
                    value={item?.id}
                    {...register("cakeId")}
                    className="w-full p-2   bg-gray-200 "
                    placeholder="Select cake"
                    disabled
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1  ">
                    Weight/Size
                  </label>
                  <input
                    value={item?.weight}
                    disabled
                    {...register("weight")}
                    className="w-full p-2  bg-gray-200 "
                    placeholder="e.g., 1kg, 2lbs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Flavor
                  </label>
                  <input
                    value={item?.flavor?.name}
                    disabled
                    {...register("flavor")}
                    className="w-full p-2  bg-gray-200 "
                    placeholder="Cake flavor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Flavor Price
                  </label>
                  <input
                    value={cal?.finalPrice}
                    disabled
                    {...register("flavorPrice", { valueAsNumber: true })}
                    type="number"
                    className="w-full p-2  bg-gray-200 "
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Message on Cake
                  </label>
                  <input
                    defaultValue={item?.cakeMessage || ""}
                    {...register("message", {
                      value: item?.cakeMessage || "",
                    })}
                    className="w-full p-2  bg-gray-100"
                    placeholder="Happy Birthday!"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Special Notes
                  </label>
                  <textarea
                    defaultValue={item?.note}
                    {...register("note", {
                      value: item?.orderInstructions || "",
                    })}
                    className="w-full p-2  bg-gray-100"
                    rows={2}
                    placeholder="Any special instructions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Reference Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("regularFiles", file);
                      }
                    }}
                    className="w-full p-2  file:cursor-pointer bg-gray-100  file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-100 file:text-blue-700"
                  />
                </div>

                <>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Category
                    </label>
                    <input
                      value={item?.cake?.category}
                      disabled
                      {...register("category")}
                      type="text"
                      className="w-full p-2  bg-gray-200 capitalize"
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Price by weight ({item?.weight}kg)
                    </label>
                    <input
                      value={cal?.regularPrice}
                      disabled
                      {...register("sizePrice")}
                      type="number"
                      className="w-full p-2  bg-gray-200"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Regular Discount %
                    </label>
                    <input
                      value={item?.discount}
                      disabled
                      {...register("discountAmount")}
                      type="number"
                      className="w-full p-2  bg-gray-200"
                      placeholder="0"
                    />
                  </div>

                  {item?.coupon && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Coupon Code
                        </label>
                        <input
                          value={item?.coupon?.code ?? ""}
                          disabled
                          {...register("coupon.code")}
                          type="text"
                          className="w-full p-2  bg-gray-200"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Coupon Discount (%)
                        </label>
                        <input
                          value={item?.coupon?.discount ?? 0}
                          disabled
                          {...register("coupon.discount", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          className="w-full p-2  bg-gray-200"
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Coupon Amount (tk)
                        </label>
                        <input
                          value={cal?.couponDiscount ?? 0}
                          disabled
                          {...register("couponAmount", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          className="w-full p-2  bg-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </>
                  )}
                  {item?.shipping?.cost && (
                    <>
                      {" "}
                      <div>
                        <label className="block text-sm font-medium mb-1 text-gray-700">
                          Delivery Charge (tk)
                        </label>
                        <input
                          value={item?.shipping?.cost ?? 0}
                          disabled
                          {...register("deliveryCharge", {
                            valueAsNumber: true,
                          })}
                          type="number"
                          className="w-full p-2  bg-gray-200"
                          placeholder="0"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Final Price (tk)
                    </label>
                    <input
                      value={cal?.finalPrice}
                      disabled
                      {...register("cakePrice", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-full p-2  bg-gray-200"
                      placeholder="0"
                    />
                  </div>
                </>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Custom Cake Name
                  </label>
                  <input
                    {...register("customizedCakeDetails.cakeName")}
                    className="w-full p-2  bg-gray-100"
                    placeholder="Your custom cake name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Weight
                    </label>
                    <input
                      {...register("customizedCakeDetails.cakeWeight")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="e.g., 1kg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Shape
                    </label>
                    <input
                      {...register("customizedCakeDetails.shape")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="Round, Square, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Layers
                    </label>
                    <input
                      {...register("customizedCakeDetails.layers")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="Number of layers"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Estimated Price
                    </label>
                    <input
                      {...register("customizedCakeDetails.price", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-full p-2  bg-gray-100"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...register("customizedCakeDetails.description")}
                    className="w-full p-2  bg-gray-100"
                    rows={4}
                    placeholder="Describe your custom cake in detail"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Reference Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("customFiles", file);
                      }
                    }}
                    className="w-full p-2  bg-gray-100 file:cursor-pointer file:mr-4 file:py-2 file:px-4
             file:rounded-lg file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-100 file:text-blue-700"
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <Button
                type="button"
                label="Previous"
                onClick={prevStep}
                className="secondary w-1/4 md:w-1/6  "
              ></Button>
              <Button
                type="button"
                label="Next"
                onClick={nextStep}
                className="secondary w-1/4 md:w-1/6 "
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Delivery Information</h2>
            <div className="mt-6 ">
              <ShippingEstimator
                estimatedCost={estimatedCost}
                setEstimatedCost={setEstimatedCost}
              />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center md:text-base text-sm">
                <input
                  type="checkbox"
                  {...register("isDelivery")}
                  className="mr-2 "
                />
                Delivery Required
              </label>

              <label className="flex items-center md:text-base text-sm">
                <input
                  type="checkbox"
                  {...register("isGift")}
                  className="mr-2"
                />
                This is a Gift
              </label>
            </div>

            {(isDelivery || isGift) && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Delivery Address</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Street
                    </label>
                    <input
                      {...register("delivery.street")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      City
                    </label>
                    <input
                      {...register("delivery.city")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="City"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      ZIP Code
                    </label>
                    <input
                      {...register("delivery.zip")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="ZIP code"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Complete Address
                  </label>
                  <textarea
                    {...register("delivery.address")}
                    className="w-full p-2  bg-gray-100"
                    rows={3}
                    placeholder="Complete delivery address"
                  />
                </div>
              </div>
            )}

            {isGift && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Gift Recipient</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Recipient Name
                    </label>
                    <input
                      {...register("nameGift")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="Gift recipient's name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">
                      Recipient Phone
                    </label>
                    <input
                      {...register("phoneGift")}
                      className="w-full p-2  bg-gray-100"
                      placeholder="Gift recipient's phone"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Delivery Date{" "}
                  {deliveryDate && !isNaN(new Date(deliveryDate).getTime()) && (
                    <span>
                      (
                      {new Date(deliveryDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      )
                    </span>
                  )}
                </label>
                <input
                  {...register("deliveryDate", { valueAsDate: true })}
                  type="date"
                  className="w-full p-2  bg-gray-100"
                />
              </div>

              <div>
                {watch("deliveryTime") ? (
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Delivery Time (<span>{watch("deliveryTime")}</span>)
                  </label>
                ) : (
                  <label className="block text-sm font-medium mb-1 text-gray-700">
                    Delivery Time
                  </label>
                )}
                <select
                  {...register("deliveryTime", { required: true })}
                  className="w-full p-2  bg-gray-100"
                >
                  <option value="">Select Time</option>
                  <option value="10-12">10–12 AM</option>
                  <option value="12-2">12–2 PM</option>
                  <option value="2-4">2–4 PM</option>
                  <option value="4-6">4–6 PM</option>
                  <option value="6-8">6–8 PM</option>
                  <option value="8-10">8–10 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Delivery Notes
              </label>
              <textarea
                {...register("deliveryNote", {
                  value: watch("deliveryNote") || "",
                })}
                defaultValue={watch("deliveryNote") || ""}
                className="w-full p-2  bg-gray-100"
                rows={2}
                placeholder="Any special delivery instructions"
              />
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                label="Previous"
                onClick={prevStep}
                className="secondary w-1/4 md:w-1/6 "
              >
                Previous
              </Button>
              <Button
                type="button"
                label="Next"
                onClick={nextStep}
                className={`w-1/4 md:w-1/6 ${
                  !canProceedDelivery
                    ? "opacity-50 cursor-not-allowed"
                    : "secondary"
                }`}
                disabled={!canProceedDelivery}
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Payment Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Payment Method
                </label>
                <input
                  value={"Cash On Delivery"}
                  {...register("paymentMethod")}
                  disabled
                  className="w-full p-2  bg-gray-300"
                />
              </div>
            </div>

            <div className="border border-gray-300 p-4 rounded">
              <h3 className="font-semibold mb-2">Order Summary</h3>

              <CheckoutSummary />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="bg-title hover:bg-[#BD8448] text-white cursor-pointer font-semibold text-sm w-1/4 md:w-1/6"
              >
                Previous
              </button>

              <button
                type="submit"
                disabled={createOrderMutation.isPending}
                className=" bg-title hover:bg-[#BD8448] text-white cursor-pointer font-semibold text-sm w-1/3 md:py-3 py-2 md:w-1/6"
              >
                {createOrderMutation.isPending
                  ? "Placing Order..."
                  : "Place Order"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
