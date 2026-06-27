import apiClient from "./api-client";

const giftService = {
  fetchGiftCard: async (): Promise<void> => {
    try {
      const response = await apiClient.get(`/gift-card/gifts`, {
        params: { status: true },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  purchaseGift: async (data: object): Promise<void> => {
    try {
      const response = await apiClient.post(`/gift-card/cards`,  data );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default giftService;
