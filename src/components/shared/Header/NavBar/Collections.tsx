import { cakeCategories, popularCakes } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Collections = () => {
	return (
		<div className="flex">
			{/* Left Section - Popular Products */}
			<div className="w-1/3 pr-5 border-r border-gray-200">
				<h2 className="font-medium text-title text-sm mb-4">
					Popular products
				</h2>
				<div className="space-y-6 flex flex-col overflow-y-auto max-h-[300px]">
					{popularCakes.map((product) => (
						<Link href={`/cakes?sortBy=rating`} key={product.id}>
							<div className="flex items-center space-x-4">
								<div className="w-16 h-16 flex-shrink-0">
									<Image
										src={product.image || "/placeholder.svg"}
										alt={product.name}
										width={64}
										height={64}
										className="object-cover"
									/>
								</div>
								<div>
									<p className="text-sm text-[#a3a3a3] hover:text-hover-text transition-colors">
										{product.name}
									</p>
									<p className="text-xs font-extralight">
										${product.price}{" "}
										{product.oldPrice && (
											<span className="line-through text-[#a3a3a3] text-sm">
												${product.oldPrice}
											</span>
										)}
									</p>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>

			{/* Right Section - Product Categories */}
			<div className="w-2/3 pl-5">
				<h2 className="font-medium text-title text-sm mb-2">Kids Cake</h2>
				<p className="text-xs font-extralight text-gray mb-6">
					Browse our wide selection of delicious cakes. Find the perfect cake
					for any occasion!.
				</p>
				<div className="grid grid-cols-4 gap-4">
					{cakeCategories.map((category) => (
						<Link href="/cakes" key={category.id}>
							<div key={category.id} className="text-center">
								<div className="bg-gray-100 p-4 mb-2">
									<Image
										src={category.image || "/placeholder.svg"}
										alt={category.name}
										width={96}
										height={96}
										className="mx-auto"
									/>
								</div>
								<p className="font-medium text-sm">{category.name}</p>
							</div>
						</Link>
					))}
				</div>
				<h2 className="font-medium text-title text-sm mb-2 mt-4">Custom Cake</h2>
				<div className="grid grid-cols-4 gap-4">
					{cakeCategories.map((category) => (
						<Link href="/custom-cake" key={category.id}>
							<div key={category.id} className="text-center">
								<div className="bg-gray-100 p-4 mb-2">
									<Image
										src={category.image || "/placeholder.svg"}
										alt={category.name}
										width={96}
										height={96}
										className="mx-auto"
									/>
								</div>
								<p className="font-medium text-sm">{category.name}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Collections;
