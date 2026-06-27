import GlobalBanner from "@/components/shared/globalBanner";
import Link from "next/link";

export default function ShippingPolicyPage() {
	return (
		<>
			<GlobalBanner title="Shipping Policy" />

			<div className="max-w-4xl mx-auto px-4 py-12">
				<h1 className="text-xl md:text-3xl font-bold text-center mb-12">
					Shipping Policy
				</h1>

				<div className="prose prose-gray max-w-none">
					<p className="text-lg">
						With free shipping, your order will be delivered 2-3 days after all
						your items are available to ship, including pre-order items.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						To place an order online, do the following:
					</h2>

					<ol className="list-decimal pl-6 space-y-4">
						<li>
							Add at least $50 of eligible items to your Shopping Cart. Items
							with &quot;FREE Shipping&quot; messaging on the product detail
							page contribute to your free shipping order minimum.
						</li>
						<li>Proceed to checkout.</li>
						<li>
							Enter a delivery address within our delivery area.
							<ul className="list-disc pl-6 mt-2 space-y-2">
								<li className="text-gray-600">
									(Note that some areas may not be eligible for same-day
									delivery)
								</li>
							</ul>
						</li>
						<li>
							Select <span className="font-semibold">FREE Shipping</span> as
							your shipping speed.
						</li>
					</ol>

					<div className="bg-gray-100 border-l-4 border-gray-800 p-4 my-8">
						<h3 className="font-semibold text-lg mb-2">
							Important Note About Cake Deliveries
						</h3>
						<p>
							Due to the perishable nature of our products, we offer delivery
							only within a 25-mile radius of our bakery locations. For
							deliveries beyond this radius, please contact us directly to
							discuss special arrangements.
						</p>
					</div>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						Delivery Timeframes
					</h2>

					<table className="min-w-full border-collapse border border-gray-300 mb-8">
						<thead>
							<tr className="bg-gray-200">
								<th className="border border-gray-300 px-4 py-2 text-left">
									Order Type
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Processing Time
								</th>
								<th className="border border-gray-300 px-4 py-2 text-left">
									Delivery Time
								</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="border border-gray-300 px-4 py-2">
									Standard Cakes
								</td>
								<td className="border border-gray-300 px-4 py-2">24 hours</td>
								<td className="border border-gray-300 px-4 py-2">1-2 days</td>
							</tr>
							<tr className="bg-gray-50">
								<td className="border border-gray-300 px-4 py-2">
									Custom Cakes
								</td>
								<td className="border border-gray-300 px-4 py-2">3-5 days</td>
								<td className="border border-gray-300 px-4 py-2">1-2 days</td>
							</tr>
							<tr>
								<td className="border border-gray-300 px-4 py-2">
									Wedding Cakes
								</td>
								<td className="border border-gray-300 px-4 py-2">7-14 days</td>
								<td className="border border-gray-300 px-4 py-2">
									Day of event
								</td>
							</tr>
							<tr className="bg-gray-50">
								<td className="border border-gray-300 px-4 py-2">
									Cupcakes &amp; Small Items
								</td>
								<td className="border border-gray-300 px-4 py-2">24 hours</td>
								<td className="border border-gray-300 px-4 py-2">
									Same day available
								</td>
							</tr>
						</tbody>
					</table>

					<h2 className="text-2xl font-semibold mt-8 mb-4">Shipping Costs</h2>

					<ul className="list-disc pl-6 space-y-3">
						<li>
							<span className="font-semibold">Free Shipping:</span> Orders over
							$50 within our standard delivery area (up to 15 miles)
						</li>
						<li>
							<span className="font-semibold">Standard Delivery Fee:</span> $10
							for orders under $50 within our standard delivery area
						</li>
						<li>
							<span className="font-semibold">Extended Area Fee:</span>{" "}
							Additional $15 for deliveries between 15-25 miles
						</li>
						<li>
							<span className="font-semibold">Same-Day Rush Fee:</span>{" "}
							Additional $20 for same-day delivery (order must be placed before
							10am)
						</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						Cake Care During Delivery
					</h2>

					<p>
						All our cakes are carefully packaged to ensure they arrive in
						perfect condition. During hot weather, we use special insulated
						packaging to protect your order. Our delivery vehicles are equipped
						with temperature-controlled compartments to maintain the quality of
						your cake.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">Delivery Issues</h2>

					<p>
						If you experience any issues with your delivery, please contact us
						immediately at (555) 123-4567. If your cake arrives damaged, please
						take photos before handling the cake and send them to
						orders@sweetdelights.com within 1 hour of delivery.
					</p>

					<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-8">
						<h3 className="font-semibold text-lg mb-2">Special Instructions</h3>
						<p>
							Please ensure someone is available to receive the cake delivery.
							If no one is available at the time of delivery, we will attempt to
							contact you. If we cannot reach you, the cake will be returned to
							our bakery and you will need to arrange pickup or a new delivery
							(additional fees may apply).
						</p>
					</div>

					<h2 className="text-2xl font-semibold mt-8 mb-4">Pickup Options</h2>

					<p>
						If you prefer to pick up your order, you can select the &quot;Store
						Pickup&quot; option during checkout. Orders can be picked up from
						any of our three locations during business hours. Please bring your
						order confirmation and ID when picking up your order.
					</p>
				</div>

				<div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
					<Link
						href="/contact"
						className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-black"
					>
						Contact Us With Questions
					</Link>
					<Link
						href="/faq"
						className="inline-flex items-center justify-center px-6 py-3 border border-gray-800 text-base font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100"
					>
						View FAQs
					</Link>
				</div>
			</div>
		</>
	);
}