"use client";

import { forwardRef } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { cn } from "../lib/axios/cn";

interface NavigationButtonProps {
  direction: "prev" | "next";

  className?: string;
}

const NavigationButton = forwardRef<HTMLButtonElement, NavigationButtonProps>(
  ({ direction, className }, ref) => {
    const isPrev = direction === "prev";

    return (
      <button
        ref={ref}
        aria-label={isPrev ? "Previous Slide" : "Next Slide"}
        className={cn(
          `cursor-pointer z-[999] h-8 w-8 md:w-12 md:h-12 
           bg-[#00000026] hover:bg-black text-white flex items-center justify-center
           absolute transform -translate-y-1/2 transition-opacity duration-300`,
          isPrev ? "left-2" : "right-2", // Default to left or right
          "md:opacity-0 md:group-hover/button:opacity-100", // Hover effect for larger screens

          className
        )}
      >
        {isPrev ? <MdArrowBackIosNew /> : <MdArrowForwardIos />}
      </button>
    );
  }
);

NavigationButton.displayName = "NavigationButton";

export default NavigationButton;
