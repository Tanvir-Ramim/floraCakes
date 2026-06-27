"use client";

import { useEffect, useRef, useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
  hasMore = false,
  onLoadMore,
}: PaginationProps) {
  const [isInView, setIsInView] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const maxVisiblePages = 5;

  // Calculate visible page numbers
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);

  // Trigger load more when loader comes into view
  useEffect(() => {
    if (isInView && hasMore && !isLoading && onLoadMore) {
      onLoadMore();
    }
  }, [isInView, hasMore, isLoading, onLoadMore]);

  return (
    <>
      {/* Traditional pagination controls */}
      <div className="flex justify-center mt-8 mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-all duration-200"
            aria-label="Previous page"
          >
            &lt;
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-200"
              >
                1
              </button>
              {startPage > 2 && <span className="mx-1">...</span>}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => onPageChange(number)}
              disabled={isLoading}
              className={`w-8 h-8 flex items-center justify-center border rounded-md transition-all duration-200 ${
                currentPage === number
                  ? "bg-primary text-white border-primary"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              aria-current={currentPage === number ? "page" : undefined}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="mx-1">...</span>}
              <button
                onClick={() => onPageChange(totalPages)}
                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-all duration-200"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-all duration-200"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Infinite scroll loader (hidden when no more pages) */}
      {hasMore && (
        <div
          ref={loaderRef}
          className="flex justify-center py-4"
          aria-live="polite"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-5 h-5 border-2 border-t-primary border-gray-300 rounded-full animate-spin" />
              Loading more...
            </div>
          ) : (
            <button
              onClick={onLoadMore}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
}