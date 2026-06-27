import apiClient from "./api-client";

export interface IContent {
  section: string;
  title?: string;
  page?: string;
  image: { url: string; public_id: string; alt?: string };
  link?: string;
  isActive: boolean;
  order?: number;
}

export interface IGallery {
  image: { url: string; public_id: string; alt?: string };
  description?: string;
  location: string;
  date: Date;
  eventType: string;
  eventName: string;
}

export interface IContentParams {
  section: string;
  pageName?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
  fields?: string;
}

export interface IGalleryParams {
  location?: string;
  eventType?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  fields?: string;
}

const cmsService = {
  getContent: async (params: IContentParams) => {
    try {
      return await apiClient.get("/cms/contents", { params });
    } catch (error) {
      throw error;
    }
  },
  getContentById: async (id: string) => {
    try {
      return await apiClient.get(`/cms/contents/${id}`);
    } catch (error) {
      throw error;
    }
  },
  getGallery: async (params: IGalleryParams) => {
    try {
      return await apiClient.get("/cms/gallery", { params });
    } catch (error) {
      throw error;
    }
  },
  getGalleryById: async (id: string) => {
    try {
      return await apiClient.get<IGallery>(`/cms/gallery/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default cmsService;
