import eventService, { IEventParam, IEventResponse } from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

export function useEventFilterHook(params: IEventParam) {
  return useQuery<IEventResponse>({
    queryKey: ["filtered-events", params],
    queryFn: () => eventService.filterEvents(params),
    staleTime: 1000 * 60 * 5,
  });
}
