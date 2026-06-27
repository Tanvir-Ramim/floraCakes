import apiClient from "./api-client";

export interface IAddonParams {
  type: string;
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: string;
  limit?: string;
  category?: string;
  fields?: string;
}
export interface IPurchaseAddonPayload {
  productsRef: Array<{
    productId: string;
    quantity: number;
  }>;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    area: string;
    note?: string;
  };
  deliveryOption: "delivery" | "pickup";
  paymentMethod: "cod" | "online";
  deliveryCharge: number;
  total: number;
}

const addonService = {
  getAddons: async (params: IAddonParams) => {
    try {
      return await apiClient.get("/add-on", { params });
    } catch (error) {
      throw error;
    }
  },
  getAddonById: async (id: string) => {
    try {
      return await apiClient.get(`/add-on/${id}`);
    } catch (error) {
      throw error;
    }
  },
  purchaseAddons: async (payload: IPurchaseAddonPayload) => {
    try {
      return await apiClient.post("/add-on/purchase", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // Optional: Get purchase history for a customer
  getPurchaseHistory: async (customerEmail: string) => {
    try {
      return await apiClient.get(`/add-on/purchases/${customerEmail}`);
    } catch (error) {
      throw error;
    }
  },

  // Optional: Get purchase details by order ID
  getPurchaseDetails: async (orderId: string) => {
    try {
      return await apiClient.get(`/add-on/order/${orderId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default addonService;
