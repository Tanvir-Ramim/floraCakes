"use client";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export const useWishItems = () => {
  const items = useSelector((state: RootState) => state.wish.items);
  

  return items || null;
};
