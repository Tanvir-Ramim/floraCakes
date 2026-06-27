import { OrderItemTypeA } from "@/@types";

const OrderItem = ({ item }: { item: OrderItemTypeA }) => (
  <li className="flex justify-between text-sm">
    <span>
      {item.quantity} × {item.name}
    </span>
    <span>${item.price.toFixed(2)}</span>
  </li>
);

export default OrderItem;
