import { renderOrderSummary } from "../../scripts/checkout/order-summary.js";

describe('test suite: renderOrderSummary function', () => {
  it('displays the cart', () => {
    document.querySelector('.order-summary').innerHTML = 
    `
      <div class="order-summary"></div>
    `;
  });
});