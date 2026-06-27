import apiClient from "./api-client";

export interface IReviewrParams {
  customerId?: string;
  cakeId?: string;
  orderId?: string;
  date?: string;
  from?: string;
  to?: string;
  minRating?: number;
  maxRating?: number;
  page?: number;
  limit?: number;
  sort?: "latest" | "oldest" | string;
  fields?: string;
}
export interface IReview {
  cakeId: string;
  orderId?: string;
  customerId?: string;
  cakeName: string;
  user?: string;
  email?: string;
  phone?: string;
  image?: {
    url: string;
    public_id: string;
  };
  rating?: number;
  comment?: string;
  createdAt: Date;
  updatedAt?: Date;
  _id: string;
}

export interface IReviewAdd {
  cakeId: string;
  orderId: string;
  customerId: string;
  cakeName: string;
  user: string;
  email: string;
  comment?: string;
  rating?: number;
  image: File | Blob | null;
  title?: string;
}

const reviewService = {
  getReviewCake: async (params: IReviewrParams = {}) => {
    try {
      return await apiClient.get("/review/filter", { params });
    } catch (error) {
      throw error;
    }
  },
  addReviewCake: async (data: FormData) => {
    try {
      return await apiClient.post("/review", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default reviewService;
