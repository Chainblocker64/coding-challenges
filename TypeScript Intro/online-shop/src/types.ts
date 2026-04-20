export interface Product {
  readonly id: number;
  name: string;
  priceInEuros: number;
  stockCount: number;
  category: Category;
}

export interface Category {
  name: string;
  description?: string;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface LineItem {
  product: Product;
  quantity: number;
}

export interface Order {
  customer: Customer;
  lineItems: LineItem[];
  status: "pending" | "confirmed" | "shipped";
}

export function orderTotal(order: Order): number {
  let orderTotal = 0;
  order.lineItems.forEach((lineItem) => {
    const price = lineItem.product.priceInEuros;
    const quantity = lineItem.quantity;

    orderTotal += price * quantity;
  });

  return orderTotal;
}

export function isInStock(product: Product): boolean {
  return product.stockCount > 0;
}

export function formatOrder(order: Order): string {
  return `Customer ${order.customer.name} has ordered ${formatOrderItems(order)} for a total of ${orderTotal(order)}€. The update of order status ${order.status} has been sent to ${order.customer.email}.`;
}

function formatOrderItems(order: Order): string {
  let output = "";

  const lineItems = order.lineItems;

  lineItems.forEach((lineItem, index) => {
    const name = lineItem.product.name;

    const isLast = index === lineItems.length - 1;
    const isSecondToLast = index === lineItems.length - 2;

    if (isLast && index > 0) {
      output += " and ";
    }

    output += `${lineItem.quantity}x ${lineItem.product.name}`;

    if (!isLast && !isSecondToLast) {
      output += ", ";
    }
  });

  return output;
}
