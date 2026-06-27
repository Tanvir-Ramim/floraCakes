import apiClient from "./api-client";

export const applyCoupon = async (code: string) => {
  try {
    return await apiClient.get(`/coupon/apply/${code}`);
  } catch (error) {
    throw error;
  }
};
