import type { BlogCardProps } from "@/@types";
import { createSafeHTML } from "@/components/utils/safe-html";
import { buildCloudinaryUrl } from "@/utils/cloudinary";
import Image from "next/image";
import Link from "next/link";
import BlogCardSkeleton from "./BlogCardSkeleton";

const BlogCard = ({
  item,
  isLoading,
}: BlogCardProps & { isLoading?: boolean }) => {
  const mainImageUrl = buildCloudinaryUrl(
    item?.thumbImage?.public_id,
    "q_auto,f_auto,w_1000,h_800,c_fill"
  );
  const date = new Date(item?.createdAt);
  // Show skeleton while loading
  if (isLoading) {
    return <BlogCardSkeleton />;
  }

  if (!item) return <BlogCardSkeleton />;
  return (
    <div className="bg-white">
      {item?.thumbImage && (
        <div className="mb-6 relative w-full">
          <Image
            src={mainImageUrl}
            alt={item.title}
            width={800}
            height={800}
            sizes="100vw"
            className="w-full h-auto"
          />
        </div>
      )}
      <Link href={`/blog/${item?.blogId}`}>
        <h3 className="text-xl line-clamp-2 font-medium text-title hover:text-author mb-2">
          {item?.title}
        </h3>
      </Link>
      <p className="text-sm text-cardsub mb-4">
        By <span className="text-author">{item?.author}</span> /{" "}
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>
      <p
        className="text-sm text-cardsub mb-6 leading-relaxed"
        dangerouslySetInnerHTML={{
          __html: createSafeHTML(item?.shortDescription, 100),
        }}
      />

      <Link
        href={`/blog/${item?.blogId}`}
        className="inline-block border-2 border-border-color px-8 py-3 text-title text-sm hover:border-author hover:text-author transition-colors"
      >
        Read More
      </Link>
    </div>
  );
};

export default BlogCard;
