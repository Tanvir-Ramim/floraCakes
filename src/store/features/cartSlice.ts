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
  totalPrice: number;
  img: string;
  discount: number;
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
    discount: number;
  };
}

export interface IUpdatePrice {
  id: string;
  flavor?: { name: string; price: number };
  addons?: { name: string; price: number }[];
  weight?: { weight: number; price: number };
}
interface CartState {
  items: ICartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const item = action.payload;

      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        state.items = state.items.filter((item) => item.id !== existing.id);
        state.items.push(item);
      } else {
        state.items.push(item);
      }
    },
    addMessageToItem(
      state,
      action: PayloadAction<{
        id: string;
        message: {
          cakeMessage: string;
          note: string;
          orderInstructions: string;
        };
      }>
    ) {
      const { id, message } = action.payload;

      console.log({ message });
      const item = state.items.find((item) => item.id === id);
      if (item) {
        Object.assign(item, message);
      }
    },
    seletionAdd(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      // Find selected one and make it false
      state.items.forEach((item) => {
        if (item.isSelected) {
          item.isSelected = false;
        }
      });
      const item = state.items.find((item) => item.id === itemId);
      if (item) {
        item.isSelected = !item.isSelected; // Toggle selection
      }
    },
    addCoupon(
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) {
      const coupon = action.payload;
      const item = state.items.find((item) => item.isSelected === true);
      if (item) {
        // Object.assign(item, coupon);
        item.coupon = coupon;
      }
    },
    addShippingInfo(
      state,
      action: PayloadAction<{ city: string; area: string; cost: number }>
    ) {
      const { city, area, cost } = action.payload;

      console.log("redux-ship", action.payload);
      const selectedItem = state.items.find((item) => item.isSelected);
      if (selectedItem) {
        selectedItem.shipping = { city, area, cost };
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updatePrice(state, action: PayloadAction<IUpdatePrice>) {
      const { id, addons, flavor, weight } = action.payload;

      const itemIndex = state.items.findIndex((i) => i.id === id);
      if (itemIndex === -1) return;

      // Create a draft copy for immutability
      const updatedItem = { ...state.items[itemIndex] };

      // Apply updates
      if (addons?.length) {
        updatedItem.addons = addons;
      }

      // Handle flavor update
      if (flavor) {
        // Get current weight in numeric form (e.g., "1 kg" → 1)
        const splitERR = updatedItem.weight.toString();
        const currentWeight = parseFloat(splitERR.split(" ")[0]) || 1;

        updatedItem.flavor = {
          name: flavor.name,
          price: flavor.price * currentWeight,
        };
      }

      // Handle weight update
      if (weight && weight?.price > 0) {
        // Convert weight to string first if needed, then split
        const currentWeightStr = updatedItem.weight.toString();
        const currentWeightValue =
          parseFloat(currentWeightStr.split(" ")[0]) || 1;

        updatedItem.weight = weight.weight;
        updatedItem.priceRegular = weight.price;

        // Recalculate flavor price if weight changed
        if (updatedItem.flavor) {
          const prevFlavorUnitPrice =
            updatedItem.flavor.price / currentWeightValue;
          updatedItem.flavor.price =
            prevFlavorUnitPrice *
              parseFloat(weight.weight.toString().split(" ")[0]) || 1;
        }
      }
      // Calculate pricing components
      const regularDiscountAmount =
        updatedItem.discount > 0
          ? (updatedItem.priceRegular * updatedItem.discount) / 100
          : 0;

      updatedItem.priceWithDiscount =
        updatedItem.priceRegular - regularDiscountAmount;

      const flavorPrice = updatedItem.flavor?.price || 0;
      const shippingCost = updatedItem.shipping?.cost || 0;
      const addonsPrice =
        updatedItem.addons?.reduce((sum, addon) => sum + addon.price, 0) || 0;

      // Calculate totals
      const subtotal =
        updatedItem.priceWithDiscount +
        flavorPrice +
        addonsPrice +
        shippingCost;
      const couponDiscount = updatedItem.coupon
        ? (subtotal * updatedItem.coupon.discount) / 100
        : 0;

      // Immutably update the state
      state.items = [
        ...state.items.slice(0, itemIndex),
        {
          ...updatedItem,
          totalPrice: subtotal - couponDiscount, // Ensure totalPrice is included in the update
        },
        ...state.items.slice(itemIndex + 1),
      ];
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addMessageToItem,
  seletionAdd,
  addShippingInfo,
  addCoupon,
  updatePrice,
} = cartSlice.actions;

export default cartSlice.reducer;
