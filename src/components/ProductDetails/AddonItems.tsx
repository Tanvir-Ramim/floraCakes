import { AddonItemsProps, IAddon } from "@/@types";
import addonService from "@/services/addon-service";
import { RootState } from "@/store";
import { buildCloudinaryUrl } from "@/utils/cloudinary";

import { GiftIcon, Plus } from "lucide-react";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddonItems: React.FC<AddonItemsProps> = ({
  selectedflavors,
  setSelectedflavors,
  selectedItems,
  setSelectedItems,
  flavors,
  showGiftBox,
}) => {
  const [showAddonTable, setShowAddonTable] = useState(!showGiftBox);
  const [addonItems, setAddon] = useState([]);
  const items = useSelector((state: RootState) => state.cart.items);
  const cart = items?.find((cd) => cd.isSelected) ?? null;
  const addParams = {
    type: "other",
    fields: "name,price,image",
  };

  const addon = async () => {
    try {
      const add = await addonService.getAddons(addParams);
      setAddon(add.data.addons);
    } catch {
      console.error("Failed To Fetch Addons");
    }
  };
  useEffect(() => {
    addon();
  }, []);
  const handleflavorToggle = (flavorName: string) => {
    const newFlavor = flavors.find((flavor) => flavor?.name === flavorName);
    if (!newFlavor) return;

    setSelectedflavors((prev) =>
      prev?.name === flavorName ? prev : newFlavor
    );
  };

  const handleItemToggle = (itemName: string) => {
    setSelectedItems((prev) =>
      prev.some((i) => i.name === itemName)
        ? prev.filter((i) => i.name !== itemName)
        : [...prev, addonItems.find((item) => item?.name === itemName)!]
    );
  };
  console.log({ cart });
  
  return (
    <div className="w-full relative  z-0">
      <button
        className="w-full flex items-center gap-1.5  border cursor-pointer border-gray-300 py-2 px-4 
        text-left rounded hover:border-author"
        onMouseEnter={() => setShowAddonTable(true)}
        onMouseLeave={() => setShowAddonTable(false)}
      >
        🎁 ADD-ONS <Plus className="w-4 h-4" />
      </button>

      <div
        className={`origin-top-right absolute top-10 left-[50%] lg:left-[50%]
           transform -translate-x-1/2 w-full lg:min-w-[220px] bg-white border border-slate-200 p-4 rounded-lg shadow-xl transition-all duration-300 ease-out ${
             showAddonTable
               ? "opacity-100 translate-y-0 visible "
               : "opacity-0 translate-y-2 invisible"
           }`}
        onMouseEnter={() => setShowAddonTable(true)}
        onMouseLeave={() => setShowAddonTable(false)}
      >
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 `}>
          {/* flavors Section */}
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🍦 flavors
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-subtitle">
                <p>Name</p> <p>Price</p>
              </div>
              {flavors?.map((flavor: { name: string; price: number }) => (
                <label
                  key={flavor?.name}
                  htmlFor={`flavor-${flavor?.name}`}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`flavor-${flavor?.name}`}
                      checked={
                        selectedflavors && selectedflavors.name === flavor?.name
                      }
                      onChange={() => handleflavorToggle(flavor?.name)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">
                      {flavor?.name}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {flavor?.price}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Addon Items Section */}
          {/* <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              🎁 Accesoris / Gift
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-sm text-subtitle">
                <p>Name</p> <p>Price</p>
              </div>
              {addonItems.map((item: IAddon, ind: number) => (
                <label
                  key={ind}
                  htmlFor={`item-${item?.name}`}
                  className="flex items-center justify-between gap-2 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`item-${item?.name}`}
                      checked={selectedItems?.some((i) => i.name === item?.name)}
                      onChange={() => handleItemToggle(item?.name)}
                      className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2"
                    />
                    <span className="text-sm text-gray-700">{item?.name}</span>
                  </div>
                  <div className="w-18 h-18 relative rounded-lg overflow-hidden">
                    {item?.image?.public_id && (
                      <Image
                        src={
                          buildCloudinaryUrl(
                            item?.image?.public_id,
                            "q_auto,f_auto,w_600,h_600,c_fill"
                          ) || "/images/no-image.png"
                        }
                        alt={`Addon ${ind + 1}`}
                        fill
                        className=" object-fit object-center"
                      />
                    )}
                  </div>

                  <span className="text-sm font-medium text-gray-600">
                    ${item?.price}
                  </span>
                </label>
              ))}
            </div>
          </div> */}
          <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <GiftIcon className="w-5 h-5 text-amber-500" />
              Gifts & Accessories
            </h3>

            <div className="space-y-3">
              {addonItems.map((item: IAddon) => (
                <div
                  key={item?.name}
                  className="flex items-center justify-between p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {/* Item image with checkbox overlay */}
                    <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                      {item?.image?.public_id ? (
                        <Image
                          src={buildCloudinaryUrl(
                            item?.image.public_id,
                            "q_auto,f_auto,w_200,h_200,c_fill"
                          )}
                          alt={item?.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <Image
                            src="/images/no-image.png"
                            alt="No image"
                            width={32}
                            height={32}
                            className="opacity-50"
                          />
                        </div>
                      )}

                      {/* Checkbox overlay */}
                      <div className="absolute top-1 right-1 bg-white/80 p-1 rounded-full shadow-xs">
                        <input
                          type="checkbox"
                          checked={selectedItems?.some(
                            (i) => i.name === item?.name
                          )}
                          onChange={() => handleItemToggle(item?.name)}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                      </div>
                    </div>

                    {/* Item name and price */}
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {item?.name}
                      </h4>
                      <p className="text-amber-600 font-medium">
                        Tk {item?.price?.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddonItems;
