"use client";

import { useState } from "react";

import { Star, X } from "lucide-react";
import UploadMedia from "../ui/UploadMedia/UploadMedia";
import { IReviewAdd } from "@/services/review.service";
import { useAddReviewHook } from "@/hooks/reviewHook";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cake: { id: string; name: string };
}

export default function ReviewModal({
  isOpen,
  onClose,
  cake,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { mutate, isPending } = useAddReviewHook();

  const [formData, setFormData] = useState<IReviewAdd>({
    user: "",
    email: "",
    title: "",
    comment: "",
    cakeId: cake.id || "",
    cakeName: cake.name || "",
    image: null,
    orderId: "",
    customerId: "",
    rating: 0,
  });

  if (!isOpen) return null;

  // addReviewHook

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    if (rating === 0) {
      alert("Please select a rating before submitting.");
      return;
    }
    const formDataToSubmit = {
      ...formData,
      rating,
      image: formData.image || null, // Ensure image is set to null if not provided
    };

    const fd = new FormData();
    Object.entries(formDataToSubmit).forEach(([key, value]) =>
      fd.append(key, value instanceof Blob ? value : String(value))
    );

    mutate(fd, {
      onSuccess: () => {
        alert("Review submitted successfully!");

        onClose();
      },
      onError: (error: Error) => {
        alert(
          error.error ||
            "An error occurred while submitting your review. Please try again."
        );
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleFile = (file: Blob | MediaSource, label: string) => {
    // Handle the file upload here
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    console.log("Received file:", file, "with label:", label);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex
         items-center justify-center z-50"
    >
      <div
        className="bg-white mt-20 rounded-lg p-6 max-w-2xl 
            w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Write a Review</h2>
          <button
            onClick={onClose}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Cake ID<span className="text-red-500 font-bold">*</span>{" "}
            </label>

            <input
              value={cake.id}
              onChange={handleInputChange}
              name="cakeId"
              disabled
              className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Name <span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <input
              type="text"
              name="user"
              value={formData.user}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Order ID<span className="text-red-500 font-bold">*</span>
              </label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm"
                placeholder="Enter your order ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Customer ID (Optional)
              </label>
              <input
                type="text"
                name="customerId"
                value={formData.customerId}
                onChange={handleInputChange}
                className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm"
                placeholder="Enter your customer ID"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email/Phone <span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm"
              placeholder="Enter your email/phone "
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Rating<span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="text-2xl focus:outline-none"
                >
                  <Star
                    size={24}
                    className={`${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Review Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm"
              placeholder="Give your review a title"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Review<span className="text-red-500 font-bold">*</span>{" "}
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-100 focus:outline-none  rounded-md text-sm  h-32 resize-none"
              placeholder="Write your comments here"
              required
            />
          </div>

          <div>
            <UploadMedia handleFile={handleFile} label="review-media" />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className=" bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
