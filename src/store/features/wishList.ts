import { IProduct } from "@/services/product.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICartItem {
  id: string;
  title: string;
  cake: IProduct;
  weight: number;
  priceWithDiscount: number;
  flavor: { name: string; price: number };
  addons: { name: string; price: number }[];
  quantity: number;
  totalPrice: number; // This should be the final calculated price
  img: string;
  discount: number; // Percentage discount
  priceRegular: number;
  cakeMessage?: string;
  note?: string;
  orderInstructions?: string;
  isSelected?: boolean;
  shipping?: {
    city: string;
    area: string;
    cost: number;
  };
  coupon?: {
    code: string;
    discount: number; // Percentage discount
  };
}

interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addTowish(state, action: PayloadAction<ICartItem>) {
      const item = action.payload;

      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        state.items = state.items.filter((item) => item.id !== existing.id);
        state.items.push(item);
      } else {
        state.items.push(item);
      }
    },

    removeFromWish(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWish(state) {
      state.items = [];
    },
  },
});

export const { addTowish, removeFromWish, clearWish } = wishSlice.actions;

export default wishSlice.reducer;
