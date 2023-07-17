# Checkout system for an electronics store.

This repository contains a Node.js application that implements a checkout system for an electronics store. The application allows scanning items and calculating the total price based on specific pricing rules.

## Features

- Scanning items: The `scan(item)` method allows you to add items to the checkout system.
- Calculating total price: The `total()` method calculates the total price of all scanned items, considering the specified pricing rules.
- Pricing rules: The pricing rules define the SKU, name, price, and any applicable discounts for each product.

## Getting Started

Follow the instructions below to set up and run the application:

1. Clone the repository:

   ```bash
   git clone https://github.com/nextyfine-dev/electronics-store.git
   ```

2. Install dependencies:\*\*

   ```bash
   yarn install
   ```

3. Set up pricing rules:

   Modify the `app.ts` file to define the pricing rules for your products. Each pricing rule should include the SKU, name, price, and any applicable discounts.

4. Run the application:

```bash
yarn start
```

```bash
yarn run build
```

```bash
yarn run dev
```

## Code Structure

- `Checkout.ts`: Contains the implementation of the `Checkout` class, which handles the scanning of items and calculating the total price.
- `app.ts`: Entry point of the application where you can define the pricing rules and test the checkout system.
- `interfaces.ts`: Defines the `PricingRule` interface used to specify the pricing rules for the products.

## Usage

To use the checkout system, follow these steps:

1. Create an instance of the `Checkout` class by providing the pricing rules.
2. Use the `scan(item)` method to add items to the checkout system.
3. Call the `total()` method to calculate the total price of all scanned items.

```typescript
import Checkout from "./Checkout.js";
import { PricingRule } from "./interfaces";

const pricingRules: PricingRule[] = [
  // Define pricing rules for your products
];

const co = new Checkout(pricingRules);
co.scan("item1");
co.scan("item2");
const total = co.total();
console.log("Total:", total);
```
