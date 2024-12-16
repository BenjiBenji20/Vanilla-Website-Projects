import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let totalOrderPrice = 0;
  let totalShippingFee = 0;

  cart.forEach((cartItems) => {
    // loop to get product
    const productId = cartItems.id;
    
    const product = getProduct(productId);

    // accumulate total product price in cents and save to a variable
    totalOrderPrice += product.priceCents * cartItems.quantity;

    // loop to get delivery option
    const deliveryOptionID = cartItems.deliveryOptionID;

    const deliveryOption = getDeliveryOption(deliveryOptionID);

    // accumulate total shipping Fee by cart
    totalShippingFee += deliveryOption.shippingFee;
  });

  const totalBeforeTax = totalOrderPrice + totalShippingFee;
  const EstimatedTax = totalBeforeTax * 0.1;
  const totalPrice = totalBeforeTax + EstimatedTax;

  const paymentSummaryHTML =
    `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">
          $${(Math.round(totalOrderPrice) / 100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
          $${(Math.round(totalShippingFee) / 100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
          $${(Math.round(totalBeforeTax) / 100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${(Math.round(EstimatedTax) / 100).toFixed(2)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          $${(Math.round(totalPrice) / 100).toFixed(2)}
        </div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}