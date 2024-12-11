// import variables by modules
import { cart, productQuantity, cartMessage } from "../data/cart.js";
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


document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productID = button.dataset.productId; // html data attribute id
      const productName = button.dataset.productName; // html data attribute name
      
      // store quantity to the cart array
      productQuantity(productID, productName);
  
      // Calculate total cart quantity
      let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      // display cart message
      cartMessage(productID);

      console.log(cart);
    });
  });