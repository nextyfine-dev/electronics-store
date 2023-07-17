import Checkout from "./Checkout.js";
import { PricingRule } from "./interfaces";

const pricingRules: PricingRule[] = [
  {
    sku: "op10",
    name: "Oneplus 10",
    price: 849.99,
  },
  {
    sku: "op11",
    name: "Oneplus 11",
    price: 949.99,
    discount: {
      type: "bulk",
      requiredQuantity: 5,
      discountedPrice: 899.99,
    },
  },
  {
    sku: "buds",
    name: "Earbuds",
    price: 129.99,
    discount: {
      type: "3for2",
    },
  },
  {
    sku: "wtch",
    name: "Smart Watch",
    price: 229.99,
  },
];

const co = new Checkout(pricingRules);
co.scan("wtch");
co.scan("op11");
co.scan("op11");
co.scan("op11");
co.scan("buds");
co.scan("buds");
co.scan("op11");
co.scan("op11");

const total = co.total(); // Solution 1
const total1 = co.total1(); // Solution 2

console.log("Total:", total);
console.log("Total 1:", total1);
