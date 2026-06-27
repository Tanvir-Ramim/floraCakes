"use client";

import { navItems } from "@/constants";
import { AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import logo from "../../../../app/(brc)/assets/logo/Full Logo Black.svg";
import MobileNav from "../MobileNav/MobileNav";
import SearchBar from "../SearchBar/SearchBar";
import SideCartBar from "../SideCartBar/SideCartBar";
import DesktopNavigation from "./Desktop-navigation";
import User from "./User";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSiteCartOpen, setIsSiteCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const items = useSelector((state: RootState) => state.cart.items);

  const navRef = useRef(null);

  const menuRef = useRef(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent scrolling when modals are open
  useEffect(() => {
    if (isSearchOpen || isSiteCartOpen || isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isSearchOpen, isSiteCartOpen, isMenuOpen]);

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-[99] transition-all duration-300 ${
        isScrolled
          ? "bg-white sha dow-md py-5 lg:py-2.5 px-2 shadow-custom"
          : "bg-transparent py-2.5 px-2"
      }`}
    >
      <div className=" container mx-auto  ">
        <div className="flex gap-1 items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden text-gray-600 cursor-pointer hover:text-black transition-colors"
              aria-label="Menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
            {/* Logo */}
            <Link href="/" className="w-18 lg:w-fit">
              <Image src={logo} width={120} height={400} alt="Borsalle" />
            </Link>
          </div>

          {/* Desktop Navigation */}

          <DesktopNavigation />
          {/* Right Side Icons */}
          <div className="flex items-center space-x-3 lg:space-x-5">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-title text-sm hover:text-hover-text cursor-pointer 
              flex gap-1 items-center transition-colors"
              aria-label="Search"
              type="button"
            >
              <svg
                className="modal__toggle-open icon icon-search"
                width="22"
                height="24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <title>Search</title>
                <path
                  fill="currentColor"
                  d="M344.5,298c15-23.6,23.8-51.6,23.8-81.7c0-84.1-68.1-152.3-152.1-152.3C132.1,64,64,132.2,64,216.3c0,84.1,68.1,152.3,152.1,152.3c30.5,0,58.9-9,82.7-24.4l6.9-4.8L414.3,448l33.7-34.3L339.5,305.1L344.5,298z M301.4,131.2c22.7,22.7,35.2,52.9,35.2,85c0,32.1-12.5,62.3-35.2,85c-22.7,22.7-52.9,35.2-85,35.2c-32.1,0-62.3-12.5-85-35.2c-22.7-22.7-35.2-52.9-35.2-85c0-32.1,12.5-62.3,35.2-85c22.7-22.7,52.9-35.2,85-35.2C248.5,96,278.7,108.5,301.4,131.2z"
                />
              </svg>{" "}
              Search
            </button>

            <Link
              href="/cart"
              onClick={() => setIsSiteCartOpen(true)}
              className="text-title hover:text-hover-text 
              cursor-pointer transition-colors flex items-center"
              aria-label="Cart"
            >
              <svg
                className="icon icon-cart me-1"
                width="19"
                height="20"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
              >
                <title>Cart</title>
                <path
                  fill="currentColor"
                  d="M448,160h-64v-4.5C384,87,329,32,260.5,32h-8C184,32,128,87,128,155.5v4.5H64L32,480h448L448,160z M160,155.5c0-50.7,41.8-91.5,92.5-91.5h7.5h0.5c50.7,0,91.5,40.8,91.5,91.5v4.5H160V155.5z M67.8,448l24.9-256H128v36.3c-9.6,5.5-16,15.9-16,27.7c0,17.7,14.3,32,32,32s32-14.3,32-32c0-11.8-6.4-22.2-16-27.7V192h192v36.3c-9.6,5.5-16,15.9-16,27.7c0,17.7,14.3,32,32,32s32-14.3,32-32c0-11.8-6.4-22.2-16-27.7V192h35.4l24.9,256H67.8z"
                />
              </svg>
              <span className="ml-1 hidden md:block text-sm">Cart</span>{" "}
              <span className="text-sm">({items?.length || 0})</span>
            </Link>

            <div
              ref={menuRef}
              className=" text-title relative  cursor-pointer
               hover:text-author transition-colors"
              aria-label="Menu"
            >
              <User />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}

      <AnimatePresence>
        {isMenuOpen && (
          <MobileNav onClose={() => setIsMenuOpen(false)} navItems={navItems} />
        )}
      </AnimatePresence>
      {/* Mobile Menu */}

      {/* Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <div>
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Side Cart */}
      <AnimatePresence>
        {isSiteCartOpen && (
          <div>
            <SideCartBar onClose={() => setIsSiteCartOpen(false)} />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
