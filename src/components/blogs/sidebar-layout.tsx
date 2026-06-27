"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import Sidebar from "./sidebar";

interface SidebarLayoutProps {
	children: React.ReactNode;
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Handle window resize to determine if we're on mobile
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth >= 768) {
				setIsMobileMenuOpen(false);
			}
		};

		// Set initial value
		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (
				isMobileMenuOpen &&
				!target.closest(".mobile-sidebar") &&
				!target.closest(".mobile-menu-button")
			) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMobileMenuOpen]);

	// Prevent scrolling when mobile menu is open
	useEffect(() => {
		if (isMobileMenuOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isMobileMenuOpen]);

	return (
		<div className="relative pt-10">
			{/* Mobile menu button */}
			{isMobileMenuOpen && (
				<button
					className="absolute top-[40%] z-[99999] left-[calc(50%-10px)] cursor-pointer p-2 bg-white rounded-full shadow-md md:hidden mobile-menu-button"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen && (
						<BiRightArrow size={20} className="text-black" />
					)}
				</button>
			)}
			<button
				className="fixed top-[40%] right-4 z-[999999] p-2 bg-white cursor-pointer rounded-full shadow-md md:hidden mobile-menu-button"
				onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
			>
				{!isMobileMenuOpen && <BiLeftArrow size={20} className="text-title" />}
			</button>

			{/* Overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-black/20 z-40 md:hidden" />
			)}

			{/* Main layout */}
			<div className="flex flex-col md:flex-row items-start max-w-7xl mx-auto">
				{/* Main content */}
				<main className="flex-1 min-w-0">{children}</main>

				{/* Desktop sidebar */}
				<aside className="hidden md:block w-80 sticky shadow-md bg-white top-4 self-start p-6">
					<Sidebar />
				</aside>

				{/* Mobile sidebar */}
				<div
					className={`fixed top-0 right-0 h-full z-[999999] w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out mobile-sidebar ${
						isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
					} md:hidden`}
				>
					<div className="p-6 h-full overflow-y-auto">
						<Sidebar />
					</div>
				</div>
			</div>
		</div>
	);
}
