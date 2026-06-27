// src/components/shared/card/BlogCardSkeleton.tsx
"use client";

import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="bg-white  md:w-full    w-[290px] animate-pulse p-4">
      <div className="mb-6 relative w-full h-48 md:h-64 bg-gray-200 rounded"></div>

      <div className="h-6 bg-gray-200 rounded md:w-3/4 mb-3"></div>

      <div className="h-4 bg-gray-200 rounded md:w-1/2 mb-5"></div>

      <div className="space-y-2 mb-6">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-11/12"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>

      <div className="h-10 w-32 bg-gray-200 rounded border-2 border-border-color"></div>
    </div>
  );
};

export default BlogCardSkeleton;
