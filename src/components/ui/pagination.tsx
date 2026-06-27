// components/ui/pagination.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./button/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  onPageChange,
  className = "",
}: PaginationProps) {
  const handlePrevious = () => {
    if (hasPrevPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <Button
        label="Previous"
        variant="outline"
        onClick={handlePrevious}
        disabled={!hasPrevPage}
        className="w-1/5"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        label="Next"
        onClick={handleNext}
        disabled={!hasNextPage}
        className="w-1/5"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
