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

import { BiSelection } from "react-icons/bi";
import { TicketCheck } from "lucide-react";

export default function CartItemsList({ items }: { items: ICartItem[] }) {
  const dispatch = useDispatch<AppDispatch>();

  const itemso = useSelector((state: RootState) => state.cart.items);
  const selectedItem = itemso.find((item) => item?.isSelected === true);

  return (
    <div className="mb-8">
      <div className="grid grid-cols-3 gap-4 pb-2 text-title bg-cart-bg p-2">
        <div className="">Product</div>
        <div className="text- center">Info</div>
        <div className=" text- flex justify-end">Action</div>
      </div>

      {items?.length > 0 ? (
        items.map((item) => (
          <div
            key={item?.id}
            onClick={() => dispatch(seletionAdd(item?.id))}
            className={`grid grid-cols-1 gap-4 py-4 px-2 border-b border-border-color ${
              selectedItem?.id === item?.id ? "bg-gray-200" : "bg-cart-bg"
            }`}
          >
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-cart-bg rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item?.img || "/placeholder.svg"}
                  alt={item?.title}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-1/3">
                <h3 className="text-cardsub">
                  {item?.title} ({" "}
                  <span className="text-sm text-cardsub ">{item?.id}</span>)
                </h3>
              </div>
              <div className="md:block hidden">
                <div className="text-sm text-subtitle">
                  Weight: {item?.weight} kg :({item?.priceRegular} tk)
                  <br />
                  Discount: {item?.discount ? item?.discount + "%" : "0%"} :(
                  {item?.priceWithDiscount} tk)
                  <br />
                  {item?.flavor?.name && (
                    <span className="text-sm text-subtitle">
                      Flavor: {item?.flavor?.name} (+{item?.flavor?.price} tk)
                    </span>
                  )}
                </div>
                {item?.addons?.length > 0 && (
                  <div className="my-1 text-cardsub">
                    Addon:{" "}
                    {item?.addons.map((addon) => (
                      <p className="flex" key={addon.name}>
                        {addon.name} {addon.price ? `(+${addon.price})` : ""}
                      </p>
                    ))}
                  </div>
                )}
                <div>Total: {item?.totalPrice} tk</div>
              </div>
              <div className="w-1/3   md:flex hidden justify-end items-center gap-2">
                <div>
                  <div className="cursor-pointer">
                    {selectedItem?.id !== item?.id ? (
                      <BiSelection size={28} />
                    ) : (
                      <TicketCheck size={28} />
                    )}
                  </div>
                  <div className="text-title mt-5 cursor-pointer">
                    <RiDeleteBin6Line
                      size={28}
                      onClick={() => dispatch(removeFromCart(item?.id))}
                      className="text-author mb-1 hover:text-red-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex  justify-between items-center">
              <div className="md:hidden   block  ">
                <div className="text-sm text-subtitle">
                  Weight: {item?.weight} kg :({item?.priceRegular} tk)
                  <br />
                  Discount: {item?.discount ? item?.discount + "%" : "0%"} :(
                  {item?.priceWithDiscount} tk)
                  <br />
                  {item?.flavor?.name && (
                    <span className="text-sm text-subtitle">
                      Flavor: {item?.flavor?.name} (+{item?.flavor?.price} tk)
                    </span>
                  )}
                </div>
                {item?.addons?.length > 0 && (
                  <div className="my-1 text-cardsub">
                    Addon:{" "}
                    {item?.addons.map((addon) => (
                      <p className="flex" key={addon.name}>
                        {addon.name} {addon.price ? `(+${addon.price})` : ""}
                      </p>
                    ))}
                  </div>
                )}
                <div>Total: {item?.totalPrice} tk</div>
              </div>
              <div className="   md:hidden  gap-2">
                <div>
                  <div className="cursor-pointer">
                    {selectedItem?.id !== item?.id ? (
                      <BiSelection size={28} />
                    ) : (
                      <TicketCheck size={28} />
                    )}
                  </div>
                  <div className="text-title mt-4 cursor-pointer">
                    <RiDeleteBin6Line
                      size={28}
                      onClick={() => dispatch(removeFromCart(item?.id))}
                      className="text-author mb-1 hover:text-red-500 transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-20 text-xl text-gray-600">
          🛒 Your cart is empty. <br />
        </div>
      )}
    </div>
  );
}
