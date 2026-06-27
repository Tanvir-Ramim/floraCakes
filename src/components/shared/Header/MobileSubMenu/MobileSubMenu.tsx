
// // "use client";
// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import { BsArrowLeft } from "react-icons/bs";
// // interface SubMenuItem {
// //   name: string;
// //   href: string;
// //   tag?: string;
// // }

// // interface MobileSubMenuProps {
// //   subMenu: SubMenuItem[];
// //   category: string;
// //   onBack: () => void;
// // }

// // export const MobileSubMenu = ({ subMenu, category, onBack }: MobileSubMenuProps) => {
// //   return (
// //     <motion.div
// //       initial={{ x: "-100%" }}
// //       animate={{ x: 0 }}
// //       exit={{ x: "-100%" }}
// //       transition={{ duration: 0.3, ease: "easeInOut" }}
// //       className="bg-white absolute left-0 top-0 w-full h-screen"
// //     >
// //       <div className="flex items-center bg-bg-nav gap-2  cursor-pointer text-white text-sm py-4 px-6">
// //         <BsArrowLeft className="w-5 h-5" onClick={onBack} />

// //         <span className="">{category}</span>
// //       </div>
// //       <div className="mt-4">
// //         {subMenu.map((item, index) => (
// //           <div
// //             key={index}
// //             className="py-2.5 px-6  flex items-center justify-between"
// //           >
// //             <div className="flex items-center text-title text-sm gap-2">
// //               <Link href={item.href}>
// //                 <span className="">{item.name}</span>
// //               </Link>
// //               {item.tag && (
// //                 <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded">
// //                   {item.tag}
// //                 </span>
// //               )}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </motion.div>
// //   );
// // };



// "use client";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { BsArrowLeft } from "react-icons/bs";

// interface SubMenuItem {
//   id: string;
//   name: string;
//   href: string;
//   tag?: string;
// }

// interface MobileSubMenuProps {
//   subMenu: SubMenuItem[];
//   category: string;
//   onBack: () => void;
// }

// export const MobileSubMenu = ({ subMenu, category, onBack }: MobileSubMenuProps) => {
//   return (
//     <motion.div
//       initial={{ x: "-100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "-100%" }}
//       transition={{ duration: 0.3, ease: "easeInOut" }}
//       className="bg-white absolute left-0 top-0 w-full h-screen"
//     >
//       {/* Header */}
//       <button
//         type="button"
//         onClick={onBack}
//         className="w-full flex items-center gap-2 bg-bg-nav text-white text-sm py-4 px-6"
//       >
//         <BsArrowLeft className="w-5 h-5" />
//         <span>{category}</span>
//       </button>

//       {/* Submenu Links */}
//       <div className="mt-4 flex flex-col">
//         {subMenu.map((item) => (
//           <Link
//             key={item.id}
//             href={item.href}
//             className="py-2.5 px-6 flex items-center justify-between text-gray-700 hover:text-black"
//           >
//             <span className="text-sm">{item.name}</span>
//             {item.tag && (
//               <span
//                 className={`text-[10px] px-1.5 py-0.5 rounded ${
//                   item.tag === "HOT!"
//                     ? "bg-red-500 text-white"
//                     : item.tag === "NEW!" || item.tag === "NEW"
//                     ? "bg-green-500 text-white"
//                     : "bg-blue-500 text-white"
//                 }`}
//               >
//                 {item.tag}
//               </span>
//             )}
//           </Link>
//         ))}
//       </div>
//     </motion.div>
//   );
// };


"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";

interface SubMenuItem {
  id: string;
  name: string;
  href: string;
  tag?: string;
}

interface SubMenuGroup {
  header: string;
  items: SubMenuItem[];
}

type SubMenuEntry = SubMenuItem | SubMenuGroup;

interface MobileSubMenuProps {
  subMenu: SubMenuEntry[];
  category: string;
  onBack: () => void;
}

export const MobileSubMenu = ({ subMenu, category, onBack }: MobileSubMenuProps) => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white absolute left-0 top-0 w-full overflow-y-auto h-screen"
    >
      {/* Header */}
      <button
        type="button"
        onClick={onBack}
        className="w-full flex items-center gap-2 bg-bg-nav text-white text-sm py-4 px-6"
      >
        <BsArrowLeft className="w-5 h-5" />
        <span>{category}</span>
      </button>

      <div className="mt-4 flex flex-col pb-5 space-y-4">
        {subMenu.map((entry, index) => {
          // If entry is a group
          if ("header" in entry) {
            return (
              <div key={entry.header + index} className="flex flex-col space-y-2">
                <span className="px-6 text-black font-semibold text-xs uppercase tracking-wide">
                  {entry.header}
                </span>
                {entry.items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="py-2.5 px-6 flex items-center justify-between text-gray-600 hover:text-black"
                  >
                    <span className="text-sm">{item.name}</span>
                    {item.tag && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded ${
                          item.tag === "HOT!"
                            ? "bg-red-500 text-white"
                            : item.tag === "NEW!" || item.tag === "NEW"
                            ? "bg-green-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            );
          }
          // Else entry is a single item
          return (
            <Link
              key={entry.id}
              href={entry.href}
              className="py-2.5 px-6 flex items-center justify-between text-gray-700 hover:text-black"
            >
              <span className="text-sm">{entry.name}</span>
              {entry.tag && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded ${
                    entry.tag === "HOT!"
                      ? "bg-red-500 text-white"
                      : entry.tag === "NEW!" || entry.tag === "NEW"
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {entry.tag}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
