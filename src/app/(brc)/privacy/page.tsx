import Link from "next/link";

export default function PrivacyPage() {
	return (
		<>
			<div className="max-w-4xl mx-auto px-4 pt-24 py-8">
				<h1 className="text-xl md:text-2xl font-bold mb-6">Privacy Policy</h1>
				<p className="text-gray-600 mb-8">Last Updated: May 17, 2025</p>

				<div className="prose prose-pink max-w-none">
					<p>
						At Borsalle, we are committed to protecting your privacy and
						ensuring the security of your personal information. This Privacy
						Policy explains how we collect, use, disclose, and safeguard your
						information when you visit our website, place orders, or interact
						with our services.
					</p>
					<p>
						Please read this Privacy Policy carefully. By accessing or using our
						website and services, you acknowledge that you have read,
						understood, and agree to be bound by the terms of this Privacy
						Policy.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						1. Information We Collect
					</h2>
					<p>We may collect the following types of information:</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						1.1. Personal Information
					</h3>
					<p>
						Personal information is data that can be used to identify you
						directly or indirectly. We may collect the following personal
						information:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Name</li>
						<li>Email address</li>
						<li>Phone number</li>
						<li>Billing and delivery addresses</li>
						<li>
							Payment information (credit card details, PayPal information)
						</li>
						<li>Date of birth (for age verification or birthday promotions)</li>
						<li>Dietary preferences or restrictions</li>
						<li>Allergy information</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						1.2. Order Information
					</h3>
					<p>
						When you place an order with us, we collect information related to
						your purchase, including:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Products ordered</li>
						<li>Order date and time</li>
						<li>Special instructions or customization requests</li>
						<li>Delivery or pickup preferences</li>
						<li>Gift messages</li>
						<li>Order history</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						1.3. Technical Information
					</h3>
					<p>
						When you visit our website, we may automatically collect certain
						technical information, including:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>IP address</li>
						<li>Browser type and version</li>
						<li>Device type and operating system</li>
						<li>Referring website</li>
						<li>Pages viewed and time spent on our website</li>
						<li>Links clicked</li>
						<li>Geographic location (country, city)</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						1.4. Communication Information
					</h3>
					<p>
						When you communicate with us through our website, email, phone, or
						social media, we may collect information about those communications,
						including:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Content of messages, emails, or calls</li>
						<li>Date and time of communications</li>
						<li>Customer service interactions</li>
					</ul>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						2. How We Collect Information
					</h2>
					<p>We collect information through various methods, including:</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						2.1. Direct Collection
					</h3>
					<p>Information you provide to us when you:</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Create an account on our website</li>
						<li>Place an order</li>
						<li>Fill out contact or inquiry forms</li>
						<li>Subscribe to our newsletter</li>
						<li>Participate in surveys, contests, or promotions</li>
						<li>Communicate with our customer service team</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						2.2. Automated Collection
					</h3>
					<p>
						Information collected automatically when you visit our website
						through:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Cookies and similar technologies</li>
						<li>Web beacons and tracking pixels</li>
						<li>Server logs</li>
						<li>Analytics tools</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						2.3. Third-Party Sources
					</h3>
					<p>
						We may receive information about you from third-party sources, such
						as:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Payment processors</li>
						<li>Delivery partners</li>
						<li>
							Social media platforms (if you connect your social media account)
						</li>
						<li>Marketing partners</li>
					</ul>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						3. How We Use Your Information
					</h2>
					<p>We use your information for various purposes, including:</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						3.1. Order Processing and Fulfillment
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>Processing and fulfilling your orders</li>
						<li>Managing payments and billing</li>
						<li>Coordinating delivery or pickup</li>
						<li>Communicating order status and updates</li>
						<li>Addressing special requests or customizations</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						3.2. Customer Service
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>Responding to inquiries, questions, and concerns</li>
						<li>Providing support for orders and products</li>
						<li>Addressing complaints or issues</li>
						<li>Improving our customer service experience</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						3.3. Marketing and Communication
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							Sending newsletters and promotional emails (with your consent)
						</li>
						<li>Notifying you about special offers, new products, or events</li>
						<li>Conducting surveys and collecting feedback</li>
						<li>
							Personalizing marketing communications based on your preferences
							and order history
						</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						3.4. Website Improvement and Analysis
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>Analyzing website usage and performance</li>
						<li>Improving website functionality and user experience</li>
						<li>Troubleshooting technical issues</li>
						<li>Developing new features and services</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						3.5. Legal and Security Purposes
					</h3>
					<ul className="list-disc pl-6 space-y-2">
						<li>Complying with legal obligations</li>
						<li>Preventing fraud and unauthorized access</li>
						<li>Protecting our rights, property, and safety</li>
						<li>Enforcing our Terms and Conditions</li>
					</ul>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						4. Cookies and Similar Technologies
					</h2>
					<p>
						4.1. <strong>Cookies:</strong> We use cookies and similar
						technologies to enhance your experience on our website. Cookies are
						small text files stored on your device that help us recognize you,
						remember your preferences, and analyze how you use our website.
					</p>
					<p>
						4.2. <strong>Types of Cookies We Use:</strong>
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>
							<strong>Essential Cookies:</strong> Necessary for the website to
							function properly (e.g., shopping cart, login functionality)
						</li>
						<li>
							<strong>Preference Cookies:</strong> Remember your settings and
							preferences for future visits
						</li>
						<li>
							<strong>Analytics Cookies:</strong> Help us understand how
							visitors interact with our website
						</li>
						<li>
							<strong>Marketing Cookies:</strong> Track your browsing habits to
							deliver targeted advertising
						</li>
					</ul>
					<p>
						4.3. <strong>Cookie Management:</strong> You can manage your cookie
						preferences through your browser settings. Most browsers allow you
						to block or delete cookies. However, if you block essential cookies,
						some features of our website may not function properly.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						5. Information Sharing and Disclosure
					</h2>
					<p>We may share your information with the following parties:</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						5.1. Service Providers
					</h3>
					<p>
						We share information with third-party service providers who perform
						services on our behalf, such as:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Payment processors</li>
						<li>Delivery and logistics partners</li>
						<li>Email and communication service providers</li>
						<li>Website hosting and maintenance providers</li>
						<li>Analytics and data processing companies</li>
						<li>Customer service platforms</li>
					</ul>
					<p>
						These service providers are only authorized to use your information
						as necessary to provide services to us and are required to maintain
						the confidentiality and security of your information.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						5.2. Legal Requirements
					</h3>
					<p>
						We may disclose your information if required to do so by law or in
						response to:
					</p>
					<ul className="list-disc pl-6 space-y-2">
						<li>Court orders or legal process</li>
						<li>Government requests or investigations</li>
						<li>Subpoenas or similar legal requirements</li>
						<li>Enforcement of our Terms and Conditions</li>
						<li>Protection against fraud, illegal activity, or harm</li>
					</ul>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						5.3. Business Transfers
					</h3>
					<p>
						If Borsalle is involved in a merger, acquisition, sale of assets, or
						bankruptcy, your information may be transferred as part of that
						transaction. We will notify you via email and/or prominent notice on
						our website of any change in ownership or uses of your information.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						5.4. With Your Consent
					</h3>
					<p>
						We may share your information with third parties when you have given
						us your consent to do so, such as when you choose to share content
						on social media platforms.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
					<p>
						6.1. <strong>Security Measures:</strong> We implement appropriate
						technical and organizational measures to protect your information
						against unauthorized access, alteration, disclosure, or destruction.
						These measures include encryption, secure socket layer technology
						(SSL), firewalls, and regular security assessments.
					</p>
					<p>
						6.2. <strong>Payment Security:</strong> All payment transactions are
						processed through secure payment gateways that comply with industry
						standards for data security, including PCI DSS compliance.
					</p>
					<p>
						6.3. <strong>Data Breach:</strong> In the event of a data breach
						that compromises your personal information, we will notify you and
						relevant authorities as required by applicable law.
					</p>
					<p>
						6.4. <strong>Limitations:</strong> While we take reasonable steps to
						protect your information, no method of transmission over the
						Internet or electronic storage is 100% secure. We cannot guarantee
						absolute security of your information.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						7. Your Rights and Choices
					</h2>
					<p>
						Depending on your location, you may have certain rights regarding
						your personal information:
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						7.1. Access and Correction
					</h3>
					<p>
						You have the right to access, update, or correct your personal
						information. You can update your account information directly
						through your account settings or contact us for assistance.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						7.2. Deletion and Restriction
					</h3>
					<p>
						You may request deletion of your personal information or restriction
						of its processing in certain circumstances. Note that we may need to
						retain certain information for legal, security, or business
						purposes.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						7.3. Data Portability
					</h3>
					<p>
						You may request a copy of your personal information in a structured,
						commonly used, and machine-readable format and have it transferred
						to another service provider where technically feasible.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						7.4. Marketing Preferences
					</h3>
					<p>
						You can opt out of receiving marketing communications from us by
						clicking the &ldquo;unsubscribe&ldquo; link in our emails or
						contacting us directly. Note that even if you opt out of marketing
						communications, you will still receive transactional emails related
						to your orders.
					</p>

					<h3 className="text-xl font-semibold mt-6 mb-3">
						7.5. Exercising Your Rights
					</h3>
					<p>
						To exercise any of these rights, please contact us using the
						information provided in the &ldquo;Contact Information&ldquo;
						section below. We will respond to your request within the timeframe
						required by applicable law.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						8. Children&ldquo;s Privacy
					</h2>
					<p>
						Our website and services are not directed to children under the age
						of 13. We do not knowingly collect personal information from
						children under 13. If you are a parent or guardian and believe that
						your child has provided us with personal information, please contact
						us, and we will delete such information from our records.
					</p>

					<h2 className="text-xl font-semibold mt-8 mb-4">
						9. International Data Transfers
					</h2>
					<p>
						Your information may be transferred to and processed in countries
						other than the country in which you reside. These countries may have
						different data protection laws than your country of residence. We
						will take appropriate measures to ensure that your personal
						information remains protected in accordance with this Privacy Policy
						and applicable law.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						10. Changes to This Privacy Policy
					</h2>
					<p>
						We may update this Privacy Policy from time to time to reflect
						changes in our practices or legal requirements. We will notify you
						of any material changes by posting the updated Privacy Policy on our
						website and updating the &ldquo;Last Updated&ldquo; date. Your
						continued use of our website and services after such changes
						constitutes your acceptance of the updated Privacy Policy.
					</p>

					<h2 className="text-2xl font-semibold mt-8 mb-4">
						11. Contact Information
					</h2>
					<p>
						If you have any questions, concerns, or requests regarding this
						Privacy Policy or our privacy practices, please contact us at:
						<br />
						<br />
						Borsalle Bakery
						<br />
						Attn: Privacy Officer
						<br />
						123 Bakery Lane, Sweet Street, Cakeville, CV1 2SD
						<br />
						Email: privacy@sweetdelights.com
						<br />
						Phone: (555) 123-4567
					</p>
				</div>

				<div className="mt-12 p-6 bg-blue-50 rounded-lg">
					<h3 className="text-xl font-semibold mb-4">Privacy Concerns?</h3>
					<p className="mb-4">
						If you have any questions about our Privacy Policy or how we handle
						your personal information, our privacy team is here to help.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link
							href="/contact"
							className="inline-flex items-center justify-center
							 px-6 py-3 border
							  border-transparent text-base font-medium 
							  rounded-md text-white bg-black hover:bg-white hover:border-black duration-300 transition hover:text-title"
						>
							Contact Privacy Team
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
