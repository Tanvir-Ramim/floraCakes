import apiClient from "./api-client";

export interface IBlogParams {
  distinct?: string;
  category?: string;
  fromDate?: string;
  search?: string;
  toDate?: string;

  isPublished?: boolean;
  fields?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

const blogService = {
  getFilterBlogs: async (params: IBlogParams = {}) => {
    try {
      const res = await apiClient.get("/blog/filter", {
        params,
        // timeout: 30000,
      });
      console.log(res);
      return res || { blogs: [] }; 
    } catch (error) {
      console.error("getFilterBlogs failed:", error);
      return { blogs: [] }; // 🔥 NEVER return undefined
    }
  },

  getBlogById: async (id: string) => {
    try {
      return await apiClient.get(`/blog/${id}`);
    } catch (error) {
      throw error;
    }
  },
};

export default blogService;
