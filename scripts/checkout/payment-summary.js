import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrders } from "../../data/orders.js";

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

      <button class="place-order-button button-primary
        js-place-order-button">
        Place your order
      </button>
    `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order-button')
      .addEventListener('click', async () => {
        try {
          // Transform the cart to use 'productId' instead of 'id'
          const transformedCart = cart.map(item => ({
            productId: item.id, // Rename 'id' to 'productId'
            quantity: item.quantity,
            deliveryOptionID: item.deliveryOptionID
          }));

          const response = await fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type' : 'application/json'
              },
              body: JSON.stringify({
                cart: transformedCart
              }) 
            });
          
          const order = await response.json();

          // add order to the array
          addOrders(order);
        } catch (error) {
          console.error('Error fetching products', error);
        }

        // redirect the user
         window.location.href = 'orders.html';
      });
}