"use client";

import type React from "react";

import FAQSection from "@/components/gift/faq-section";
import GiftCardSelection from "@/components/gift/gift-card-selection";
import PageHeader from "@/components/gift/page-header";
import PaymentDetails from "@/components/gift/payment-details";
import ProgressSteps from "@/components/gift/progress-steps";
import RecipientDetails from "@/components/gift/recipient-details";
import GlobalBanner from "@/components/shared/globalBanner";

import { useEffect, useState } from "react";
import { useFetchGiftCard, useGiftPurchase } from "@/hooks/giftHook";
import { toast } from "react-toastify";

interface GiftCard {
  giftId: string;
  // other gift card properties...
}

export interface FormData {
  recipientName?: string;
  recipientPhone?: string;
  recipientEmail?: string;
  message: string;
  giftId: string;
  purchasedByName: string;
  purchasedByIdentify: string;
  emailOption: string;
}

type DeliveryOption = "me" | "him" | "both";

export default function GiftCardsPage() {
  const [selectedCard, setSelectedCard] = useState<GiftCard | undefined>(
    undefined
  );
  const { data } = useFetchGiftCard();
  const { mutate: purchaseGift, isPending } = useGiftPurchase();

  const [step, setStep] = useState<number>(1);
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>();
  const [formData, setFormData] = useState<FormData>({
    recipientName: "",
    recipientPhone: "",
    recipientEmail: "",
    message: "",
    giftId: "",
    purchasedByName: "",
    purchasedByIdentify: "",
    emailOption: "",
  });
  const resetForm = () => {
    setSelectedCard(undefined);
    setStep(1);
    setDeliveryOption(undefined);
    setFormData({
      recipientName: "",
      recipientPhone: "",
      recipientEmail: "",
      message: "",
      giftId: "",
      purchasedByName: "",
      purchasedByIdentify: "",
      emailOption: "",
    });
  };
  // Handle delivery option changes
  useEffect(() => {
    if (deliveryOption) {
      setFormData((prev) => ({
        ...prev,
        emailOption: deliveryOption,
      }));
    }
  }, [deliveryOption]);

  // Handle selected card changes
  useEffect(() => {
    if (selectedCard) {
      setFormData((prev) => ({
        ...prev,
        giftId: selectedCard.giftId,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        giftId: "", // Clear ID if no card selected
      }));
    }
  }, [selectedCard]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!selectedCard) {
      alert("Please select a gift card");
      return false;
    }

    return true;
  };

   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (step < 3) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Final submission
      purchaseGift(formData, {
        onSuccess: () => {
          toast.success("Thank you for your purchase! The gift card will be sent to the recipient.");
          resetForm();
        },
        onError: (error) => {
          toast.error(`Purchase failed: ${error.message}`);
        }
      });
    }
  };


  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  console.log(data);
  console.log({ formData });
  return (
    <div className="min-h-screen ">
      <GlobalBanner url={data && data[0]?.image?.url} title="Gift Cards" />

      <div className="container mx-auto px-2 py-12">
        <div className="container mx-auto">
          <PageHeader />
          <ProgressSteps currentStep={step} />

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <GiftCardSelection
                giftCardData={data}
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
                setStep={setStep}
              />
            )}

            {step === 2 && (
              <RecipientDetails
                formData={formData}
                handleInputChange={handleInputChange}
                emailOption={deliveryOption}
                setDeliveryOption={setDeliveryOption}
                selectedCard={selectedCard}
                goBack={goBack}
                setStep={setStep}
              />
            )}

            {step === 3 && (
              <PaymentDetails
                formData={formData}
                handleInputChange={handleInputChange}
                selectedCard={selectedCard}
                goBack={goBack}
              />
            )}
          </form>

          <FAQSection />
        </div>
      </div>
    </div>
  );
}
