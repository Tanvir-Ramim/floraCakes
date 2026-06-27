import Container from "@/components/shared/container/Container";
import GlobalBanner from "@/components/shared/globalBanner";
import {
  Cake,
  Clock,
  MapPin,
  Users,
  Heart,
  Award,
  Sparkles,
  Calendar,
} from "lucide-react";
import Image from "next/image";

const aboutData = {
  title: "Our Sweet Journey",
  subtitle: "Crafting Memories, One Cake at a Time",
  description: [
    "In a fast-paced world where meaningful moments with loved ones can slip through our fingers and the demands of daily life often obscure the things that truly matter, SweetDelights is your partner in creating genuine human connections that you dearly crave. For 15 wonderful years, we've not only added extra sparkle to numerous celebrations but have also touched many souls and measured countless relationships.",
    "Our journey has always walked hand in hand with your evolving needs and changing tastes. And every cake we create, whether it be a delectable cake because of a personalized wedding cake or a birthday cake, is crafted with love, gratitude, and affection.",
    "Now, we renew our vows by breathing new life into SweetDelights, infusing it with a modern touch—one that champions luxury, aesthetics, and the deepest emotions—to align with the ever-shifting realm of gifting. Yet, at its core, the heart of SweetDelights remains the same, unwavering in its commitment. After all, we don't just deliver cakes, we facilitate the expression of your feelings and the forging of deep ties with those you cherish. This promise has been our guiding light for years and now, with the dawn of a redefined SweetDelights, it shines with even more warmth to help you keep that flame of love burning!",
  ],
  address:
    "Corporate Office Address - C2, 1st Floor, South City, Block C, Old DLF Colony, Sector 14, Gurugram, Haryana 122007",
  stats: [
    { icon: Cake, value: "20+ Mn", label: "Cakes Delivered" },
    { icon: MapPin, value: "2000+", label: "Pincodes Covered" },
    { icon: Clock, value: "620+ Cities", label: "Enjoying same-day delivery" },
    {
      icon: Users,
      value: "1100+ Skilled",
      label: "Bakers & Decorators On Board",
    },
  ],
  journey: [
    {
      year: "2010",
      event:
        "Founded in a cozy Gurugram basement with just two ovens and a dream to redefine celebration cakes in India",
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      year: "2011",
      event:
        "Opened our flagship store in Gurugram, marking our transition from home bakery to professional patisserie",
    },
    {
      year: "2013",
      event:
        "Officially incorporated as SweetDelights Pvt. Ltd., establishing our formal presence in the Indian bakery industry",
    },
    {
      year: "2014",
      event:
        "Expanded our menu beyond cakes to include artisanal cookies, French pastries, and dessert tables for weddings",
    },
  ],
  team: [
    {
      name: "Emily Johnson",
      role: "Master Baker & Founder",
      image: "https://i.ibb.co/wxk01rL/pexels-italo-melo-881954-2379005-1.jpg",
      bio: "With over 15 years of experience in pastry arts, Emily founded SweetDelights with a vision to create not just cakes, but memories.",
    },
    {
      name: "Michael Chen",
      role: "Head of Cake Design",
      image: "/man1.avif",
      bio: "A graduate from the prestigious Le Cordon Bleu, Michael brings artistic flair and innovation to every cake design.",
    },
    {
      name: "Sophia Rodriguez",
      role: "Customer Experience Manager",
      image: "https://i.ibb.co/yFs5JLG5/pexels-italo-melo-881954-2379004.jpg",
      bio: "Sophia ensures that every customer interaction with SweetDelights is as delightful as our cakes.",
    },
  ],
  values: [
    {
      title: "Passion",
      description: "We pour our heart into every creation",
      icon: Heart,
    },
    {
      title: "Excellence",
      description: "Relentless pursuit of perfection in taste and design",
      icon: Award,
    },
    {
      title: "Creativity",
      description: "Innovative designs that tell your story",
      icon: Sparkles,
    },
    {
      title: "Tradition",
      description: "Honoring time-tested baking techniques",
      icon: Calendar,
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="pt">
        <GlobalBanner title="About Us" />
      </div>
      <Container className="md:py-14 py-10 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="mb text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="md:text-4xl text-2xl font-bold mb-4 tracking-tight text-gray-900">
              {aboutData.title}
            </h1>
            <p className="md:text-base text-sm text-gray-600 mb-12">
              {aboutData.subtitle}
            </p>
            {/* <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/cake.webp"
                alt="Our Team"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <span className="text-white text-xl md:text-2xl font-medium px-4 py-2 backdrop-blur-sm rounded-lg">
                  Crafting Sweet Memories Since 2010
                </span>
              </div>
            </div> */}
          </div>
        </section>

        {/* Our Story */}
        <section className="md:mb-20 mb-14  mx-auto">
          {/* <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900 border-b border-gray-200 pb-4">
            Our Story
          </h2> */}
          <div className="space-y-6">
            {aboutData.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 text-justify leading-relaxed md:text-lg "
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-24">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aboutData.values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-6">
                  <value.icon className="h-12 w-12 text-gray-900" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-20 bg-gray-900 md:py-16 py-10 md:px-6 px-3 rounded-xl">
          <h2 className="text-xl md:text-2xl font-bold mb-12 text-center text-white">
            SweetDelights, when words are not enough
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-lg text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-center mb-6">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-base md:text-lg font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Journey Timeline */}
        <section className="mb-24 px-4 sm:px-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 md:mb-16 text-center text-gray-900">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline line - hidden on mobile, visible from md up */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200"></div>

            {/* Timeline events */}
            <div className="space-y-10 md:space-y-16">
              {aboutData.journey.map((milestone, index) => (
                <div key={index} className="relative">
                  <div className="absolute md:left-1/2 left-0 transform md:-translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white rounded-full w-10 h-10 md:w-16 md:h-16 flex items-center justify-center z-10 shadow-lg">
                    <span className="font-bold text-sm md:text-lg">
                      {milestone.year}
                    </span>
                  </div>

                  <div
                    className={`flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    } mt-8 md:mt-0`}
                  >
                    <div className="hidden md:block md:w-1/2"></div>

                    <div
                      className={`w-full md:w-1/2 ${
                        index % 2 === 0
                          ? "md:pr-6 lg:pr-12"
                          : "md:pl-6 lg:pl-12"
                      } ${index === 0 ? "mt-0" : "mt-6 md:mt-0"}`}
                    >
                      <div className="bg-white p-5 sm:p-6 rounded-lg shadow-md border border-gray-100">
                        <p className="text-gray-700 text-base sm:text-lg">
                          {milestone.event}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="md:mb-20 mb-14">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center text-gray-900">
            Meet Our Master Bakers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aboutData.team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-gray-300">{member.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Address */}
        <section className="text-center text-gray-600 md:text-lg bg-gray-50 py-8 rounded">
          <MapPin className="h-8 w-8 mx-auto mb-4 text-gray-900" />
          <p className="max-w-2xl mx-auto">{aboutData.address}</p>
        </section>
      </Container>
    </div>
  );
}
