import Link from "next/link";

export default function RefundsPage() {
	return (
		<>
			<div className="max-w-4xl mx-auto px-4 pt-20 py-8">
				<h1 className="text-xl md:text-2xl font-bold mb-6">
					Returns & Refunds Policy
				</h1>
				<p className="text-gray-600 mb-8">Last Updated: May 17, 2025</p>

				<div className="prose prose-pink max-w-none">
					<p>
						At Borsalle, we take pride in creating delicious, high-quality cakes
						and baked goods. We understand that sometimes issues may arise, and
						we want to ensure that our return and refund process is clear and
						fair. This policy outlines the procedures for returns, refunds, and
						cancellations.
					</p>

					<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
						<p className="text-yellow-700">
							<strong>Important Note:</strong> Due to the perishable nature of
							our products, we have specific policies regarding returns and
							refunds that differ from those of non-food retailers. Please read
							this policy carefully before placing an order.
						</p>
					</div>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						1. Product Quality Guarantee
					</h2>
					<p>
						1.1. <strong>Quality Commitment:</strong> We are committed to
						providing products that meet our high standards of quality, taste,
						and appearance. If you are not completely satisfied with the quality
						of your order, please contact us immediately.
					</p>
					<p>
						1.2. <strong>Inspection Upon Receipt:</strong> We recommend that you
						inspect your cake or baked goods immediately upon delivery or
						pickup. Any issues with the product&ldquo;s quality, appearance, or
						accuracy must be reported within 1 hour of receipt.
					</p>
					<p>
						1.3. <strong>Documentation:</strong> To help us address quality
						issues, please provide photographs of the product along with your
						order number when reporting a problem.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						2. Refund Eligibility
					</h2>
					<p>
						2.1. <strong>Quality Issues:</strong> Refunds or replacements may be
						provided in the following circumstances:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							The product is significantly different from what was ordered or
							described
						</li>
						<li>
							The product has quality issues that affect taste, freshness, or
							edibility
						</li>
						<li>
							The product was damaged during delivery (when delivered by our
							staff)
						</li>
						<li>The order is incomplete or incorrect</li>
					</ul>

					<p className="mt-4">
						2.2. <strong>Non-Refundable Circumstances:</strong> Refunds will
						generally not be provided in the following situations:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Minor variations in design, color, or appearance that do not
							significantly alter the product (as each cake is handcrafted)
						</li>
						<li>
							Dissatisfaction with flavor or taste preferences when the product
							was prepared according to specifications
						</li>
						<li>
							Damage occurring after delivery or pickup due to improper
							handling, storage, or transportation by the customer
						</li>
						<li>
							Failure to collect an order during the specified pickup time
						</li>
						<li>
							Cancellations made less than 48 hours before the scheduled
							delivery or pickup time (except in special circumstances at our
							discretion)
						</li>
					</ul>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						3. Cancellation Policy
					</h2>
					<p>
						3.1. <strong>Standard Orders:</strong> Cancellations for standard
						cake orders must be made at least 48 hours before the scheduled
						delivery or pickup time to be eligible for a full refund.
					</p>
					<p>
						3.2. <strong>Custom Orders:</strong> Custom cake orders require a
						50% non-refundable deposit. The remaining balance is refundable if
						the order is cancelled at least 72 hours before the scheduled
						delivery or pickup time.
					</p>
					<p>
						3.3. <strong>Special Event Cakes:</strong> Wedding cakes and other
						large event cakes have a specific cancellation policy outlined in
						the order contract. Generally, these require cancellation at least 2
						weeks in advance for any partial refund.
					</p>
					<p>
						3.4. <strong>Late Cancellations:</strong> Cancellations made after
						the specified timeframes may not be eligible for a refund as
						ingredients have been purchased and production may have begun.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						4. Refund Process
					</h2>
					<p>
						4.1. <strong>Refund Request:</strong> To request a refund, please
						contact our customer service team with your order number, the reason
						for your request, and any supporting documentation (such as
						photographs).
					</p>
					<p>
						4.2. <strong>Evaluation:</strong> All refund requests will be
						evaluated on a case-by-case basis. We may request additional
						information or arrange for the return of the product for inspection.
					</p>
					<p>
						4.3. <strong>Refund Methods:</strong> Approved refunds will be
						processed using the original payment method. In some cases, we may
						offer store credit or replacement instead of a monetary refund.
					</p>
					<p>
						4.4. <strong>Refund Timing:</strong> Refunds will be processed
						within 5-7 business days after approval. Depending on your payment
						provider, it may take additional time for the refund to appear in
						your account.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						5. Delivery Issues
					</h2>
					<p>
						5.1. <strong>Late Delivery:</strong> If your order is delivered
						significantly later than the scheduled time window due to reasons
						within our control, you may be eligible for a partial refund or
						store credit.
					</p>
					<p>
						5.2. <strong>Failed Delivery:</strong> If delivery cannot be
						completed because no one is available to receive the order at the
						specified address during the delivery window, no refund will be
						issued. We may, at our discretion, arrange for pickup from our
						store.
					</p>
					<p>
						5.3. <strong>Delivery Damage:</strong> If your cake is damaged
						during delivery by our staff, please take photographs immediately
						and contact us within 1 hour of delivery. We will arrange for a
						replacement or refund based on the circumstances.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						6. Special Circumstances
					</h2>
					<p>
						6.1. <strong>Allergic Reactions:</strong> While we provide allergen
						information for our products, we cannot guarantee that our products
						are free from specific allergens. We are not responsible for
						allergic reactions to our products.
					</p>
					<p>
						6.2. <strong>Force Majeure:</strong> In the event of circumstances
						beyond our control (such as natural disasters, power outages, or
						public emergencies) that prevent us from fulfilling orders, we will
						work with customers to reschedule or provide refunds as appropriate.
					</p>
					<p>
						6.3. <strong>Discretionary Refunds:</strong> In certain situations
						not covered by this policy, we may offer refunds, replacements, or
						store credit at our discretion to ensure customer satisfaction.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						7. Contact Information
					</h2>
					<p>
						For all refund requests or questions about this policy, please
						contact our customer service team:
						<br />
						Email: refunds@sweetdelights.com
						<br />
						Phone: (555) 123-4567
						<br />
						In-store: Bring your receipt and product to our store at 123 Bakery
						Lane, Sweet Street, Cakeville, CV1 2SD
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						8. Policy Changes
					</h2>
					<p>
						We reserve the right to modify this Returns & Refunds Policy at any
						time. Changes will be effective immediately upon posting on our
						website. The policy in effect at the time of your order will apply
						to that order.
					</p>
				</div>

				<div className="mt-12 p-6 bg-blue-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Still Have Questions?</h3>
					<p className="mb-4">
						If you have any questions about our Returns & Refunds Policy or need
						assistance with an order, our customer service team is here to help.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href="/contact"
							className="inline-flex items-center justify-center
							 px-6 py-3 border
							  border-transparent text-base font-medium 
							  rounded-md text-white bg-black hover:bg-white hover:border-black duration-300 transition hover:text-title"
						>
							Contact Us
						</Link>
						<Link
							href="/terms"
							className="inline-flex items-center justify-center px-6 py-3 border border-title text-base 
							font-medium rounded-md text-title bg-white hover:bg-pink-50"
						>
							View Terms & Conditions
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
