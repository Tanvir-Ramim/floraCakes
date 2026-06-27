"use client";

import Link from "next/link";

import Container from "../shared/container/Container";
import Button from "../ui/button/button";
import CheckoutSummary from "./CheckoutSummary";

import CartItemsList from "./cart-item-list";
import ShippingProgress from "./shipping-progress";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

import ActionButton from "../shared/Header/SideCartBar/ActionButton";

const CartPageComponent = () => {
  // fetch items from reduxsclice

  const items = useSelector((state: RootState) => state.cart.items);

  // Determine shipping cost

  return (
    <div className="mt-10 lg:mt-20">
      <Container className=" p-2 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 md:gap-8">
          <div className="lg:col-span-2">
            <CartItemsList items={items} />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-3 rounded-lg">
              <ShippingProgress />

              <div className="md:mt-6">
                <ActionButton />
              </div>

              <div className="mt-6">
                <CheckoutSummary />
              </div>

              <div className="mt-4">
                {items.length > 0 ? (
                  <Link href="/checkout">
                    <Button variant="primary" label="Check Out" />
                  </Link>
                ) : (
                  <Button variant="primary" label="Check Out" disabled />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPageComponent;
