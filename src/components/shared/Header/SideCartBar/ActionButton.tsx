"use client";

import { IAddon } from "@/@types";
import CartAddOn from "@/components/cart/CartAddOn";
import Coupon from "@/components/cart/CouponCode";
import OrderInstructions from "@/components/cart/order-instructions";

import Button from "@/components/ui/button/button";

import { RootState } from "@/store";
import {
  addMessageToItem,
  IUpdatePrice,
  updatePrice,
} from "@/store/features/cartSlice";
import { AnimatePresence, motion } from "framer-motion";

import { useCallback, useEffect, useState } from "react";
import { BsGift } from "react-icons/bs";
import { FiFileText } from "react-icons/fi";
import { RiCoupon3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ActionButton = () => {
  const [showNoteBox, setShowNoteBox] = useState(false);

  const [showCouponBox, setShowCouponBox] = useState(false);

  const [showGiftBox, setShowGiftBox] = useState(false);
  const toggleNote = () => {
    setShowNoteBox(!showNoteBox);
    setShowCouponBox(false);
    setShowGiftBox(false);
  };

  const toggleCoupon = () => {
    setShowCouponBox(!showCouponBox);
    setShowNoteBox(false);
    setShowGiftBox(false);
  };

  const toggleGift = () => {
    setShowGiftBox(!showGiftBox);
    setShowNoteBox(false);
    setShowCouponBox(false);
  };
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [userMessage, setUserMessage] = useState<{ [key: string]: string }>({});
  const selectedItemId = items?.find((cd) => cd.isSelected) ?? null;

  // Determine shipping cost

  const handleMessage = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Handle the change event for order instructions
    setUserMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleItemMessage = () => {
    if (!selectedItemId?.id) {
      alert("Please select an item to add a message.");
      return;
    }
    dispatch(
      addMessageToItem({
        id: selectedItemId?.id,
        message: userMessage,
      })
    );
    alert("Message added successfully!");
  };

  const [selectedWeight, setSelectedWeight] = useState<{
    weight: string;
    price: number;
  }>({ weight: "", price: 0 });

  const [selectedFlavours, setSelectedFlavours] = useState<{
    name: string;
    price: number;
  }>({ name: "", price: 0 });

  const [selectedAddons, setSelectedAddons] = useState<IAddon[]>([]);
  const [tempAddons, setTempAddons] = useState<IAddon[]>([]); // Temporary selection

  // Handle weight and flavor updates
  const handleUpdateCart = useCallback(() => {
    if (!selectedItemId?.id) return;

    const updateData: IUpdatePrice = {
      id: selectedItemId.id,
      ...(selectedFlavours.name && { flavor: selectedFlavours }),
      ...(selectedWeight.weight && { weight: selectedWeight }),
      // Removed addons from here
    };

    dispatch(updatePrice(updateData));

    setSelectedWeight({ weight: "", price: 0 });
    setSelectedFlavours({ name: "", price: 0 });

    toast.success("Cart updated successfully!");
  }, [selectedItemId?.id, selectedFlavours, selectedWeight, dispatch]);

  // Handle add-ons separately
  const addAddons = useCallback(() => {
    console.log({ tempAddons, selectedItemId });
    if (!selectedItemId?.id || tempAddons.length === 0) return;

    const updateData: IUpdatePrice = {
      id: selectedItemId.id,
      addons: [...tempAddons], // Merge existing and new addons
    };

    dispatch(updatePrice(updateData));

    setTempAddons([]);

    toast.success("Add-ons updated successfully!");
  }, [selectedItemId?.id, tempAddons, selectedAddons, dispatch]);

  // Auto-update for weight and flavor only
  useEffect(() => {
    const hasChanges = selectedFlavours.name || selectedWeight.weight;

    if (selectedItemId?.id && hasChanges) {
      handleUpdateCart();
    }
  }, [selectedFlavours, selectedWeight, selectedItemId?.id, handleUpdateCart]);
  // Handle add-ons uniqueness separately
  useEffect(() => {
    // Only update if selectedAddons has changed and isn't empty
    if (selectedAddons && selectedAddons.length > 0) {
      setTempAddons([...selectedAddons]);
    } else {
      setTempAddons([]);
    }
  }, [selectedAddons]);

  console.log({ selectedFlavours, selectedAddons, selectedWeight });
  return (
    <>
      {/* Weight Selection */}
      <div>
        {selectedItemId?.weight && (
          <h3 className="text-sm font-medium mb-2">
            Weight:
            <span className="text-subtitle text-sm capitalize">
              {selectedItemId?.weight}
            </span>
          </h3>
        )}
        <div className="flex overflow-x-auto py-1 gap-2 mb-5">
          {selectedItemId?.cake?.servingSize?.map((w, ind: number) => (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedWeight(w)}
              className={`rounded border text-sm px-2 py-1 cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap ${
                w.weight === selectedItemId?.weight.toString() + " kg"
                  ? "border-author"
                  : "border-gray"
              }`}
              aria-label={`Select ${w.weight} weight`}
            >
              {w.weight}kg : {w.price}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 border-t border-b border-border-color text-center">
        <Button
          icon={<FiFileText />}
          label="Add note"
          layout="vertical"
          className="px-1 text-xs font-normal"
          variant="default"
          onClick={toggleNote}
        />
        <Button
          icon={<BsGift />}
          label="Add Gift"
          layout="vertical"
          className="px-1 text-xs font-normal"
          variant="default"
          onClick={toggleGift}
        />
        <Button
          icon={<RiCoupon3Line />}
          label="Add Coupon"
          layout="vertical"
          className="px-1 text-xs font-normal"
          variant="default"
          onClick={toggleCoupon}
        />
      </div>

      <AnimatePresence>
        {showNoteBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-b border-border-color">
              <OrderInstructions onChange={handleMessage} />
              <div className="mt-8">
                <Button
                  onClick={() => handleItemMessage()}
                  label="Submit"
                  className="w-1/4"
                ></Button>
              </div>
            </div>
          </motion.div>
        )}

        {showGiftBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-b"
          >
            {" "}
            <div className=" w-full overflow-y-auto h-[400px]">
              <CartAddOn
                selectedflavors={selectedItemId?.flavor}
                setSelectedflavors={setSelectedFlavours}
                selectedItems={
                  (tempAddons.length && tempAddons) || selectedItemId?.addons
                }
                setSelectedItems={setSelectedAddons}
                flavors={selectedItemId?.cake?.flavor}
                showGiftBox={showGiftBox}
              />
            </div>
            <Button className="outline" label onClick={addAddons}></Button>
          </motion.div>
        )}

        {showCouponBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Coupon />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ActionButton;
