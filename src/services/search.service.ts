import apiClient from "./api-client";


export interface SearchResult {
  id: string;
  name?: string;
  title?: string;
  type: 'product' | 'gift' | 'giftCard' | 'blog' | 'event';
  slug?: string;
  image?: string;
}

export const searchService = {
  search: async (query: string): Promise<SearchResult[]> => {
    try {
      const response = await apiClient.get(`/search?q=${encodeURIComponent(query)}`);
      return response.data;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  },
};