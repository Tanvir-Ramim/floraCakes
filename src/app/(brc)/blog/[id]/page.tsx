// import BlogPostDetails from "@/components/blogs/blog-details-page";
// import GlobalBanner from "@/components/shared/globalBanner";
// import { blogPosts } from "@/constants/filterdata";
// import { Metadata } from "next";

// export const metadata: Metadata = {
// 	title: "Plastic Dining Armchair - Buy Now",
// 	description:
// 		"High-quality plastic dining armchair, stylish and comfortable. Shop now!",
// };

// // Generate static paths for all products
// export async function generateStaticParams() {
// 	// Use the sample product data from constants
// 	return blogPosts.map((product) => ({
// 		id: product.title.replace(/\s+/g, "-").toLowerCase(),
// 	}));
// }

// const BlogDetailPage = async ({
// 	params,
// }: {
// 	params: Promise<{ id: string }>;
// }) => {
// 	const { id } = await params;
// 	console.log(id);
// 	return (
// 		<div>
// 			<GlobalBanner title="Blog details" />

// 			<BlogPostDetails params={{ slug: id }} />
// 		</div>
// 	);
// };

// export default BlogDetailPage;

import GlobalBanner from "@/components/shared/globalBanner";
import BlogPostDetails from "@/components/blogs/blog-details-page";

import { Metadata } from "next";
import blogService from "@/services/blog.service";

// Pre-render static paths (optional)
// export async function generateStaticParams() {
//   const data = await blogService.getFilterBlogs();
//   let blogs = [];
//   if (data) {
//     blogs = data.data.blogs;
//     return blogs.map((b) => ({ id: b.blogId }));
//   }

//   return [];
// }

// For SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const data = await blogService.getBlogById(params.id);
  const blog = data.data;
  console.log(blog);

  return {
    title: blog?.title || "Blog",
    description:
      blog?.shortDescription?.[0]?.slice(0, 150) || "Read our latest blog post",
  };
}

// Main Component
export default async function BlogDetailPage({
  params,
}: {
  params: { id: string };
}) {
  console.log("id", params.id);
  const data = await blogService.getBlogById(params.id);
  const blog = data.data;
  console.log("meta", blog);
  if (!blog) return <div className="p-10">Blog not found.</div>;

  return (
    <>
      <GlobalBanner url={blog.bannerImage.url} title="Blog Details" />
      <BlogPostDetails blog={blog} />
    </>
  );
}
