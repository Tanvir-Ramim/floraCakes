"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";

import { useState } from "react";

import {
  FaClock,
  FaEnvelope,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa6";
import Container from "@/components/shared/container/Container";

// This would come from your CMS or API in a real application
const contactData = {
  title: "Get in Touch",
  subtitle: "We'd love to hear from you",
  description:
    "Borsalle is an award-winning artisan cake boutique company in Dhaka. We specialize in exquisitely hand-crafted premium celebration cakes and other desserts for any occasion. We have a team of highly skilled cake designers and decorators who can create a truly personalized and memorable cake that is bound to delight your special occasion",
  address: "Mirpur DOHS, Dhaka, Dhaka 1216, BD",
  phone: "+88 01322555996",
  email: "hello@borsalle.com",
  hours: "Monday - Saturday: 9am - 6pm, Sunday: 10am - 4pm",
  mapUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6947.317028136903!2d90.36501104141328!3d23.837090178125614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c14a3366b005%3A0x901b07016468944c!2sMirpur%20DOHS%2C%20Dhaka!5e1!3m2!1sen!2sbd!4v1747755259888!5m2!1sen!2sbd",
  socialMedia: [
    { name: "Instagram", url: "https://instagram.com" },
    { name: "Facebook", url: "https://facebook.com" },
    { name: "Twitter", url: "https://twitter.com" },
    {
      name: "Linkedin",
      url: "https://www.linkedin.com/company/borsalle/about",
    },
  ],
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Sanitize input function
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Sanitize all inputs
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sanitizedData.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Send using FormSubmit.co
      const response = await fetch(
        "https://formsubmit.co/ajax/trypandoro@gmail.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            ...sanitizedData,
            _subject: `New Query Form Borsalle: ${sanitizedData.subject}`,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to send message");
      }

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "There was an error submitting your form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="max-w-7xl mt-10 lg:mt-20 mx-auto px-4 py-12 bg-white">
      {/* Hero */}
      <section className="text-center mb-16">
        <h1 className=" md:text-4xl text-2xl font-bold mb-4 tracking-tight text-gray-900">
          {contactData.title}
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          {contactData.subtitle}
        </p>
      </section>

      {/* Info + Form */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Info */}
        <div className="space-y-6 order-2 lg:order-1">
          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-6 text-black">
              Contact Information
            </h2>
            <p className="text-gray-600 mb-8">{contactData.description}</p>

            <div className="space-y-6">
              {[
                {
                  icon: <FaMapMarkerAlt />,
                  title: "Our Location",
                  value: contactData.address,
                },
                {
                  icon: <FaPhoneAlt />,
                  title: "Phone Number",
                  value: contactData.phone,
                },
                {
                  icon: <FaEnvelope />,
                  title: "Email Address",
                  value: contactData.email,
                },
                {
                  icon: <FaClock />,
                  title: "Working Hours",
                  value: contactData.hours,
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="bg-white shadow-md p-4 rounded-full text-black text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{item.title}</h3>
                    <p className="text-gray-600">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-10">
              <h3 className="font-semibold text-black mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                  (Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="bg-white p-3 rounded-full shadow hover:bg-gray-200 text-black transition"
                    >
                      <Icon />
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 order-1 lg:order-2">
          <h2 className="text-2xl font-bold mb-6 text-black">
            Send Us a Message
          </h2>

          {submitSuccess ? (
            <div className="bg-gray-100 border border-gray-300 text-black p-4 rounded-lg mb-6">
              Thank you for your message! We will get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-gray-100 border border-gray-300 text-black p-4 rounded-lg">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                />
              </div>

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              >
                <option value="">Select a subject</option>
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Custom Cake">Custom Cake</option>
                <option value="Feedback">Feedback</option>
                <option value="Other">Other</option>
              </select>

              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <FaPaperPlane /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Map */}
      <section className="mt-16">
        <h2 className="text-3xl my-8 font-bold  text-center text-black">
          Find Us
        </h2>
        <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
          <iframe
            src={contactData.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="SweetDelights Location"
          />
        </div>
      </section>
    </Container>
  );
}
