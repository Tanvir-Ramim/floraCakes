export default function FAQSection() {
	return (
		<div className="mt-16">
			<h2 className="md:text-3xl text-2xl  font-bold mb-6 text-center">
				Frequently Asked Questions
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 pt-4 gap-6">
				<div className="bg-white rounded-lg p-6 shadow-sm">
					<h3 className="font-semibold text-gray-800 mb-2">
						How do gift cards work?
					</h3>
					<p className="text-gray-600">
						Our digital gift cards are sent via email to your recipient. They
						contain a unique code that can be used at checkout on our website or
						in-store.
					</p>
				</div>
				<div className="bg-white rounded-lg p-6 shadow-sm">
					<h3 className="font-semibold text-gray-800 mb-2">
						When will the gift card be delivered?
					</h3>
					<p className="text-gray-600">
						Digital gift cards are delivered immediately after purchase. You can
						also schedule a delivery date if you prefer.
					</p>
				</div>
				<div className="bg-white rounded-lg p-6 shadow-sm">
					<h3 className="font-semibold text-gray-800 mb-2">
						Can I personalize the gift card?
					</h3>
					<p className="text-gray-600">
						Yes! You can add a personal message to your gift card during the
						checkout process.
					</p>
				</div>
				<div className="bg-white rounded-lg p-6 shadow-sm">
					<h3 className="font-semibold text-gray-800 mb-2">
						Do gift cards expire?
					</h3>
					<p className="text-gray-600">
						Our gift cards are valid for 12 months from the date of purchase.
						The expiration date will be clearly indicated on the gift card.
					</p>
				</div>
			</div>
		</div>
	);
}
