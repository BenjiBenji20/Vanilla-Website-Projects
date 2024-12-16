import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let totalOrderPrice = 0;
  let totalShippingFee = 0;
  let itemsQuantity = 0;

  cart.forEach((cartItems) => {
    // accumulate cart quantity
    itemsQuantity += cartItems.quantity;

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
        <div>Items (${itemsQuantity}):</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalOrderPrice)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalShippingFee)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalBeforeTax)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">
          $${formatCurrency(EstimatedTax)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">
          $${formatCurrency(totalPrice)}
        </div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}