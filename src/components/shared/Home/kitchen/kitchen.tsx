"use client";
import Image from "next/image";
// import KitchenSlider from "./KitchenSlider";
import { useContent } from "@/hooks/cmsHook";
import Link from "next/link";

const Kitchen = () => {
  // banner fetch
  const params = {
    section: "footer",
    pageName: "Home",
    isActive: true,
    limit: 1,
  };

  const { data, isLoading } = useContent(params);
  const banners = data?.data?.contents[0];

  if (isLoading) {
    return (
      <div className="relative py-18 lg:px-20 md:px-12 px- 6 border border-[#E7E7E7] rounded lg:h-screen bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-[#979696] opacity-10 rounded" />
        <div className="relative z-10 lg:mt-12 space-y-4">
          <div className="h-36 w-full bg-gray-300 rounded" />
          <div className="h-4 w-[45%] bg-gray-300 rounded" />
          <div className="h-10 w-[150px] bg-gray-300 rounded mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="relative w-full ">
       
          <Image
            src={banners?.image.url}
            width={1000}
            height={600}
            alt={banners?.image.alt || "CHef"}
    
            sizes="100vw"
            priority
          ></Image>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/30"></div>
          {/* Text Overlay with Animations */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 md:px-12">
            <div className="max-w-3xl text-center space-y-6">
              <h2
                className={`text-3xl md:text-5xl font-bold transform transition-all duration-700 
                
              `}
              >
                {banners?.title}
              </h2>
            </div>
          </div>
       
      </div>
   
    </div>
  );
};

export default Kitchen;
