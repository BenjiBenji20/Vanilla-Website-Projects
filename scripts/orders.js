import { cart, calculateCartQuantity } from '../data/cart.js';
import { getProduct, fetchProducts } from '../data/products.js';
import { getDeliveryOption } from '../data/deliveryOptions.js';

// library to set delivery schedule on current date
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 

async function renderOrdersGrid() {
  try {
    await fetchProducts();

    let ordersGridHTML = '';

    cart.forEach((cartItems) => {
      // get product id
      const productId = cartItems.productId;
      const matchingProduct = getProduct(productId);

      // extracting delivery date that matched to the selected delivery option
      const deliveryOptionID = cartItems.deliveryOptionID;
  
      const deliveryOption = getDeliveryOption(deliveryOptionID);
  
      // date when the order was placed
      const orderDatePlaced = dayjs()
          .add(deliveryOption.deliveryDays - deliveryOption.deliveryDays,'days')
          .format('dddd, MMMM DD');

      // delivery date
      const deliveryDate = dayjs()
        .add(deliveryOption.deliveryDays, 'days')
        .format('dddd, MMMM DD');
  
      ordersGridHTML += `
        <div class="order-container js-order-container" data-product-id="${matchingProduct.id}">
            
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${orderDatePlaced}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>${matchingProduct.getPrice()}</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${matchingProduct.id}</div>
              </div>
            </div>
  
            <div class="order-details-grid">
              <div class="product-image-container">
                <img src="${matchingProduct.image}">
              </div>
  
              <div class="product-details">
                <div class="product-name">
                  Black and Gray Athletic Cotton Socks - 6 Pairs
                </div>
                <div class="product-delivery-date">
                  Arriving on: ${deliveryDate}
                </div>
                <div class="product-quantity">
                  Quantity: ${cartItems.quantity}
                </div>
                <a href="amazon.html" style="text-decoration: none;">
                  <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="${matchingProduct.image}">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </a>
              </div>
  
              <div class="product-actions">
                <a href="tracking.html">
                  <button class="track-package-button button-secondary">
                    Track package
                  </button>
                </a>
              </div>
              
          </div>
      `;
    })
  
    document.querySelector('.orders-grid').innerHTML = ordersGridHTML;
  } catch (error) {
    console.error('Error rendering orders page', error);
  }
}

// Calculate total cart quantity
function changeCartQuantity() {

  document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity() > 0 ? calculateCartQuantity() : '';
}

changeCartQuantity(); // function call to change initially the cart quantity

renderOrdersGrid();