import logo from "@/app/(brc)/assets/logo/Full Logo Black.svg";

import Image from "next/image";
import { HiOutlineMailOpen } from "react-icons/hi";
import { MdPhoneCallback } from "react-icons/md";
import { RiMapPinLine } from "react-icons/ri";
import Container from "../container/Container";

import Link from "next/link";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";
const infoLinks = [
	{ name: "Home", href: "/" },
	{ name: "Blogs", href: "/blog" },
	{ name: "Gallery", href: "/gallery" },
	{ name: "About Us", href: "/about" },
	{ name: "Contact Us", href: "/contact" },
];
const useFulLinks = [
	{ name: "Others Product", href: "/others" },
	{ name: "Shipping Policy", href: "/shipping-policy" },
	{ name: "Returns & Refunds", href: "/refunds" },
	{ name: "Privacy Policy", href: "/privacy" },
	{ name: "Terms & Condition", href: "/terms" },
];
const Footer = () => {
	return (
		<div className=" mt-12 bg-[#232323] text-secondary">
			<Container className="px-5 pt-20">
				<div className="  border-b border-subtitle">
					<div
						className="flex items-center lg:flex-nowrap flex-wrap 
         pb-14 gap-8 "
					>
						<div className="lg:w-[50%]">
							<Image
								src={logo}
								alt="logo"
								width={160}
								height={400}
								className="bg-[#fff] p-4 rounded"
							/>

							<h2 className="mt-6 text-sm leading-6">
								Borsalle is a premium Templates theme with advanced admin
								module. It is extremely customizable, easy to use and fully
								responsive and retina ready.
							</h2>

							<div className="flex flex-col gap-2 mt-4 text-sm">
								<p className="flex items-center gap-2">
									<RiMapPinLine />
									<span>
										Add: 1234 Heaven Stress, Beverly Hill, Melbourne, USA.
									</span>
								</p>
								<p className="flex items-center gap-2">
									<MdPhoneCallback />
									<span>Phone Number: (800) 123 456 789</span>
								</p>
								<p className="flex items-center gap-2">
									<HiOutlineMailOpen />
									<span>Mail: outstock@support.com</span>
								</p>
							</div>
						</div>
						<div className="">
							<h2 className="text-[#fff] uppercase font-medium">Information</h2>
							<ul className="flex flex-col gap-3 mt-6 list-none text-sm">
								{infoLinks.map((link, index) => (
									<li key={`${index + 1}`}>
										<Link
											href={link.href}
											className="hover:text-[#BD8448] duration-300 cursor-pointer"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
						<div className="lg:ml-[90px]">
							<h2 className="text-[#fff] uppercase font-medium">
								Our Services
							</h2>
							<div className="flex flex-col gap-3 mt-6 list-none text-sm">
								{useFulLinks.map((link, index) => (
									<li key={`${index + 1}`}>
										<Link
											href={link.href}
											className="hover:text-[#BD8448] duration-300 cursor-pointer"
										>
											{link.name}
										</Link>
									</li>
								))}{" "}
							</div>
						</div>
					</div>
				</div>
				<div
					className="flex justify-between py-10 lg:flex-row flex-col gap-4 
        lg:gap-0 items-center lg:items-start"
				>
					<div>
						<p>Copyright © Borsalle. All rights reserved.</p>
					</div>
					<div className="flex space-x-4">
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<FaFacebook size={18} />
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<BsTwitter size={18} />
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<BsInstagram size={18} />
						</Link>
						<Link
							href="#"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							<LiaLinkedin size={18} />
						</Link>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default Footer;
