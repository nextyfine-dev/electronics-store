import { PricingRule } from "./interfaces";

class Checkout {
  private pricingRules: PricingRule[];
  private scannedItems: string[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
    this.scannedItems = [];
  }

  scan(item: string) {
    this.scannedItems.push(item);
  }

  //* Solution 1
  total(): number {
    let totalPrice = 0;
    let threeFor2Count = 0;
    let bulkItemCount = 0;

    // Iterate over the scanned items
    for (const item of this.scannedItems) {
      const pricingRule = this.pricingRules.find((rule) => rule.sku === item);
      if (pricingRule) {
        totalPrice += pricingRule.price;

        // Count the number of items eligible for 3-for-2 and bulk discounts
        if (pricingRule.discount?.type === "3for2") {
          threeFor2Count++;
        } else if (pricingRule.discount?.type === "bulk") {
          bulkItemCount++;
        }
      }
    }

    // Apply 3-for-2 discount if applicable
    if (threeFor2Count >= 3) {
      const itemCount = Math.floor(threeFor2Count / 3) * 2;
      for (let index = 0; index < itemCount; index++) {
        totalPrice -=
          this.pricingRules.find((rule) => rule.discount?.type === "3for2")
            ?.price || 0;
      }
    }

    // Apply bulk discount if applicable
    if (
      bulkItemCount ===
      this.pricingRules.find((rule) => rule.discount?.type === "bulk")?.discount
        ?.requiredQuantity
    ) {
      totalPrice -=
        bulkItemCount *
        (this.pricingRules.find((rule) => rule.discount?.type === "bulk")
          ?.price || 0);
      totalPrice +=
        bulkItemCount *
        (this.pricingRules.find((rule) => rule.discount?.type === "bulk")
          ?.discount?.discountedPrice || 0);
    }

    return Number(totalPrice.toFixed(2));
  }

  //* Solution 2
  total1(): number {
    let totalPrice = 0;

    const threeFor2Items: PricingRule[] = [];
    const bulkItems: PricingRule[] = [];

    // Iterate over the scanned items
    for (const item of this.scannedItems) {
      const pricingRule = this.pricingRules.find((rule) => rule.sku === item);
      if (pricingRule) {
        if (pricingRule.discount) {
          if (pricingRule.discount.type === "3for2") {
            threeFor2Items.push(pricingRule);
          } else if (pricingRule.discount.type === "bulk") {
            bulkItems.push(pricingRule);
          }
        } else {
          totalPrice += pricingRule.price;
        }
      }
    }

    const threeFor2Count = threeFor2Items.length;
    const bulkItemCount = bulkItems.length;

    // Apply 3-for-2 discount if applicable
    if (threeFor2Count !== 0) {
      if (threeFor2Count >= 3) {
        const itemCount = Math.floor(threeFor2Count / 3) * 2;
        for (let index = 0; index < itemCount; index++) {
          totalPrice += threeFor2Items[index].price;
        }
      } else {
        for (let i = 0; i < threeFor2Count; i++) {
          totalPrice += threeFor2Items[i].price;
        }
      }
    }

    // Apply bulk discount if applicable
    if (bulkItemCount !== 0) {
      if (bulkItemCount === bulkItems[0].discount?.requiredQuantity) {
        for (let index = 0; index < bulkItemCount; index++) {
          totalPrice += bulkItems[index].discount?.discountedPrice!!;
        }
      } else {
        for (let i = 0; i < bulkItemCount; i++) {
          totalPrice += bulkItems[i].price;
        }
      }
    }

    return Number(totalPrice.toFixed(2));
  }
}

export default Checkout;
