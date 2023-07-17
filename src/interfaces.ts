export interface PricingRule {
  sku: string;
  name: string;
  price: number;
  discount?: {
    // Discount properties (3 for 2 deal, bulk discount, etc.)
    type: "3for2" | "bulk";
    requiredQuantity?: number; // Required quantity for bulk discount
    discountedPrice?: number; // Discounted price for bulk discount
  };
}
