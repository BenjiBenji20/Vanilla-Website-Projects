// import variables by modules
import { cart, productQuantity, cartMessage, calculateCartQuantity } from "../data/cart.js";
import { products, productsHTML } from "../data/products.js";


// pass html elements to the html
document.querySelector('.js-products-grid').innerHTML = productsHTML;


// catch selector element using its id
products.forEach((product) => {
  const selector = document.querySelector(`.js-quantity-selector-${product.id}`);
  
  selector.addEventListener('change', () => { 
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      // Update the quantity for the product in the cart
      productInCart.quantity = Number(selector.value);
    }
  });
});

// Calculate total cart quantity
function changeCartQuantity() {

  document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity() > 0 ? calculateCartQuantity() : '';
}

changeCartQuantity(); // function call to change initially the cart quantity

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productID = button.dataset.productId; // html data attribute id
      
      // store quantity to the cart array
      productQuantity(productID);
  
      // Calculate total cart quantity
      changeCartQuantity();

      // display cart message
      cartMessage(productID);
    });
  });