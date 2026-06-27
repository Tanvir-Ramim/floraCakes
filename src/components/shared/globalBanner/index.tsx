"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface GlobalProps {
  title: string;
  url?:string
}

const GlobalBanner = ({ title,url }: GlobalProps) => {
  const pathname = usePathname();

  // Get the path from the current URL
  const pathParts = pathname?.split("/").filter((part) => part) || [];

  // Create a more readable format for display
  const breadcrumbs = pathParts.map((part) => {
    // Convert kebab-case to readable format (e.g., "best-seller" to "Best Seller")
    const formattedPart = part
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      path: `/${pathParts.slice(0, pathParts.indexOf(part) + 1).join("/")}`,
      label: formattedPart,
    };
  });

  return (
    <div className="relative h-[200px] md:h-[400px]  w-full">
      <Image
        src={url || "https://i.ibb.co.com/GQV9t50m/484331654-623346073801632-6466134607866325071-n.jpg"}
        alt="banner"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-white/50"></div>
      {/* Text Overlay with Animations */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-12">
        <div className="max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-5xl font-bold transform transition-all duration-700">
            {title}
          </h2>
          <p className="text-sm">
            <Link href="/" className=" hover:underline">
              Home
            </Link>
            {breadcrumbs.map((item, index) => (
              <span key={index}>
                {" / "}
                {index === breadcrumbs.length - 1 ? (
                  <span className="text-gray-300">{item.label}</span>
                ) : (
                  <Link href={item.path} className=" hover:underline">
                    {item.label}
                  </Link>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalBanner;
