import { LuMinus, LuPlus } from "react-icons/lu";

interface QuantityProps {
  quantity: number;
  onChange: (value: number) => void;
}

const QuantityInput = ({ quantity, onChange }: QuantityProps) => {
  const handleDecrease = () => {
    if (quantity > 1) onChange(quantity - 1);
  };

  const handleIncrease = () => {
    onChange(quantity + 1);
  };

  return (
    <div className="bg-gray-200 mt-2 px-2 inline-flex items-center py-1 justify-between w-[80px] rounded">
      <button onClick={handleDecrease} className="cursor-pointer">
        <LuMinus size={12} />
      </button>

      <p className="w-4 text-center text-sm">{quantity}</p>

      <button onClick={handleIncrease} className="cursor-pointer">
        <LuPlus size={12} />
      </button>
    </div>
  );
};

export default QuantityInput;
