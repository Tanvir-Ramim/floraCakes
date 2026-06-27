"use client";
import Image from "next/image";
import BlogCard from "../shared/card/BlogCard";
import Social from "../ui/Social/Social";
import SidebarLayout from "./sidebar-layout";
import { createSafeHTML } from "../utils/safe-html";
import { useBlogHook } from "@/hooks/useBlogHook";

interface BlogPostParams {
  blog: any;
}

export default function BlogPostDetails({ blog }: BlogPostParams) {
  const { data: relatedBlogs, isLoading } = useBlogHook({
    category: blog.category,
    isPublished: true,
    limit: 4,
    fields: "-createdAt -updatedAt -__v -_id",
  });

  console.log(relatedBlogs?.data?.blogs);
  const date = new Date(blog?.publishDate);
  return (
    <SidebarLayout>
      <article className="container mx-auto    md:px-6 px-3">
        {/* Main image */}
        <div className="relative w-full h-[400px]  mb-6 overflow-hidden rounded-md">
          <Image
            src={blog.thumbImage.url}
            alt={blog.thumbImage.title}
            className="w-full h-full object-cover"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-xl md:text-3xl font-bold text-title mb-2">
          {blog.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <p className="text-sm text-cardsub mb-4">
            By <span className="text-author">{blog.author}</span> /{" "}
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/*  paragraph */}
        {blog.bodyContent.length &&
          blog.bodyContent.map(
            (
              cb: { description: string; image: { url: string } },
              i: number
            ) => (
              <>
                <p
                  key={i}
                  className="text-sm text-cardsub mb-6 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: createSafeHTML(cb?.description),
                  }}
                />

                {cb?.image?.url && (
                  <div className="relative w-full h-[200px] mb-6 overflow-hidden rounded-md">
                    <Image
                      src={cb?.image?.url}
                      alt="Product detail"
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                    />
                  </div>
                )}
              </>
            )
          )}

        <div className="flex flex-col md:flex-row justify-start gap-5  py-2">
          <p className="text-subtitle text-sm">Share this post :</p>
          <Social
            shareUrl={`http:localhost:3000/blog/${
              blog.blogId
            }?title=${encodeURIComponent(blog.title).toLowerCase()}`}
          />
        </div>
        {/* Related Blog */}
        <div className="mt-10 border-t border-border-color pt-6">
          <h3 className="text-xl font-semibold mb-4">Related Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedBlogs?.data?.blogs.map((product: any) => (
              <BlogCard
                key={product.blogId}
                isLoading={isLoading}
                item={product}
              />
            ))}
          </div>
        </div>
      </article>
    </SidebarLayout>
  );
}
