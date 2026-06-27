import { PriceBreakdown } from "../calculation/PriceBreakdown";

export default function CheckoutSummary() {
  return (
    <div>
      <PriceBreakdown />

      <p className="text-xs italic text-subtitle">
        Taxes and <span className="text-title">shipping</span> calculated at
        checkout
      </p>
    </div>
  );
}
