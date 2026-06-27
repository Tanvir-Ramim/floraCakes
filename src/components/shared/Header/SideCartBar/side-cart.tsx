import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
interface ItemProps {
  title: string;
  price: number;
  id: string;
  quantity: number;
  discount_Price?: number;
  image: string;
}

const SideCart = ({ item }: { item: ItemProps }) => {
  return (
    <div>
      {" "}
      <div key={item.title} className="flex gap-3 px-6 mt-6">
        <div>
          <Image
            src={item.image}
            alt="cake"
            width={70}
            height={70}
            className="border rounded"
          />
        </div>
        <div className="md:text-sm text-[12px] w-full">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[#262626]/80">Chocolate Chips Madeleines</h2>
            <FaXmark />
          </div>
          <p className="text-[12px] text-[#262626]/60">Color : Red</p>
          <div className="">
            <p
              className="text-sm 
              font-medium text-title flex gap-2  "
            >
              ${item?.price}
              {item?.discount_Price && (
                <span className="text-price  line-through">
                  ${item?.discount_Price}
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideCart;
