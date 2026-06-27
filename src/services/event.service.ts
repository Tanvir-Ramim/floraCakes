import apiClient from "./api-client";

export interface IEventParam {
  eventName?: string;
  eventType?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  fields?: string;
}
export interface IEventResponse {
  data: any[];
  paginate: {
    total: number;
    page: number;
    limit: number;
    pages: number;
    nextPage: number | null;
    prevPage: number | null;
  };
}
const eventService = {
  filterEvents: async (params: IEventParam): Promise<IEventResponse> => {
    try {
      const response = await apiClient.get(`/events`, { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getEventById: async (eventId: string) => {
    try {
      return await apiClient.get(`/events/${eventId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default eventService;
