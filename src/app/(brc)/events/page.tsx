"use client";

import { useState } from "react";
import EventsPageComponent from "@/components/gallery/event";
import Container from "@/components/shared/container/Container";
import GlobalBanner from "@/components/shared/globalBanner";

import { Pagination } from "@/components/ui/pagination";
import { useEventFilterHook } from "@/hooks/eventsHook";
// import { EventSkeleton } from "@/components/gallery/EventSkeleton";

const EventsPage = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useEventFilterHook({
    page,
    limit,
    status: "Completed",
  });

  const eventsData = data?.events || [];
  const paginationData = data?.pagination || {
    total: 0,
    page: 1,
    limit,
    pages: 1,
    nextPage: null,
    prevPage: null,
  };
  console.log({ eventsData, paginationData });
  if (isError) {
    return (
      <div>
        <GlobalBanner title="Events" />
        <Container className="px-5">
          <div className="text-center py-10 text-red-500">
            Error loading events. Please try again later.
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <GlobalBanner url={eventsData[0]?.eventImage?.url} title="Events" />
      <Container className="px-5">
        {isLoading && !eventsData.length ? (
          //   <EventSkeleton count={limit} />
          <p>lll</p>
        ) : (
          <>
            <EventsPageComponent eventsData={eventsData} />

            <>
              <Pagination
                currentPage={paginationData.page}
                totalPages={paginationData.pages}
                hasNextPage={!!paginationData.nextPage}
                hasPrevPage={!!paginationData.prevPage}
                onPageChange={setPage}
                className="mt-8"
              />
            </>
          </>
        )}
      </Container>
    </div>
  );
};

export default EventsPage;
