"use client";

import { useState } from "react";
import Container from "../shared/container/Container";
import Accordion from "../ui/Accordion";
import CheckoutForm from "./checkout-form";
import OrderDetails from "./order-details";
import OrderSummary from "./order-summary";

const CheckoutPageComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="mt-10 lg:mt-20 relative">
      <Container className=" ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="block md:hidden px mb-4">
              <Accordion
                title="Order Summery"
                onToggle={toggleAccordion}
                isOpen={isOpen}
                amount={126.0}
                className="bg-border-light
                 cursor-pointer text-title"
              >
                <OrderDetails />
              </Accordion>
            </div>
            <CheckoutForm />
          </div>

          <div className="lg:col-span-1  lg:sticky top-20 lg:h-screen overflow-y-auto">
            <OrderSummary />
            
            
       
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CheckoutPageComponent;
