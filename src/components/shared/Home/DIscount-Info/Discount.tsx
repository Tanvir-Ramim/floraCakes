"use client";

import { useState } from "react";
import Container from "../../container/Container";
import { toast } from "react-toastify";

export default function DiscountInfo() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Subscribed with email:", email);
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
          email,
          _subject: `Subscriber`,
          _template: "table",
          _captcha: "false",
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to send message");
    }
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    toast.success("Subscribtion Success");
  }

  return (
    <div className=" bg-white px-5 md:px-0">
      {/* Blog Posts Section */}
      <Container className="md:py-20 py-14 md:mt-0 mt-5">
        <div className=" ">
          <div
            className={`flex flex-col justify-center items-center text-center gap-2 overflow-hidden `}
          >
            <div className="flex items-center justify-center flex-col gap-2">
              <h2 className="text-2xl lg:text-4xl   ">Get Discount Info</h2>
            </div>
            <p className="xl:px-40 mt-4 text-[13px] lg:text-sm  text-subtitle">
              Subscribe to the Outstock mailing list to receive updates on new
              arrivals, special offers <br />
              and other discount information.
            </p>
          </div>

          <div className=" mt-14 relative ">
            <div className="max-w-[700px] mx-auto text-center">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  className="w-full text-center text-sm py-3 border-b border-gray-200 outline-none mb-10 placeholder-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={subscribed}
                  className="mx-auto  cursor-pointer block border border-black px-8 py-3 text-[13px] font-semibold hover:bg-black hover:text-white transition-all"
                >
                  {subscribed ? "SUBSCRIBED" : "SUBSCRIBE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
