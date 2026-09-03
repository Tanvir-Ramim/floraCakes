"use client";
import { RiDeleteBin6Line } from "react-icons/ri";

import Image from "next/image";
import {
  ICartItem,
  removeFromCart,
  seletionAdd,
} from "@/store/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";


import { Circle, CircleCheck } from "lucide-react";

export default function CartItemsList({ items }: { items: ICartItem[] }) {
  const dispatch = useDispatch<AppDispatch>();

  const itemso = useSelector((state: RootState) => state.cart.items);
  const selectedItem = itemso.find((item) => item?.isSelected === true);

  return (
    <div className="mb-8 mt-3">
      {" "}
      {/* Header */}{" "}
      <div className="hidden md:grid grid-cols-3 gap-4 items-center mb-2 px-4 py-3 rounded-lg bg-white border border-border-color">
        {" "}
        <div className="text-title font-semibold">Product</div>{" "}
        <div className="text-title font-semibold text-center">Info</div>{" "}
        <div className="text-title font-semibold text-right">Action</div>{" "}
      </div>{" "}
      {items?.length > 0 ? (
        items.map((item) => {
          const isSelected = selectedItem?.id === item?.id;
          return (
            <div
              key={item?.id}
              onClick={() => dispatch(seletionAdd(item?.id))}
              className={` group relative mb-3 rounded-xl border p-3 sm:p-4 cursor-pointer transition-all duration-200 ${isSelected ? "border-black bg-gray-100 shadow-sm" : "border-border-color bg-white hover:border-gray-400 hover:shadow-sm"} `}
            >
              {isSelected && (
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-black" />
              )}
              <div className="flex flex-col md:grid md:grid-cols-[1.4fr_1fr_auto] gap-2 md:gap-6 items-center">
                <div className="flex items-center gap-3 w-full">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                    <Image
                      src={item?.img || "/placeholder.svg"}
                      alt={item?.title || "Product"}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {isSelected && (
                      <div className="absolute top-1.5 right-1.5 bg-black text-white rounded-full p-0.5 shadow">
                        <CircleCheck size={16} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-cardsub font-semibold leading-6 line-clamp-2">
                      {item?.title}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-subtitle">
                      ID:
                      <span className="font-medium text-gray-700">
                        {item?.id}
                      </span>
                    </p>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-black">
                        <CircleCheck size={14} /> Selected
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full  text-sm text-subtitle leading-6">
                  <div>
                    <span className="font-medium mr-1 text-black">
                      Weight :
                    </span>
                    {item?.weight} kg
                  </div>
                  <div>
                    <span className="font-medium mr-1  text-black">
                      Regular :
                    </span>
                    {item?.priceRegular} tk
                  </div>
                  <div>
                    <span className="font-medium mr-1  text-black">
                      Discount :
                    </span>
                    {item?.discount ? `${item?.discount}%` : "0%"}
                  </div>
                  <div>
                    <span className="font-medium mr-1  text-black">
                      Price :
                    </span>
                    {item?.priceWithDiscount} tk
                  </div>
                  {item?.flavor?.name && (
                    <div>
                      <span className="font-medium mr-1 text-black">
                        Flavor :
                      </span>
                      {item?.flavor?.name}
                      <span className="text-xs">
                        (+{item?.flavor?.price} tk)
                      </span>
                    </div>
                  )}
                  {/* Addons */}
                  {item?.addons?.length > 0 && (
                    <div className="mt-1">
                      <span className="font-medium text-black">Add-ons :</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item?.addons.map((addon) => (
                          <span
                            key={addon.name}
                            className="inline-flex items-center rounded-full bg-gray-100 border border-gray-200 px-2 py-0.5 text-xs text-gray-700"
                          >
                            {addon.name}
                            {addon.price ? ` +${addon.price} tk` : ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="mt-2 md:block hidden font-semibold text-black">
                    Total :
                    <span className="font-bold"> {item?.totalPrice} tk</span>
                  </div>
                </div>
                {/* Actions */}
                <div
                  className="flex  items-center justify-between gap-3 w-full md:w-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="mt-2  md:hidden font-semibold text-black">
                    Total :
                    <span className="font-bold"> {item?.totalPrice} tk</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() => dispatch(seletionAdd(item?.id))}
                      aria-label={isSelected ? "Selected item" : "Select item"}
                      className={` flex items-center justify-center gap-2 rounded-lg sm:px-3 md:py-2 px-2 py-1.5 border cursor-pointer transition-all duration-200 ${isSelected ? "border-black bg-black text-white shadow-sm" : "border-gray-300 bg-white text-gray-600 hover:border-black hover:text-black"} `}
                    >
                      {" "}
                      {isSelected ? (
                        <>
                          <CircleCheck size={17} strokeWidth={2.5} />{" "}
                          <span className="hidden sm:inline text-xs font-medium">
                            Selected
                          </span>
                        </>
                      ) : (
                        <>
                          <Circle size={17} strokeWidth={2} />
                          <span className="hidden sm:inline text-xs font-medium">
                            Select
                          </span>
                        </>
                      )}
                    </button>
                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => dispatch(removeFromCart(item?.id))}
                      aria-label="Remove item"
                      className=" flex items-center cursor-pointer justify-center w-10 h-10 rounded-lg text-gray-500 hover:text-white hover:bg-black transition-all duration-200 "
                    >
                      <RiDeleteBin6Line size={21} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-4 rounded-xl border border-dashed border-gray-300 bg-white">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <span className="text-3xl">🛒</span>{" "}
          </div>
          <h3 className="text-lg font-semibold text-black">
            Your cart is empty
          </h3>
          <p className="mt-1 text-sm text-gray-500 text-center">
            {" "}
            Add some products to your cart to continue.
          </p>
        </div>
      )}{" "}
    </div>
  );
}
