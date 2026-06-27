"use client";

import blogService, { IBlogParams } from "@/services/blog.service";
import { useQuery } from "@tanstack/react-query";

export function useBlogHook(params: IBlogParams) {
  return useQuery({
    queryKey: ["filtered-blogs", params],
    queryFn: () => blogService.getFilterBlogs(params),
    staleTime: 1000 * 60 * 5,
  });
}

export function useBlogById(id: string) {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getBlogById(id),
    staleTime: 1000 * 60 * 5,
  });
}