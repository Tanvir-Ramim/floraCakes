import { IAddon } from "@/@types";
import apiClient from "./api-client";

interface FilterParams {
  type?: string;
  title?: string;
  id?: string;
  category?: string;
  occasion?: string;
  subOccasion?: string;
  kidsOrAdult?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  isFeatured?: boolean;
  customizable?: boolean;
  isHide?: boolean;
  fields?: string;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}
interface IFlavor {
  name: string;
  price: number;
}

export interface IImage {
  url: string;
  public_id: string;
  alt?: string;
  sr?: number;
}

interface IReview {
  preview_id: string;
}

interface IServprice {
  weight: string;
  price: number;
}
export interface IProduct{
  id: string;
  category: string;
  name: string;
  title: string;
  type: string;
  kidsOrAdult: string;
  occasion: string;
  subOccasion: string;
  discount: number;
  price: [number, number];
  servingSize: IServprice[];
  flavor: IFlavor[];
  images: IImage[];
  thumbImage: IImage;
  hoverImage: IImage;
  videoLink: string;
  short_description: string;
  description: string;
  additional: string;
  shippingAndReturn: string;
  ingredients: string[];
  allergens: string[];
  customizable: boolean;
  availability: string;
  isHide: boolean;
  isFeatured: boolean;
  rating: number;
  reviews: IReview[];
  featureName: string;
}

export interface IProductProps { 
  cake: IProduct;
  addons: IAddon[];
  review: IReview[];
}
export interface IImageProps { 
  images: IImage[];
  title: string;
  
}
const cakeService = {
  getfilterCakes: async (params: FilterParams = {}) => {
    try {
      return await apiClient.get("/cakes/filter", { params });
    } catch (error) {
      throw error;
    }
  },

  getCakeById: async (id: string) => {
    try {
      return await apiClient.get(`/cakes/${id}`);
    } catch (error) {
      throw error;
    }
  },

  getSearchCakes: async (params = {}) => {
    try {
      return await apiClient.get("/search", { params });
    } catch (error) {
      throw error;
    }
  },
   createOrder: async (orderData:object) => {
    const response = await apiClient.post("/orders", orderData);
    return response.data;
  },
  getOrderById: async (orderId: string) => {
     try {
       const response = await apiClient.get(`/orders/${orderId}`);
       return response.data
     } catch (error) {
       throw error;
     }
   }
};

export default cakeService;
