"use client";

import type React from "react";
import type { GiftCard } from "@/@types";
import { ChevronRight, Gift, Mail, User, Phone, AlertCircle } from "lucide-react";

interface RecipientDetailsProps {
  formData: {
    recipientName: string;
    recipientPhone: string;
    recipientEmail: string;
    purchasedByName: string;
    purchasedByIdentify: string;
    message: string;
    emailOption: string;
    [key: string]: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  emailOption?: string;
  setDeliveryOption: (option: string) => void;
  selectedCard?: GiftCard;
  goBack: () => void;
  setStep: (step: number) => void;
  errors?: { [key: string]: string };
}

export default function RecipientDetails({
  formData,
  handleInputChange,
  emailOption,
  setDeliveryOption,
  selectedCard,
  goBack,
  setStep,
  errors = {},
}: RecipientDetailsProps) {
  const handleContinue = () => {
    if (!formData.purchasedByName || !formData.purchasedByIdentify) return;
    setStep(3);
  };

  return (
    <div className="bg-white rounded-md shadow-sm p-3 md:p-8  mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recipient Details</h2>
      <p className="text-gray-500 mb-6">Fill in the recipient information and delivery preferences</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Recipient Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Recipient Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="recipientName"
                    name="recipientName"
                    type="text"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className={`pl-10 w-full border ${errors.recipientName ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Enter recipient's full name"
                  />
                </div>
                {errors.recipientName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.recipientName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="recipientEmail"
                    name="recipientEmail"
                    type="email"
                    value={formData.recipientEmail}
                    onChange={handleInputChange}
                    className={`pl-10 w-full border ${errors.recipientEmail ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Enter recipient's email"
                  />
                </div>
                {errors.recipientEmail && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.recipientEmail}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="recipientPhone"
                    name="recipientPhone"
                    type="tel"
                    value={formData.recipientPhone}
                    onChange={handleInputChange}
                    className={`pl-10 w-full border ${errors.recipientPhone ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Enter recipient's phone number"
                  />
                </div>
                {errors.recipientPhone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.recipientPhone}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Your Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Your Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="purchasedByName" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="purchasedByName"
                    name="purchasedByName"
                    type="text"
                    value={formData.purchasedByName}
                    onChange={handleInputChange}
                    className={`pl-10 w-full border ${errors.purchasedByName ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                {errors.purchasedByName && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.purchasedByName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="purchasedByIdentify" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email or Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    id="purchasedByIdentify"
                    name="purchasedByIdentify"
                    type="text"
                    value={formData.purchasedByIdentify}
                    onChange={handleInputChange}
                    className={`pl-10 w-full border ${errors.purchasedByIdentify ? 'border-red-500' : 'border-gray-300'} rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black`}
                    placeholder="Enter your email or phone number"
                    required
                  />
                </div>
                {errors.purchasedByIdentify && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.purchasedByIdentify}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
              <Mail className="h-5 w-5 mr-2" />
              Delivery Options
            </h3>
            
            <div className="space-y-2">
              {formData.recipientEmail && (
                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${emailOption === "him" ? 'bg-gray-100 border-gray-400' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                  <input
                    type="radio"
                    name="emailOption"
                    value="him"
                    checked={emailOption === "him"}
                    onChange={() => setDeliveryOption("him")}
                    className="form-radio h-4 w-4 text-black focus:ring-black"
                  />
                  <span className="ml-3 text-gray-700">Email to Recipient</span>
                </label>
              )}
              
              <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${emailOption === "me" ? 'bg-gray-100 border-gray-400' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                <input
                  type="radio"
                  name="emailOption"
                  value="me"
                  checked={emailOption === "me"}
                  onChange={() => setDeliveryOption("me")}
                  className="form-radio h-4 w-4 text-black focus:ring-black"
                />
                <span className="ml-3 text-gray-700">Email to Me</span>
              </label>

              {formData.recipientEmail && (
                <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${emailOption === "both" ? 'bg-gray-100 border-gray-400' : 'bg-white border-gray-300 hover:border-gray-400'}`}>
                  <input
                    type="radio"
                    name="emailOption"
                    value="both"
                    checked={emailOption === "both"}
                    onChange={() => setDeliveryOption("both")}
                    className="form-radio h-4 w-4 text-black focus:ring-black"
                />
                  <span className="ml-3 text-gray-700">Email to Both</span>
                </label>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Personal Message */}
      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          Personal Message (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Add a personal message to the recipient"
          rows={3}
          className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-black"
          maxLength={200}
        />
        <div className="flex justify-between mt-1">
          <p className="text-sm text-gray-500">Maximum 200 characters</p>
          <p className="text-sm text-gray-500">{formData.message.length}/200</p>
        </div>
      </div>

      {/* Gift Card Summary */}
      <div className="bg-gray-50 rounded-xl md:p-6 p-2 mb-8 border border-gray-200">
        <div className="flex items-start">
          <div className="bg-black md:p-2 p-1 rounded-lg mr-4">
            <Gift className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 md:text-lg">Gift Card Summary</h3>
            <p className="text-gray-600 md:text-base text-sm">{selectedCard?.title}</p>
            <div className="flex justify-between items-center  mt-2">
              <p className="text-gray-700 ">Total Amount</p>
              <p className="font-bold text-black md:text-xl">${selectedCard?.amount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={goBack}
          className="border border-gray-300 cursor-pointer text-gray-700 md:px-4 px-2 py-2 rounded-md  hover:bg-gray-50 transition-colors md:text-base text-sm font-medium"
        >
          Back
        </button>

        <button
          type="button"
          disabled={!formData.purchasedByName || !formData.purchasedByIdentify}
          onClick={handleContinue}
          className="bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white cursor-pointer md:text-base text-sm md:px-4 px-2 py-2 rounded-md flex items-center transition-colors font-medium"
        >
          Continue to Payment
          <ChevronRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
}