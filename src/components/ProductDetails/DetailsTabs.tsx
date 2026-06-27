"use client";

import { tabs } from "@/constants";
import { IReview } from "@/services/review.service";

import Image from "next/image";
import { useState } from "react";

const DetailsTabs = ({
  review,
  description,
  additional,
}: {
  review: IReview[];
  description: string;
  additional: string;
}) => {
  const [activeTab, setActiveTab] = useState("description");
  return (
    <div>
      {" "}
      {/* Product Details Tabs */}
      <div className="md:my-8 my-2 w-full">
        <div className="flex flex-wrap space-x-5 overflow-x-auto mx-3 lg:mx-0 scrollbar-hide">
          {/* Loop through tab data and render button for each. */}
          {tabs.map((tab) => {
            return (
              <button
                key={tab.key}
                type="button"
                className={`py-2 cursor-pointer transition-colors whitespace-nowrap duration-300 ${
                  tab.key === activeTab
                    ? "border-b-2 border-black text-title"
                    : "text-price"
                }`}
                // Change the active tab on click.
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
        <div className="py-6">
          {activeTab === "description" && (
            <div className=" text-sm text-subtitle">
              <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
            </div>
          )}

          {activeTab === "additional" && (
            <div className="text-sm text-subtitle">
              <h3 className="text-lg font-medium mb-3">
                Additional Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {additional && additional !== "" ? (
                  <p
                    className="text-gray-600"
                    dangerouslySetInnerHTML={{ __html: additional }}
                  />
                ) : (
                  <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                      Cake Handling & Event Instructions
                    </h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                      <li>
                        Store the cake in a cool, dry place — ideally below
                        25°C.
                      </li>
                      <li>
                        If cream-based, refrigerate and take out 30 minutes
                        before serving.
                      </li>
                      <li>
                        Use a clean, serrated knife for cutting; wipe between
                        slices for a neat look.
                      </li>
                      <li>
                        During events, cut from the back if you want to preserve
                        front decoration for photos.
                      </li>
                      <li>
                        Do not throw or smash the cake into anyone’s face — it’s
                        a waste and can cause harm.
                      </li>
                      <li>
                        Avoid placing the cake in direct sunlight or near heat
                        sources.
                      </li>
                      <li>
                        If transporting, keep the cake flat and level in a
                        secure box.
                      </li>
                      <li>
                        Consume within 24–48 hours for the best taste and
                        texture.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="text-sm text-subtitle">
              <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
              <p className="mb-4">Free shipping on all orders over $500.</p>
              <p className="mb-2 font-medium">Estimated Delivery:</p>
              <p className="mb-4">28 - 07 May, 2025</p>

              <h3 className="text-lg font-medium mb-3 mt-6">Return Policy</h3>
              <p>
                Returns accepted within 30 days of delivery. Item must be unused
                and in original packaging.
              </p>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="text-sm text-subtitle">
              <div className="space-y-6">
                {review.length > 0 &&
                  review.map((rv: IReview, ind: number) => (
                    <div key={ind} className="border-b pb-4">
                      <div className="flex items-center mb-2">
                        <p className="font-medium">{rv.user}</p>
                        <p className="text-gray-500 text-sm ml-4">
                          {new Date(rv.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {Array.from({ length: rv.rating ?? 0 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p>{rv.comment}</p>

                      {rv.image?.url && rv.image.url !== "" && (
                        <div className="mt-2">
                          <Image
                            src={rv.image.url}
                            alt={rv.cakeName}
                            width={200}
                            height={200}
                            className="max-w-full h-auto rounded"
                          />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsTabs;
