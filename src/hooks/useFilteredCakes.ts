"use client";

import cakeService from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export interface FilterParams {
  type?: string;
  title?: string;
  id?: string;
  para?: string |null;
  category?: string;
  occasion?: string;
  subOccasion?: string;
  kidsOrAdult?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string |null;
  isFeatured?: boolean;
  customizable?: boolean;
  isHide?: boolean;
  fields?: string;
  page?: number;
  limit?: number;
  [key: string]: unknown;
}

export function useFilteredCakes(params: FilterParams) {
  return useQuery({
    queryKey: ["filtered-cakes", params],
    queryFn: () => cakeService.getfilterCakes(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useCakeById(id: string) {
  return useQuery({
    queryKey: ["cake-by-id", id],
    queryFn: () => cakeService.getCakeById(id),
    staleTime: 1000 * 60 * 5,
  });
}
