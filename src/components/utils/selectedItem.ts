"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useSelectedItem = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const selectedItem = items.find((item) => item.isSelected === true);

  return selectedItem || null;
};


export const useCustomerInfo = () => { 
  const customerInfo = useSelector((state: RootState) => state.user);
  return customerInfo || null;
}