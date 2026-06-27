// "use client";

// import { useBlogHook } from "@/hooks/useBlogHook";
// import BlogCard from "../shared/card/BlogCard";
// import Container from "../shared/container/Container";
// import GlobalBanner from "../shared/globalBanner";
// import SidebarLayout from "./sidebar-layout";
// import { useSearchParams } from "next/navigation";

// const BlogsPageComponent = () => {
//   const searchParams = useSearchParams();
//   const category = searchParams.get("category");
//   const limit = searchParams.get("limit");
//   const page = searchParams.get("page");

//   const param = {
//     ...(category && { category }),
//     isPublished: true,
//     page: page || 1,
//     limit: limit || 10,
//   };

//   const { data: blogs, isLoading, error } = useBlogHook(param); // Pass filters here if needed

//   if (isLoading) return <p className="p-10">Loading blogs...</p>;
//   if (error) return <p className="p-10">Failed to load blogs</p>;
//   const paginate = blogs?.data?.paginate;
//   return (
//     <div>
//       <GlobalBanner url={blogs?.data.blogs[0].bannerImage?.url} title="Blogs" />
//       <Container className="mt-10 px-5 md:px-0">
//         <SidebarLayout>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
//             {blogs?.data.blogs?.map((post: any) => (
//               <BlogCard isLoading={isLoading} key={post._id} item={post} />
//             ))}
//           </div>
//         </SidebarLayout>
//       </Container>
//     </div>
//   );
// };

// export default BlogsPageComponent;
"use client";

import { useBlogHook } from "@/hooks/useBlogHook";
import BlogCard from "../shared/card/BlogCard";
import Container from "../shared/container/Container";
import GlobalBanner from "../shared/globalBanner";
import SidebarLayout from "./sidebar-layout";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Button from "../ui/button/button";
import BlogCardSkeleton from "../shared/card/BlogCardSkeleton";

const BlogsPageComponent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const limit = searchParams.get("limit") || "1";
  const page = searchParams.get("page") || "1";

  const param = {
    ...(category && { category }),
    isPublished: true,
    page: parseInt(page),
    limit: parseInt(limit),
  };

  const { data: blogs, isLoading, error } = useBlogHook(param);
  console.log( blogs);
  const paginate = blogs?.data?.paginate;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // if (isLoading) return <p className="p-10">Loading blogs...</p>;
  if (error) return <p className="p-10">Failed to load blogs</p>;

  return (
    <div className="mt-10">
      <GlobalBanner
        url={blogs?.data.blogs[0]?.bannerImage?.url}
        title="Blogs"
      />
      <Container className="mt-10 px-5 md:px-0">
        <SidebarLayout>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:p-4">
            {isLoading ? (
              <BlogCardSkeleton />
            ) : (
              blogs?.data.blogs?.map((post: any) => (
                <BlogCard isLoading={isLoading} key={post._id} item={post} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {paginate && (
            <div className="flex justify-center items-center mt-8 gap-2 w-full">
              <Button
                label="Previous"
                variant="outline"
                className="w-1/4"
                disabled={!paginate.prevPage}
                onClick={() => handlePageChange(paginate.prevPage!)}
              />

              <div className="hidden items-center md:flex gap-1">
                {Array.from({ length: paginate.pages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <Button
                      label={pageNum}
                      key={pageNum}
                      variant={
                        pageNum === paginate.page ? "default" : "outline"
                      }
                      onClick={() => handlePageChange(pageNum)}
                    />
                  ),
                )}
              </div>
              <div className="md:hidden block">
                Page {paginate.page} of {paginate.pages}
              </div>

              <Button
                label="Next"
                variant="outline"
                className="w-1/5"
                disabled={!paginate.nextPage}
                onClick={() => handlePageChange(paginate.nextPage!)}
              />
            </div>
          )}
        </SidebarLayout>
      </Container>
    </div>
  );
};

export default BlogsPageComponent;
