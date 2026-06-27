import reviewService, { IReviewrParams } from "@/services/review.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetReviewHook(params: IReviewrParams) {
  return useQuery({
    queryKey: ["review", params],
    queryFn: async () => {
      return reviewService.getReviewCake(params);
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useAddReviewHook() {
  return useMutation({
    mutationFn: async (data: FormData) => {
      return await reviewService.addReviewCake(data);
    },
  });
}
