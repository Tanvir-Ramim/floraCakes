
import Link from "next/link";
import { useState } from "react";
import { FaBloggerB, FaCalendar } from "react-icons/fa6";
import { FcAbout } from "react-icons/fc";
import { GrGallery } from "react-icons/gr";
import { MdCardGiftcard, MdOutlineProductionQuantityLimits } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const links = [
  {
    href: "/blog",
    label: "Blog",
    image: <FaBloggerB />,
  },
  {
    href: "/others-product",
    label: "Others Product",
    image: <MdOutlineProductionQuantityLimits />,
  },
  { href: "/gift", label: "Gift Card", image: <MdCardGiftcard /> },
  { href: "/events", label: "Events", image: <FaCalendar /> },
  { href: "/gallery", label: "Gallery", image: <GrGallery /> },
  { href: "/about", label: "About Us", image: <FcAbout /> },
  { href: "/contact", label: "Contact Us", image: <TfiHeadphoneAlt /> }
  
];

const Others = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <li
      className="flex items-center space-x-1 h-full "
      onMouseEnter={() => setOpenIndex(0)}
      onMouseLeave={() => setOpenIndex(null)}
    >
      <div className="h-full flex items-center">
        <button
          type="button"
          className="text-gray py-5 px-3 text-sm flex items-center font-medium hover:text-primary duration-300 cursor-pointer h-full group"
          onClick={() => toggleMenu(0)}
          aria-expanded={openIndex === 0 ? "true" : "false"}
        >
          <span className="flex items-center h-full border-b-2 border-transparent group-hover:border-primary">
            Others
            <svg
              className="w-4 h-4 ml-1 fill-current text-gray-400 group-hover:text-primary transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>

      </div>

      <div
        className={`absolute flex z-20 top-full left-1/2 transform -translate-x-1/2 w-[1300px] bg-white border border-slate-200 p-5 rounded-lg shadow-xl transition-all duration-300 ease-out ${
          openIndex === 0
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 translate-y-2 invisible"
        }`}
      >
        <ul className="w-full justify-between flex border-r border-border-color">
          {links.map((link, index) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className="text-slate-800 text-sm hover:text-primary flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200"
              >
                <span className="text-2xl text-primary">{link.image}</span>
                <span className="font-medium">{link.label}</span>
              </Link>
              {index !== links.length - 1 && (
                <span className="absolute right-0 top-1/2 transform -translate-y-1/2 h-8 w-px bg-gray-200"></span>
              )}
            </li>
          
          ))}
          
        </ul>
    
      </div>
    </li>
  );
};

export default Others;
