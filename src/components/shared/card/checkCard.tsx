import Image from "next/image";
interface CheckProps {
  item: {
    id: string;
    title: string;
    flavour?: string;
    price: number;
    image?: string;
  };
}
const CheckCard = ({ item }: CheckProps) => {
  return (
    <>
      {" "}
      <div className="flex items-center space-y-3 gap-3">
        <div className="relative w-12 h-12 bg-white rounded-md border overflow-hidden">
          <div className="absolute top-0 right-0 w-5 h-5 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs">
            1
          </div>
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            width={60}
            height={60}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm">{item.title}</p>
          {item.flavour && (
            <p className="text-xs text-gray-500">{item.flavour}</p>
          )}
        </div>
        <p className=" lg:font-medium">${item.price.toFixed(2)}</p>
      </div>
    </>
  );
};

export default CheckCard;
