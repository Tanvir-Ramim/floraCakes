"use client";

import { navItems } from "@/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Collections from "./Collections";
import Others from "./Others";

const DesktopNavigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div>
      <div className="lg:flex hidden items-center gap-[.625rem]">
        {navItems.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link href={item.href}>
              <li
                className="list-none text-gray mr-7.5
				 py-5 text-sm flex items-center font-medium
				  hover:text-primary duration-300 cursor-pointer"
              >
                {item.label}
                <svg
                  className="ms-1"
                  width="8"
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <title>Chevron Down</title>
                  <path
                    fill="currentColor"
                    d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z"
                  />
                </svg>
              </li>
            </Link>

            {/* Dropdown Submenu */}
            <AnimatePresence>
              {item.subMenu && hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute grid lg:grid-cols-5 max-w-[1300px] mx-auto right-0 left-0 bg-[#ffffff] gap-x-2.5 rounded shadow-custom mt-2 p-7.5 px-12 z-[99]"
                >
                  {Object.entries(item.subMenu).map(([category, links]) => (
                    <div
                      key={category}
                      className="mb-2 border-r mr-2.5 overflow-y-auto h-64 border-border-color"
                    >
                      <p className="font-medium text-title text-sm pb-1 mb-2">
                        {category.replace("_", " ")}
                      </p>
                      {Array.isArray(links) &&
                        links.map((entry) =>
                          "header" in entry ? (
                            // Group with header
                            <div key={entry.header} className="mb-4">
                              <h4 className="text-xs uppercase font-semibold mb-2">
                                {entry.header}
                              </h4>
                              <ul className="text-[#a3a3a3] text-xs font-light">
                                {entry.items.map((subItem) => (
                                  <li
                                    key={subItem.id}
                                    className="mt-1 gap-1 leading-5 flex items-center
									 hover:text-black"
                                  >
                                    <Link
                                      href={`/cakes?name=${encodeURIComponent(
                                        subItem.name.toLowerCase()
                                      )}`}
                                    >
                                      {subItem.name}
                                      {subItem.tag && (
                                        <span
                                          className={`ml-1 text-[10px] px-1.5 py-0.5 rounded ${
                                            subItem.tag === "HOT!"
                                              ? "bg-red-500 text-white"
                                              : subItem.tag === "NEW!" ||
                                                subItem.tag === "NEW"
                                              ? "bg-green-500 text-white"
                                              : "bg-blue-500 text-white"
                                          }`}
                                        >
                                          {subItem.tag}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            // Simple item
                            <ul
                              key={entry.id}
                              className="text-[#a3a3a3] text-xs font-light"
                            >
                              <li className="mt-1 gap-1 leading-5 flex items-center hover:text-black">
                                <Link
                                  href={`/cakes?name=${encodeURIComponent(
                                    entry.name.toLowerCase()
                                  )}`}
                                >
                                  {entry.name}
                                  {entry.tag && (
                                    <span
                                      className={`ml-1 text-[10px] px-1.5 py-0.5 rounded ${
                                        entry.tag === "HOT!"
                                          ? "bg-red-500 text-white"
                                          : entry.tag === "NEW!" ||
                                            entry.tag === "NEW"
                                          ? "bg-green-500 text-white"
                                          : "bg-blue-500 text-white"
                                      }`}
                                    >
                                      {entry.tag}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            </ul>
                          )
                        )}
                    </div>
                  ))}

                  <div className="relative">
                    <Link href="/custom-cake">
                      <h2 className="bg-[#0DCAF0] z-50 relative text-[#fff] text-sm capitalize px-2 py-1 rounded inline-flex">
                        Custom Cake !
                      </h2>
                      <Image
                        src={"https://imgcdn.floweraura.com/fruit_cake_0.jpg"}
                        alt="menuImage"
                        width={800}
                        height={800}
                        className="mt-[-28px]"
                      />
                      <p className="mt-1 capitalize text-[12px]">
                        Customize Your Cake
                      </p>
                      <p className="mt-1 capitalize text-[14px] text-[#0DCAF0] font-semibold">
                       Order Now
                      </p>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}

        {/* Collections */}
        <div
          onMouseEnter={() => setHoveredItem("collections")}
          onMouseLeave={() => setHoveredItem(null)}
        >
          <Link href={"/collections"}>
            <li className="list-none text-gray mr-7.5 py-5 text-sm flex items-center font-medium hover:text-primary duration-300 cursor-pointer">
              Collections
              <svg
                className="ms-1"
                width="8"
                height="15"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <title>Chevron Down</title>
                <path
                  fill="currentColor"
                  d="M151.5 347.8L3.5 201c-4.7-4.7-4.7-12.3 0-17l19.8-19.8c4.7-4.7 12.3-4.7 17 0L160 282.7l119.7-118.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17l-148 146.8c-4.7 4.7-12.3 4.7-17 0z"
                />
              </svg>
            </li>
          </Link>

          {/* Collections dropdown */}
          <AnimatePresence>
            {hoveredItem === "collections" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute max-w-[1300px] mx-auto right-0 left-0 bg-[#ffffff] rounded shadow-custom mt-2 py-8 px-12 z-[99]"
              >
                <Collections />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <Others />
        </div>
      </div>
    </div>
  );
};

export default DesktopNavigation;
