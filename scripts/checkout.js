import { cart, removeCartItem, calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';

var now = Date.now();

const deliveryDate = dayjs().add(7, 'days').format('dddd, MMMM DD');

let orderSummary = '';
cart.forEach((cartItems) => {

  // loop to products array to find matching products by id
  let matchingProduct;
  products.forEach((prod) => {  
    if(cartItems.id === prod.id) {
      matchingProduct = prod;
    }
  });

  orderSummary += 
    `
      <div class="cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${deliveryDate}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${(matchingProduct.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label-${matchingProduct.id}"
                  data-product-id="${matchingProduct.id}">${cartItems.quantity}</span>
              </span>
              <span class="js-update-quantity-link-${matchingProduct.id} link-primary update-button"
                data-product-id="${matchingProduct.id}">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" 
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            <div class="delivery-option">
              <input type="radio" class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" checked class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                  $4.99 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio" class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  Monday, June 13
                </div>
                <div class="delivery-option-price">
                  $9.99 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
}); 

document.querySelector('.order-summary').innerHTML = orderSummary;

// change checkout quantity on header
export function changeCheckoutQuantity() {
  document.querySelector('.js-checkout-quantity').innerHTML = calculateCartQuantity() > 0 ? `${calculateCartQuantity()} items` : '';
}

changeCheckoutQuantity();

// deleting array ellementt
document.querySelectorAll('.js-delete-link')
  .forEach((del) => {
    const productID = del.dataset.productId;

    del.addEventListener('click', () => {
      // remove the item from the cart
      removeCartItem(productID);

      // changing checkout quantity on header
      changeCheckoutQuantity();

      // rempve the element
      document.querySelector(`.js-cart-item-container-${productID}`).remove();
    });
  });



// Listen for clicks on "link-primary" elements to update the product ID
document.querySelectorAll('.link-primary')
  .forEach((cartItem) => {
    const productID = cartItem.dataset.productId;

    cartItem.addEventListener('click', () => {
      updateQuantity(productID);
    });
});

