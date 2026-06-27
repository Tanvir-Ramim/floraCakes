import Image from "next/image";
import { format } from "date-fns";
import { IGalleryItem } from "@/hooks/cmsHook";
import { Calendar,  MapPin } from "lucide-react";
import { createSafeHTML } from "@/components/utils/safe-html";

interface GalleryCardProps {
  item: IGalleryItem;
}

export default function GalleryCard({ item }: GalleryCardProps) {
  return (
    <>
      <div className="lg:w-1/2 h-64 lg:h-auto relative">
        <Image
          src={item?.image?.url}
          alt={item?.image?.alt || "Gallery image"}
          fill
          className="w-full h-full object-cove"
        />
      </div>

      <div className="lg:w-1/2 p-6 lg:p-8">
        <h3 className="lg:text-2xl font-bold mb-3">{item?.eventName}</h3>

        {item?.description && (
       
                    <p
                
                  className="text-sm text-cardsub mb-6 leading-relaxed line-clamp-10"
                  dangerouslySetInnerHTML={{
                    __html: createSafeHTML(item?.description),
                  }}
                />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-title mr-2 mt-0.5" />
            <span> {format(new Date(item?.date), "MMMM do, yyyy")}</span>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-title mr-2 mt-0.5" />
            <span>{item?.location}</span>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div key={item?.id} className="mb-16">
  <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
    <div
      className={`flex flex-col lg:flex-row ${
        index % 2 !== 0 ? "lg:flex-row-reverse" : ""
      }`}
    >
      <div className="lg:w-1/2 h-64 lg:h-auto relative">
        <Image
          src={item?.image || "/placeholder.svg"}
          alt={item?.title}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-title text-white px-3 py-1 rounded-full text-sm font-medium">
          Featured
        </div>
      </div>
      <div className="lg:w-1/2 p-6 lg:p-8">
        <h3 className="lg:text-2xl font-bold mb-3">{item?.title}</h3>
        <p className="text-subtitle text-justify mb-6">{item?.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-title mr-2 mt-0.5" />
            <span>{item?.date}</span>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-title mr-2 mt-0.5" />
            <span>{item?.time}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-title mr-2 mt-0.5" />
            <span>{item?.location}</span>
          </div>
          <div className="flex items-start">
            <Users className="h-5 w-5 text-title mr-2 mt-0.5" />
            <span>{item?.spots}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="lg:text-xl font-bold text-title">{item?.price}</span>
        </div>
      </div>
    </div>
  </div>
</div>;  */
}
