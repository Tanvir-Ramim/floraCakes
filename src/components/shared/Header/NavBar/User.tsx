import { RootState } from "@/store";
import Image from "next/image";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { LuUserPlus } from "react-icons/lu";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { PiSignIn } from "react-icons/pi";
import { SiEventstore } from "react-icons/si";
import { TbShoppingBagHeart } from "react-icons/tb";
import { useSelector } from "react-redux";

const User = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const user = useSelector((state: RootState) => state.user.user);
  const cartItems = useSelector((state: RootState) => state.wish.items);
  console.log({ user });
  const toggleMenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const url =
    "https://res.cloudinary.com/ds6zprd3z/image/upload/v1748006795/0e1c4e61d20e31b32739b7616d65f5b5_bq64ov.jpg";
  return (
    <div>
      <li
        className="p -4 lg:px -8 relative flex items-center space-x-1"
        onMouseEnter={() => setOpenIndex(0)}
        onMouseLeave={() => setOpenIndex(null)}
      >
        <a
          className="text-slate-800 hover:text-slate-900 flex items-center gap-2"
          href="#0"
          onClick={() => toggleMenu(0)}
          aria-expanded={openIndex === 0 ? "true" : "false"}
        >
          {user ? (
            <Image
              src={user?.customerImage?.url || url}
              alt="user"
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <CiUser className="w-5 h-5" />
          )}
        </a>
        <button
          className="shrink-0 p-1 cursor-pointer"
          aria-expanded={openIndex === 0 ? "true" : "false"}
          onClick={() => toggleMenu(0)}
        >
          <span className="sr-only">Show submenu</span>
          <svg
            className="w-3 h-3 fill-slate-500"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
          >
            <path d="M10 2.586L11.414 4 6 9.414.586 4 2 2.586l4 4z" />
          </svg>
        </button>

        {/* Submenu */}
        <ul
          className={`origin-top-right absolute top-7 -left-10 lg:left-[-50%] transform -translate-x-1/2 min-w-[180px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl transition-all duration-300 ease-out ${
            openIndex === 0
              ? "opacity-100 translate-y-0 visible"
              : "opacity-0 translate-y-2 invisible"
          }`}
          onBlur={() => setOpenIndex(null)}
        >
          {!user ? (
            <>
              <li>
                <a
                  href="/login"
                  className="text-slate-800 text-sm hover:text-author flex items-center p-2"
                >
                  <div className="flex items-center justify-center h-7 w-7 mr-3">
                    <PiSignIn />
                  </div>
                  Sign in
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-slate-800 text-sm hover:text-author flex items-center p-2"
                >
                  <div className="flex items-center justify-center h-7 w-7 mr-3">
                    <LuUserPlus />
                  </div>
                  Register
                </a>
              </li>
            </>
          ) : (
            <>
              <li>
                <a
                  href="/account"
                  className="text-slate-800 text-sm hover:text-author flex items-center p-2"
                >
                  <div className="flex items-center justify-center h-7 w-7 mr-3">
                    <MdAccountCircle />
                  </div>
                  Account
                </a>
              </li>
              <li>
                <a
                  href="/events"
                  className="text-slate-800 text-sm hover:text-author flex items-center p-2"
                >
                  <div className="flex items-center justify-center h-7 w-7 mr-3">
                    <SiEventstore />
                  </div>
                  Events
                </a>
              </li>
              <li>
                <a
                  href="/logout"
                  className="text-slate-800 text-sm hover:text-author flex items-center p-2"
                >
                  <div className="flex items-center justify-center h-7 w-7 mr-3">
                    <MdLogout />
                  </div>
                  Logout
                </a>
              </li>
            </>
          )}

          {/* Always show Wishlist */}
          <li>
            <a
              href="/wishlist"
              className="text-slate-800 text-sm hover:text-author flex items-center p-2 relative"
            >
              <div className="flex items-center justify-center h-7 w-7 mr-3">
                <TbShoppingBagHeart />
              </div>
              <span className="whitespace-nowrap">
                Wishlist
                <span className="bg-black text-white w-4 h-4 rounded-full absolute top-[2px] left-24 flex items-center justify-center text-xs">
                  {cartItems?.length ?? 0}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </li>
    </div>
  );
};

export default User;
