// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import { BsArrowLeft } from "react-icons/bs";
// import { HiOutlineXMark } from "react-icons/hi2";
// import logo from "../../../../app/(brc)/assets/logo/Full Logo Black.svg";
// import { MobileSubMenu } from "../MobileSubMenu/MobileSubMenu";

// interface SubMenuItem {
// 	name: string;
// 	href: string;
// 	tag?: string;
// }

// interface NavItem {
// 	id: string;
// 	label: string;
// 	subMenu?: {
// 		[category: string]: SubMenuItem[];
// 	};
// }

// interface MobileNavProps {
// 	onClose: () => void;
// 	navItems: NavItem[];
// }

// const MobileNav: React.FC<MobileNavProps> = ({ onClose, navItems }) => {
// 	const [openMenu, setOpenMenu] = useState<string | null>(null);
// 	const [activeCategory, setActiveCategory] = useState<string | null>(null);

// 	const handleMenuClick = (id: string) => {
// 		setOpenMenu(openMenu === id ? null : id);
// 		setActiveCategory(null);
// 	};

// 	const handleCategoryClick = (category: string) => {
// 		setActiveCategory(activeCategory === category ? null : category);
// 	};

// 	const handleBackToMainMenu = () => {
// 		setOpenMenu(null);
// 	};

// 	const handleBackToCategories = () => {
// 		setActiveCategory(null);
// 	};

// 	// Static "Others" Menu Data
// 	const othersMenu: SubMenuItem[] = [
// 		{ name: "Blog", href: "/blog" },
// 		{ name: "Others Product ", href: "/others-product" },
// 		{ name: "Gallery", href: "/gallery" },
// 		{ name: "Events", href: "/events" },
// 		{ name: "Contact", href: "/contact" },
// 		{ name: "About us", href: "/about" },
// 	];

// 	return (
// 		<motion.div
// 			initial={{ opacity: 0 }}
// 			animate={{ opacity: 1 }}
// 			exit={{ opacity: 0 }}
// 			transition={{ duration: 0.3, ease: "easeInOut" }}
// 			className="fixed top-0 left-0 w-full h-screen bg-[#0006] overflow-hidden z-50 flex lg:hidden gap-4"
// 		>
// 			<motion.div
// 				initial={{ x: "-100%" }}
// 				animate={{ x: 0 }}
// 				exit={{ x: "-100%" }}
// 				transition={{ duration: 0.3, ease: "easeOut" }}
// 				className="w-80 h-screen bg-white p-6 shadow-xl relative"
// 			>
// 				<div className="px-5 pb-5 border-b border-gray-200">
// 					<Link href="/" onClick={onClose} className="w-18 lg:w-fit">
// 						<Image src={logo} width={120} height={400} alt="Borsalle" />
// 					</Link>
// 				</div>

// 				<AnimatePresence mode="wait">
// 					{/* Main Menu */}
// 					{!openMenu && (
// 						<motion.div
// 							key="main-menu"
// 							initial={{ opacity: 1 }}
// 							animate={{ opacity: 1 }}
// 							exit={{ opacity: 0, x: "-100%" }}
// 							transition={{ duration: 0.3 }}
// 							className="flex flex-col  mt-6"
// 						>
// 							{navItems?.map((item) => (
// 								<div
// 									key={item.id}
// 									className="py-4 px-6 cursor-pointer flex items-center justify-between"
// 									onClick={() => item.subMenu && handleMenuClick(item.id)}
// 									onKeyDown={() => item.subMenu && handleMenuClick(item.id)}
// 								>
// 									<span className="text-gray-800">{item.label}</span>
// 									{item.subMenu && Object.keys(item.subMenu).length > 0 && (
// 										<svg
// 											className="w-5 h-5"
// 											viewBox="0 0 14 10"
// 											fill="none"
// 											xmlns="http://www.w3.org/2000/svg"
// 										>
// 											<title>icon</title>
// 											<path
// 												fillRule="evenodd"
// 												clipRule="evenodd"
// 												d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
// 												fill="currentColor"
// 											/>
// 										</svg>
// 									)}
// 								</div>
// 							))}

// 							{/* Others Static Menu */}
// 							<div className="mt-8 border-t border-gray-400 pt-4">
// 								<span className=" text-gray-400 text-sm uppercase tracking-wider">
// 									Others
// 								</span>
// 								<div className="mt-2 space-y-2 px-6">
// 									{othersMenu.map((link) => (
// 										<Link
// 											key={link.name}
// 											href={link.href}
// 											onClick={onClose}
// 											className="block  cursor-pointer text-gray-700 hover:text-black transition"
// 										>
// 											{link.name}
// 										</Link>
// 									))}
// 								</div>
// 							</div>
// 						</motion.div>
// 					)}

// 					{/* Category Menu */}
// 					{openMenu && !activeCategory && (
// 						<motion.div
// 							key="category-menu"
// 							initial={{ opacity: 0, x: "-100%" }}
// 							animate={{ opacity: 1, x: 0 }}
// 							exit={{ opacity: 0, x: "-100%" }}
// 							transition={{ duration: 0.3, ease: "easeInOut" }}
// 							className="bg-white absolute cursor-pointer left-0 top-0 w-80 h-full"
// 						>
// 							<div className="flex items-center bg-bg-nav text-white gap-2 py-4 px-6 border-b border-gray-200">
// 								<BsArrowLeft
// 									className="w-5 h-5"
// 									onClick={handleBackToMainMenu}
// 								/>
// 								<span>
// 									{navItems.find((item) => item.id === openMenu)?.label}
// 								</span>
// 							</div>
// 							<div className="mt-3">
// 								{Object.keys(
// 									navItems.find((item) => item.id === openMenu)?.subMenu || {},
// 								).map((category) => (
// 									<div
// 										key={category}
// 										className="py-2.5 px-6 flex items-center justify-between"
// 										onClick={() => handleCategoryClick(category)}
// 										onKeyDown={() => handleCategoryClick(category)}
// 									>
// 										<span className="text-title text-sm">
// 											{category.replace(/_/g, " ")}
// 										</span>
// 										<svg
// 											className="w-5 h-5"
// 											viewBox="0 0 14 10"
// 											fill="none"
// 											xmlns="http://www.w3.org/2000/svg"
// 										>
// 											{" "}
// 											<title>check</title>
// 											<path
// 												fillRule="evenodd"
// 												clipRule="evenodd"
// 												d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
// 												fill="currentColor"
// 											/>
// 										</svg>
// 									</div>
// 								))}
// 							</div>
// 						</motion.div>
// 					)}

// 					{/* Sub Menu Items */}
// 					{openMenu && activeCategory && (
// 						<MobileSubMenu
// 							key="sub-menu"
// 							subMenu={
// 								(navItems?.find((item) => item.id === openMenu)?.subMenu ?? {})[
// 									activeCategory
// 								] || []
// 							}
// 							category={activeCategory.replace(/_/g, " ")}
// 							onBack={handleBackToCategories}
// 						/>
// 					)}
// 				</AnimatePresence>
// 			</motion.div>

// 			<div className="mt-2">
// 				<button
// 					type="button"
// 					className="w-[40px] h-[40px] flex items-center justify-center bg-white rounded shadow-lg cursor-pointer"
// 					onClick={onClose}
// 				>
// 					<HiOutlineXMark className="text-xl" />
// 				</button>
// 			</div>
// 		</motion.div>
// 	);
// };

// export default MobileNav;

"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { HiOutlineXMark } from "react-icons/hi2";
import logo from "../../../../app/(brc)/assets/logo/Full Logo Black.svg";
import { MobileSubMenu } from "../MobileSubMenu/MobileSubMenu";

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

interface NavItem {
  id: string;
  label: string;
  subMenu?: {
    [category: string]: SubMenuEntry[];
  };
}

interface MobileNavProps {
  onClose: () => void;
  navItems: NavItem[];
}

const MobileNav: React.FC<MobileNavProps> = ({ onClose, navItems }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleMenuClick = (id: string) => {
    setOpenMenu(openMenu === id ? null : id);
    setActiveCategory(null);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const handleBackToMainMenu = () => {
    setOpenMenu(null);
  };

  const handleBackToCategories = () => {
    setActiveCategory(null);
  };

  const othersMenu: SubMenuItem[] = [
    { id: "blog", name: "Blog", href: "/blog" },
    { id: "others-product", name: "Others Product", href: "/others-product" },
    { id: "gallery", name: "Gallery", href: "/gallery" },
    { id: "events", name: "Events", href: "/events" },
    { id: "contact", name: "Contact", href: "/contact" },
    { id: "about", name: "About Us", href: "/about" },
   
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full h-screen bg-[#0006] z-50 flex lg:hidden"
    >
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-80 h-screen bg-white p-6 shadow-xl relative"
      >
        <div className="px-5 pb-5 border-b border-gray-200">
          <Link href="/" onClick={onClose}>
            <Image src={logo} width={120} height={40} alt="Borsalle" />
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {!openMenu && (
            <motion.div
              key="main-menu"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col mt-6"
            >
              {navItems?.map((item) => (
                <div
                  key={item.id}
                  className="py-4 px-6 cursor-pointer flex items-center justify-between"
                  onClick={() => item.subMenu && handleMenuClick(item.id)}
                >
                  <span className="text-gray-800">{item.label}</span>
                  {item.subMenu && Object.keys(item.subMenu).length > 0 && (
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                        fill="currentColor"
                      />
                    </svg>
                  )}
                </div>
              ))}

              <div className="mt-8 border-t border-gray-400 pt-4">
                <span className="text-gray-400 text-sm uppercase tracking-wider">
                  Others
                </span>
                <div className="mt-2 space-y-2 px-6">
                  {othersMenu.map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={onClose}
                      className="block text-gray-700 hover:text-black"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {openMenu && !activeCategory && (
            <motion.div
              key="category-menu"
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 top-0 w-80 h-full bg-white"
            >
              <div className="flex items-center bg-bg-nav text-white py-4 px-6 border-b border-gray-200 gap-2">
                <BsArrowLeft
                  className="w-5 h-5"
                  onClick={handleBackToMainMenu}
                />
                <span>
                  {navItems.find((item) => item.id === openMenu)?.label}
                </span>
              </div>
              <div className="mt-3">
                {Object.keys(
                  navItems.find((item) => item.id === openMenu)?.subMenu ?? {}
                ).map((category) => (
                  <div
                    key={category}
                    className="py-2.5 px-6 flex items-center justify-between cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <span className="text-title text-sm">
                      {category.replace(/_/g, " ")}
                    </span>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {openMenu && activeCategory && (
            <MobileSubMenu
              key="sub-menu"
              subMenu={
                (navItems.find((item) => item.id === openMenu)?.subMenu ?? {})[
                  activeCategory
                ] || []
              }
              category={activeCategory.replace(/_/g, " ")}
              onBack={handleBackToCategories}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <div className="-ml-1 cursor-pointer">
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center bg-white rounded shadow-lg"
          onClick={onClose}
        >
          <HiOutlineXMark className="text-xl" />
        </button>
      </div>
    </motion.div>
  );
};

export default MobileNav;
