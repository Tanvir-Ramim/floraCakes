"use client";

import Image from "next/image";
import Container from "../../container/Container";
import Link from "next/link";

export default function GiftSection() {
  return (
    <div className=" bg-white px-5 md:px-0">
      {/* Blog Posts Section */}
      <Container className=" md:mt-0 mt-5">
        <section className="md:pt-16  md:pb-12 pt-9 bg-white">
          <div className=" mx-auto  sm:px-6 lg:px-8">
            <div className="bg-gray-50 rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-3 lg:p-8 md:p-6 xl:p-10 flex flex-col justify-center">
                  <div className="mb-6 flex items-center">
                    <svg
                      className="w-8 h-8 text-gray-900 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v13m0-13V6a2 2 0 012-2h3.5a2 2 0 011.7.9l.8 1.2a2 2 0 010 2.2l-.8 1.2a2 2 0 01-1.7.9H12zm0 0V8zm0 13v2a2 2 0 01-2 2H6.5a2 2 0 01-1.7-.9l-.8-1.2a2 2 0 010-2.2l.8-1.2a2 2 0 011.7-.9H12z"
                      />
                    </svg>
                    <h2 className="md:text-3xl text-2xl font-bold text-gray-900 tracking-tight">
                      The Perfect Sweet Gift
                    </h2>
                  </div>

                  <p className="text-gray-600 md:mb-8 mb-6 md:text-lg text-sm   text-justify leading-relaxed">
                    Treat your loved ones to something sweet. Our gift cards let
                    them choose from our premium selection of artisanal cakes
                    and bakery treats.
                  </p>

                  <div className="space-y-4 md:mb-10 mb-6">
                    <div className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-900 mt-0.5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 md:text-base text-sm">
                        Flexible amounts from $25 to $500
                      </span>
                    </div>
                    <div className="flex items-start">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-900 mt-0.5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 md:text-base text-sm">
                        Instant digital delivery or elegant printed card
                      </span>
                    </div>
                    <div className="flex  items-start">
                      <svg
                        className="flex-shrink-0 w-6 h-6 text-gray-900 mt-0.5 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-700 md:text-base text-sm">
                        12-month validity with balance protection
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:mb-0 mb-5 sm:flex-row gap-4">
                    <Link
                      href="/gift"
                      className="md:px-8 px-5 py-3 bg-gray-900 text-white font-medium rounded-sm hover:bg-black transition-colors text-center flex items-center justify-center"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v13m0-13V6a2 2 0 012-2h3.5a2 2 0 011.7.9l.8 1.2a2 2 0 010 2.2l-.8 1.2a2 2 0 01-1.7.9H12zm0 0V8zm0 13v2a2 2 0 01-2 2H6.5a2 2 0 01-1.7-.9l-.8-1.2a2 2 0 010-2.2l.8-1.2a2 2 0 011.7-.9H12z"
                        />
                      </svg>
                      Buy Gift Card
                    </Link>
                  </div>
                </div>

                <div className="relative h-80 md:h-auto bg-gray-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-transparent md:hidden"></div>
                  <Image
                    src="https://i.ibb.co/s9gmTmZw/10665174-4522230.jpg"
                    alt="Elegant cake with gift card"
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm max-w-xs">
                    <h3 className="font-medium text-gray-900 mb-1">
                      Sweet Surprises
                    </h3>
                    <p className="text-sm text-gray-600">
                      Let them indulge in our premium cake selection
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
