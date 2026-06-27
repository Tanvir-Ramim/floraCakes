
import apiClient from "./api-client";




export const customerService = {
  updateCustomer: async (customerId: string, formData: FormData) => {
    return apiClient.patch(`/customers/basic/${customerId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCustomer: async (customerId: string) => {
    return apiClient.get(`/customers/basic/${customerId}`);
  },

  // Add other customer-related methods as needed
};