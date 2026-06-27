import { useBlogHook } from "@/hooks/useBlogHook";
import { Search } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  // Fetch categories (only category field)
  const { data: categoriesData, isLoading: categoriesLoading } = useBlogHook({
    fields: "category",
    isPublished: true,
    distinct: "category",
  });

  // Fetch latest posts (limited fields)
  const { data: latestPostsData, isLoading: latestPostsLoading } = useBlogHook({
    fields: "title blogId publishDate",
    isPublished: true,
    limit: 5,
  });

  // Extract data safely and transform categories
  console.log(categoriesData);
  const categories =
    categoriesData?.data?.blogs?.map((item: any) => item) || [];
  const latestPosts = latestPostsData?.data?.blogs || [];

  return (
    <div className="flex flex-col space-y-8">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search our blog..."
          className="w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Search size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        {categoriesLoading ? (
          <div className="space-y-2 animate-pulse">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center">
                <span className="mr-2 text-gray-500">•</span>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-2">
            {categories.map((category: string, index: number) => (
              <li key={index} className="flex items-center">
                <span className="mr-2 text-gray-500">•</span>
                <Link
                  href={`/blog?category=${category}`}
                  className="text-gray-700 hover:text-gray-900 capitalize"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Latest Posts */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Latest posts</h3>
        {latestPostsLoading ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="border-b border-gray-100 pb-3 last:border-0"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {latestPosts.map((post: any) => (
              <div
                key={post.blogId}
                className="border-b border-gray-100 pb-3 last:border-0"
              >
                <Link
                  href={`/blog/${post.blogId}`}
                  className="text-gray-700 hover:text-gray-900 font-medium line-clamp-2"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
