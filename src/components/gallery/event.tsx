"use client";
import { IEvent } from "@/@types";
import { buildCloudinaryUrl } from "@/utils/cloudinary";
import Image from "next/image";
import { format } from "date-fns";
import { 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers,
  FaBirthdayCake,
  FaGlassCheers,
  FaRegClock
} from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";

interface IEventPage {
  eventsData: IEvent[];
}

export default function EventsPageComponent({ eventsData }: IEventPage) {
  const corporateEvents = eventsData.filter(event => event.eventType === "Corporate");
  const personalEvents = eventsData.filter(event => event.eventType === "Personal");

  return (
    <section className="py-10 md:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900">
            Our <span className="text-black">Premium</span> Events
          </h1>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
            Immerse yourself in our exquisite cake experiences. From corporate galas to intimate celebrations, 
            each event is crafted with precision and passion.
          </p>
        </div>

        {/* Corporate Events Section */}
        {corporateEvents.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center mb-12">
              <MdBusinessCenter className="text-2xl text-gray-800 mr-3" />
              <h2 className="text-3xl font-semibold text-gray-900">Corporate Events</h2>
              <div className="flex-grow h-px bg-gray-200 ml-6"></div>
            </div>

            <div className="grid grid-cols-1 gap-12">
              {corporateEvents.map((event, index) => (
                <div 
                  key={event._id || index}
                  className="group relative bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 h-80 md:h-96 relative overflow-hidden">
                      <Image
                        src={buildCloudinaryUrl(event?.eventImage?.url || "file_njab2p")}
                        alt={event?.eventImage?.alt || "Event"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="lg:w-1/2 p-8 md:p-10">
                      <div className="flex items-center mb-4">
                        <BiSolidCategory className="text-gray-600 mr-2" />
                        <span className="text-sm font-medium text-gray-600">
                          {event.eventType} Event
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold mb-5 text-gray-900 leading-tight">
                        {event.eventName}
                      </h3>
                      <p className="text-gray-600 mb-7 leading-relaxed">
                        {event.description || "An exquisite event featuring our finest cake creations and culinary expertise."}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                        <div className="flex items-start">
                          <FaCalendarAlt className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Date</p>
                            <p className="text-gray-900 font-medium">
                              {format(new Date(event?.eventDate), "MMMM do, yyyy")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaRegClock className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Time</p>
                            <p className="text-gray-900 font-medium">
                              {event.eventTime || "6:00 PM"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaMapMarkerAlt className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Location</p>
                            <p className="text-gray-900 font-medium">{event.eventAddress.location}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaUsers className="text-gray-700 mt-1 mr-3 flex-shrink-0" />
                          <div>
                            <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Attendees</p>
                            <p className="text-gray-900 font-medium">{event.estimateGuest}</p>
                          </div>
                        </div>
                      </div>

                      {event?.cakeInfo?.images?.length > 0 && (
                        <div>
                          <div className="flex items-center mb-4">
                            <FaBirthdayCake className="text-gray-700 mr-3" />
                            <h4 className="text-lg font-semibold text-gray-900">Featured Cakes</h4>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {event.cakeInfo.images.map((img, i) => (
                              <div 
                                key={i} 
                                className="relative h-28 w-28 overflow-hidden transition-transform duration-300 hover:scale-110"
                              >
                                <Image
                                  src={img.url}
                                  alt={img.alt || "Cake"}
                                  fill
                                  className="object-cover"
                                  sizes="112px"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Personal Events Section */}
        {personalEvents.length > 0 && (
          <div>
            <div className="flex items-center mb-12">
              <FaGlassCheers className="text-2xl text-gray-800 mr-3" />
              <h2 className="text-3xl font-semibold text-gray-900">Personal Celebrations</h2>
              <div className="flex-grow h-px bg-gray-200 ml-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalEvents.map((event, index) => (
                <div
                  key={event._id || index}
                  className="group relative bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
                >
                  <div className="h-64 relative overflow-hidden">
                    <Image
                      src={buildCloudinaryUrl(event?.eventImage?.url || "file_yobkfn")}
                      alt={event?.eventImage?.alt || "Event"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <BiSolidCategory className="text-gray-600 mr-2 text-sm" />
                      <span className="text-xs font-medium text-gray-600">
                        {event.eventType} Event
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 leading-snug">
                      {event.eventName}
                    </h3>
                    
                    <div className="space-y-3 mt-5">
                      <div className="flex items-start">
                        <FaCalendarAlt className="text-gray-700 mt-0.5 mr-3 text-sm flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Date</p>
                          <p className="text-gray-900 text-sm font-medium">
                            {format(new Date(event?.eventDate), "MMM do, yyyy")}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-gray-700 mt-0.5 mr-3 text-sm flex-shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">Location</p>
                          <p className="text-gray-900 text-sm font-medium line-clamp-2">
                            {event.eventAddress.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {eventsData.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-6">🍰</div>
            <h3 className="text-2xl font-medium text-gray-900 mb-3">
              No upcoming events
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              We're preparing something special. Check back soon for our next events.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}