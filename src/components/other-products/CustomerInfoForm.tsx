import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ICus } from "@/app/(brc)/others-product/page";
interface CustomerInfoFormProps {
  onNext: () => void;
  onBack: () => void;
  onSubmit: (data: any) => void;
  setFormData: Dispatch<SetStateAction<ICus>>;
  formData: ICus;
}

const CustomerInfoForm = ({
  onNext,
  onBack,

  setFormData,
  formData,
}: CustomerInfoFormProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const deliveryAreas = [
    { id: 1, name: "Inside Dhaka", charge: 60 },
    { id: 2, name: "Outside Dhaka", charge: 120 },
    { id: 3, name: "Dhaka Suburbs", charge: 100 },
  ];

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div
      className={`max-w-4xl mx-auto md:mt-8 transition-all duration-300 ${
        isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Customer Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2  bg-gray-100"
            placeholder="John Doe"
          />
        </div>

        {/* Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-2  bg-gray-100"
              placeholder="01XXXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2  bg-gray-100"
              placeholder="your@email.com"
            />
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Delivery Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2  bg-gray-100"
            placeholder="House #, Road #, Area"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Additional Notes
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={3}
            className="w-full p-2  bg-gray-100"
            placeholder="Any special instructions..."
          />
        </div>

        {/* Delivery Area Selection */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Delivery Area <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {deliveryAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    area: area.name,
                    deliveryCharge: area.charge,
                  }))
                }
                className={`p-3 border rounded-sm cursor-pointer text-center transition-all ${
                  formData.area === area.name
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="font-medium md:text-base text-sm">
                  {area.name}
                </div>
                <div className="text-xs mt-1">৳{area.charge}</div>
              </button>
            ))}
          </div>
          {formData.area && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: <span className="font-medium">{formData.area}</span> (৳
              {formData.deliveryCharge} delivery charge)
            </p>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className="md:px-6 px-3 py-2.5 cursor-pointer  rounded-sm md:text-base text-xs border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="md:px-6 cursor-pointer px-3 py-2.5 rounded-sm md:text-base text-xs bg-black hover:bg-gray-800 text-white font-medium transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerInfoForm;
