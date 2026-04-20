import type { Product, Category, Customer, Order } from "./modules.js";
import { isInStock, formatOrder } from "./modules.js";

const customers: Customer[] = [
  {
    id: 1,
    name: "Hermann Müller",
    email: "hermann.mueller@email.com",
  },
];

const categories: {
  [index: string]: Category;
} = {
  clothing: {
    name: "Clothing",
  },
  food: {
    name: "Food",
  },
  clearance: {
    name: "Clearance",
    description: "Special offer! Must go!",
  },
};

/**
******************************************
const products: {
  [index: string]: Product;
} = {
  socks: {
    id: 1,
    name: "socks",
    priceInEuros: 3,
    stockCount: 50,
    category: categories.clothing,
  },
  apple: {
    id: 2,
    name: "apple",
    priceInEuros: 0.5,
    stockCount: 0,
    category: categories.food,
  },
  chocolateBunny: {
    id: 3,
    name: "chocolate easter bunny",
    priceInEuros: 1.29,
    stockCount: 20,
    category: categories.clearance,
  },
};

******************************************

Can't use this structure?

for (const key in products) {
  const product = products.key;
} ---> product undefined

products.entries.forEach ---> single entries undefined // entry can be 'any' type
 */

const products: Product[] = [
  {
    id: 1,
    name: "socks",
    priceInEuros: 3,
    stockCount: 50,
    category: categories.clothing,
  },
  {
    id: 2,
    name: "apple",
    priceInEuros: 0.5,
    stockCount: -2,
    category: categories.food,
  },
  {
    id: 3,
    name: "chocolate easter bunny",
    priceInEuros: 1.29,
    stockCount: 20,
    category: categories.clearance,
  },
];

const orders: Order[] = [
  {
    customer: customers[0],
    lineItems: [
      {
        product: products[0],
        quantity: 2,
      },
      {
        product: products[2],
        quantity: 5,
      },
    ],
    status: "pending",
  },
];

products.forEach((product) => {
  console.log(
    `Product ${product.name} is ${!isInStock(product) ? "not " : ""}in stock.`,
  );
});

console.log(formatOrder(orders[0]));
