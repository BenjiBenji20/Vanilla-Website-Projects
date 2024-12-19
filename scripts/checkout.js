import { renderOrderSummary } from "./checkout/order-summary.js";
import { renderPaymentSummary } from "./checkout/payment-summary.js";
import { loadProducts, fetchProducts } from "../data/products.js";
// import '../data/cart-class.js';

// async function
async function loadPage() {
  await fetchProducts();

  await new Promise((resolve) => {
    loadProducts(() => {
      resolve();
    })
  });

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();

/*
// promise class to handle asynchronouse code
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  })
}).then(() => {
    // render the checkout summary
    renderOrderSummary();
      
    // render the payment summary
    renderPaymentSummary();
  });
*/

/*
// callback
loadProducts(() => {
  // render the checkout summary
  renderOrderSummary();
      
  // render the payment summary
  renderPaymentSummary();
});
*/