"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderTotal = orderTotal;
exports.isInStock = isInStock;
exports.formatOrder = formatOrder;
function orderTotal(order) {
    let orderTotal = 0;
    order.lineItems.forEach((lineItem) => {
        const price = lineItem.product.priceInEuros;
        const quantity = lineItem.quantity;
        orderTotal += price * quantity;
    });
    return orderTotal;
}
function isInStock(product) {
    return product.stockCount > 0;
}
function formatOrder(order) {
    return `Customer ${order.customer.name} has ordered ${formatOrderItems(order)} for a total of ${orderTotal(order)}€. The update of order status ${order.status} has been sent to ${order.customer.email}.`;
}
function formatOrderItems(order) {
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
//# sourceMappingURL=types.js.map