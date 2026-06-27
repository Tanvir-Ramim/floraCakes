

import { Badge } from "@/components/ui/card/badge";
import { Card } from "@/components/ui/card/card";
import getStatusColor from "@/components/utils/getColor";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FC, MouseEvent } from "react";
import OrderDetailsA from "./OrderDetails";

interface OrderCardProps {
  
  expanded: boolean;
  toggleExpand: () => void;
  onReorder: () => void;
}

const OrderCard: FC<OrderCardProps> = ({
  order,
  expanded,
  toggleExpand,
  onReorder,
}) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleExpand();
  };

  return (
    <Card className="overflow-hidden transition-all duration-200">
      <div
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 
        cursor-pointer hover:bg-author/10 transition-colors"
        onClick={toggleExpand}
      >
        <div className="space-y-1 mb-2 sm:mb-0">
          <div className="font-medium">Order #{order?.orderId}</div>
          <div className="text-sm text-gray-500">
            {new Date(order?.orderDate).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <Badge className={getStatusColor(order?.deliveryStatus)}>
            {order?.deliveryStatus}
          </Badge>
          <div className="font-medium">
            ${order?.paymentInfo?.orderAmount}
          </div>
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleClick}
            aria-label={expanded ? "Collapse order" : "Expand order"}
          >
            {expanded ? (
              <ChevronUp size={18} className="text-gray-600" />
            ) : (
              <ChevronDown size={18} className="text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="border-t">
          <OrderDetailsA order={order} onReorder={onReorder} />
        </div>
      )}
    </Card>
  );
};

export default OrderCard;
