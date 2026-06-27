import { RootState } from "@/store";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function ShippingProgress({}) {
  const items = useSelector((state: RootState) => state.cart.items);
  const selectedItem = items.find((item) => item.isSelected === true);

  return (
    <div className=" bg-[#F8F9FA] py-5 relative">
      {
        (selectedItem?.thumbImage?.url || selectedItem?.img) && (
          <Image
            src={
              selectedItem?.img ||
              selectedItem?.thumbImage?.url ||
              "/placeholder.svg"
            }
            alt={selectedItem?.title || "Selected Item"}
            width={100}
            height={100}
            className="w-full object-cover  rounded-md mx-auto mb-4"
          />
        )}
      <p className={` text-base  absolute ${selectedItem?.title ? "bottom-11 " :"bottom-1"} ml-1.5 pt-6 `}>
        {selectedItem?.title || "No item selected"}
        <br />
        {selectedItem?.id}
      </p>
    </div>
  );
}
