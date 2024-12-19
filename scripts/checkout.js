import { renderOrderSummary } from "./checkout/order-summary.js";
import { renderPaymentSummary } from "./checkout/payment-summary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';

// pass the two functions to render
loadProducts(() => {
// render the checkout summary
renderOrderSummary();

// render the payment summary
renderPaymentSummary();
});