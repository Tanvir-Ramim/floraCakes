"use client";

import cmsService, { IContentParams } from "@/services/cms.service";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
export interface IGalleryItem {
  _id: {
    $oid: string;
  };
  image: {
    url: string;
    public_id: string;
    alt: string;
  };
  description: string;
  eventName: string;
  location: string;
  date: {
    $date: string;
  };
  eventType: string;
  createdAt: {
    $date: string;
  };
  updatedAt: {
    $date: string;
  };
  __v: number;
}

export interface IGalleryResponse {
  data: IGalleryItem[];
  total: number;
  page: number;
  limit: number;
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
export function useContent(params: IContentParams) {
  return useQuery({
    queryKey: ["cms-content", params],
    queryFn: async () => {
      return cmsService.getContent(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useContentById(id: string) {
  return useQuery({
    queryKey: ["cms-content", id],
    queryFn: async () => {
      return cmsService.getContentById(id);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useGallery(params: { page?: string; limit?: string }) {
  return useQuery({
    queryKey: ["cms-gallery", params],
    queryFn: async () => {
      return cmsService.getGallery(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}
export function useGalleryById(id: string) {
  return useQuery({
    queryKey: ["cms-gallery", id],
    queryFn: async () => {
      return cmsService.getGalleryById(id);
    },
    staleTime: 1000 * 60 * 5,
  });
}
export function useInfiniteGallery(params: IGalleryParams) {
  return useInfiniteQuery({
    queryKey: ["cms-gallery", params],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await cmsService.getGallery({
        ...params,
        page: pageParam,
        limit: params.limit || 1,
      });
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalItems = lastPage.total || 0;
      const loadedItems = allPages.flatMap(page => page.data).length;
      return loadedItems < totalItems ? allPages.length + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
}