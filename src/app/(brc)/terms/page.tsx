import Link from "next/link";

export default function TermsPage() {
	return (
		<>
			<div className="max-w-4xl mx-auto px-4 mt-20 py-8">
				<h1 className="text-xl md:text-2xl font-bold mb-6">
					Terms & Conditions
				</h1>
				<p className="text-gray-600 mb-8">Last Updated: May 17, 2025</p>

				<div className="prose prose-pink max-w-none">
					<p>
						Welcome to Borsalee. These Terms and Conditions govern your use of
						our website and services. By accessing or using our website, placing
						orders, or interacting with any of our services, you agree to be
						bound by these Terms and Conditions.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">1. Definitions</h2>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Borsalee,</strong> we, us, or our refers to SweetDelights
							Bakery, the company providing cake products and services.
						</li>
						<li>
							<strong>Customer,</strong> you, or your refers to the person or
							entity accessing our website, placing orders, or using our
							services.
						</li>
						<li>
							<strong>Website</strong> refers to the SweetDelights website,
							including all content, functionality, and services offered.
						</li>
						<li>
							<strong>Products</strong> refers to cakes, pastries, and other
							baked goods offered by SweetDelights.
						</li>
						<li>
							<strong>Order</strong> refers to a request to purchase Products
							from SweetDelights.
						</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						2. Ordering Process
					</h2>
					<p>
						2.1. <strong>Order Placement:</strong> Orders can be placed through
						our website, by phone, or in person at our physical location. All
						orders are subject to acceptance and confirmation by SweetDelights.
					</p>
					<p>
						2.2. <strong>Order Confirmation:</strong> Upon placing an order, you
						will receive an order confirmation via email. This confirmation does
						not constitute acceptance of your order; it acknowledges that we
						have received your request.
					</p>
					<p>
						2.3. <strong>Order Acceptance:</strong> Your order is accepted when
						we send you a second email confirming that your order has been
						processed or when we begin preparing your order, whichever occurs
						first.
					</p>
					<p>
						2.4. <strong>Order Modification:</strong> Orders may be modified up
						to 48 hours before the scheduled pickup or delivery time, subject to
						our approval. Modifications requested less than 48 hours before
						pickup or delivery may not be accommodated.
					</p>
					<p>
						2.5. <strong>Custom Orders:</strong> Custom cake orders require a
						minimum of 7 days&ldquo; notice. Designs are subject to our artistic
						interpretation and available ingredients.
					</p>

					<h2 className="text-xlfont-semibold mt-8 mb-4">
						3. Pricing and Payment
					</h2>
					<p>
						3.1. <strong>Pricing:</strong> All prices are listed in USD and are
						subject to change without notice. Prices displayed on our website
						are exclusive of applicable taxes and delivery fees, which will be
						added at checkout.
					</p>
					<p>
						3.2. <strong>Payment Methods:</strong> We accept major credit cards,
						debit cards, and digital payment methods as specified on our
						website. All payments must be made in full at the time of order
						placement.
					</p>
					<p>
						3.3. <strong>Deposits:</strong> Custom cakes and large orders may
						require a non-refundable deposit of 50% of the total order value at
						the time of order placement, with the remaining balance due 48 hours
						before pickup or delivery.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						4. Delivery and Pickup
					</h2>
					<p>
						4.1. <strong>Delivery Area:</strong> We offer delivery within a
						specified radius of our bakery location. Delivery areas and fees are
						subject to change without notice.
					</p>
					<p>
						4.2. <strong>Delivery Time:</strong> We will make reasonable efforts
						to deliver your order within the selected time slot. However,
						delivery times are estimates and may vary due to traffic, weather
						conditions, or other unforeseen circumstances.
					</p>
					<p>
						4.3. <strong>Delivery Address:</strong> You are responsible for
						providing accurate and complete delivery information. We are not
						responsible for orders delivered to incorrect addresses provided by
						the customer.
					</p>
					<p>
						4.4. <strong>Pickup:</strong> Orders selected for pickup must be
						collected during our business hours on the specified date. Orders
						not picked up within 24 hours of the scheduled pickup time may be
						disposed of, and no refund will be issued.
					</p>
					<p>
						4.5. <strong>Cake Condition:</strong> Upon delivery or pickup, you
						should inspect the cake immediately. Any issues must be reported to
						us within 1 hour of receipt.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						5. Product Information
					</h2>
					<p>
						5.1. <strong>Allergens:</strong> Our products may contain or come
						into contact with allergens such as nuts, gluten, dairy, eggs, and
						soy. While we make efforts to accommodate dietary restrictions, we
						cannot guarantee that our products are free from specific allergens.
					</p>
					<p>
						5.2. <strong>Product Appearance:</strong> We make every effort to
						ensure that our products match the descriptions and images on our
						website. However, slight variations in appearance, color, and design
						may occur as each product is handcrafted.
					</p>
					<p>
						5.3. <strong>Storage and Handling:</strong> Proper storage and
						handling instructions will be provided with your order. We are not
						responsible for product quality issues arising from improper storage
						or handling after delivery or pickup.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						6. Cancellations and Refunds
					</h2>
					<p>
						6.1. <strong>Cancellation Policy:</strong> Orders may be cancelled
						up to 48 hours before the scheduled pickup or delivery time.
						Cancellations made less than 48 hours before pickup or delivery may
						not be eligible for a refund.
					</p>
					<p>
						6.2. <strong>Refund Policy:</strong> Refunds for cancelled orders
						will be processed within 5-7 business days and will be issued using
						the original payment method. For detailed information, please refer
						to our{" "}
						<Link href="/refunds" className="text-pink-600 hover:text-pink-800">
							Returns & Refunds Policy
						</Link>
						.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						7. Intellectual Property
					</h2>
					<p>
						7.1. <strong>Copyright:</strong> All content on our website,
						including text, graphics, logos, images, and software, is the
						property of SweetDelights or its content suppliers and is protected
						by copyright laws.
					</p>
					<p>
						7.2. <strong>Cake Designs:</strong> Custom cake designs created by
						SweetDelights remain our intellectual property. We reserve the right
						to use images of custom cakes for promotional purposes unless
						otherwise agreed in writing.
					</p>
					<p>
						7.3. <strong>User Content:</strong> By submitting ideas,
						suggestions, or feedback regarding our products or services, you
						grant us a non-exclusive, royalty-free, perpetual, irrevocable right
						to use, reproduce, modify, adapt, publish, and display such content.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						8. Limitation of Liability
					</h2>
					<p>
						8.1. SweetDelights shall not be liable for any indirect, incidental,
						special, consequential, or punitive damages resulting from your use
						of or inability to use our products or services.
					</p>
					<p>
						8.2. Our total liability for any claim arising from or related to
						our products or services shall not exceed the total amount paid by
						you for the order giving rise to such claim.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
					<p>
						These Terms and Conditions shall be governed by and construed in
						accordance with the laws of [Your Jurisdiction], without regard to
						its conflict of law principles.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						10. Changes to Terms and Conditions
					</h2>
					<p>
						We reserve the right to modify these Terms and Conditions at any
						time. Changes will be effective immediately upon posting on our
						website. Your continued use of our website or services after any
						changes indicates your acceptance of the modified Terms and
						Conditions.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						11. Contact Information
					</h2>
					<p>
						If you have any questions about these Terms and Conditions, please
						contact us at:
						<br />
						Email: legal@sweetdelights.com
						<br />
						Phone: (555) 123-4567
						<br />
						Address: 123 Bakery Lane, Sweet Street, Cakeville, CV1 2SD
					</p>
				</div>

				<div className="mt-12 p-6 bg-pink-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Need Help?</h3>
					<p className="mb-4">
						If you have any questions about our Terms & Conditions, please donot
						hesitate to contact our customer service team.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href="/contact"
							className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700"
						>
							Contact Us
						</Link>
						<Link
							href="/faq"
							className="inline-flex items-center justify-center px-6 py-3 border border-pink-600 text-base font-medium rounded-md text-pink-600 bg-white hover:bg-pink-50"
						>
							View FAQs
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
