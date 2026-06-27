"use client";

export const EventSkeleton = ({ count }: { count: number }) => {
  const SkeletonLine = ({ width = "full", height = "4" }: { width?: string, height?: string }) => (
    <div className={`bg-gray-200 h-${height} w-${width} rounded animate-pulse`}></div>
  );

  const SkeletonCard = ({ isLarge = false }: { isLarge?: boolean }) => (
    <div className="bg-white shadow-md overflow-hidden">
      <div className={`${isLarge ? 'lg:flex' : ''}`}>
        <div className={`${isLarge ? 'lg:w-1/2' : ''} h-64 md:h-80 bg-gray-200 animate-pulse`}></div>
        <div className={`${isLarge ? 'lg:w-1/2' : ''} p-6 md:p-8`}>
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse mr-2"></div>
            <SkeletonLine width="24" height="3" />
          </div>
          <SkeletonLine width="3/4" height="8" className="mb-4" />
          <div className="space-y-3 mb-6">
            <SkeletonLine width="full" height="3" />
            <SkeletonLine width="2/3" height="3" />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-start">
                <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse mr-3 mt-1"></div>
                <div>
                  <SkeletonLine width="12" height="2" className="mb-1" />
                  <SkeletonLine width="20" height="3" />
                </div>
              </div>
            ))}
          </div>
          
          {isLarge && (
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-gray-200 h-4 w-4 rounded-full animate-pulse mr-3"></div>
                <SkeletonLine width="32" height="4" />
              </div>
              <div className="flex gap-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-gray-200 h-24 w-24 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="bg-gray-200 h-12 w-64 mx-auto mb-6 animate-pulse rounded"></div>
          <div className="bg-gray-200 h-px w-24 mx-auto mb-6 animate-pulse"></div>
          <div className="bg-gray-200 h-5 w-96 max-w-full mx-auto animate-pulse rounded"></div>
        </div>

        {/* Corporate Events Skeleton */}
        <div className="mb-24">
          <div className="flex items-center mb-12">
            <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse mr-3"></div>
            <div className="bg-gray-200 h-8 w-48 animate-pulse rounded"></div>
            <div className="flex-grow bg-gray-200 h-px ml-6 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {[...Array(Math.min(count, 2))].map((_, i) => (
              <SkeletonCard key={`large-${i}`} isLarge={true} />
            ))}
          </div>
        </div>

        {/* Personal Events Skeleton */}
        <div>
          <div className="flex items-center mb-12">
            <div className="bg-gray-200 h-8 w-8 rounded-full animate-pulse mr-3"></div>
            <div className="bg-gray-200 h-8 w-48 animate-pulse rounded"></div>
            <div className="flex-grow bg-gray-200 h-px ml-6 animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(Math.min(count, 3))].map((_, i) => (
              <SkeletonCard key={`small-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};