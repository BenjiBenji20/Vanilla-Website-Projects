// import variables by modules
import { cart, addToCart, cartMessage, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";


let productsHTML = '';
// Loop through the array to render elements
products.forEach((product) => {
  // accumalte 
  productsHTML += `
    <div class="js-product-container product-container" data-product-id="${product.id}" data-testid="product-container-${product.id}">
      <div class="product-image-container">
        <img class="js-product-image product-image" src="${product.image}">
      </div>

      <div class="product-name limit-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="${product.getRating()}">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}" data-testid="quantity-selector">
          <option selected="" value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${product.getChartImageHTML()}      

      <div class="product-spacer"></div>

      <div class="js-added-to-cart-message-${product.id} added-to-cart-message" data-testid="added-to-cart-message">
        <img src="images/icons/checkmark.png">
         Added
      </div>

      <button class="js-add-to-cart-button
        add-to-cart-button button-primary" 
        data-product-name="${product.name}"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// pass html elements to the html to render
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
      addToCart(productID);
  
      // Calculate total cart quantity
      changeCartQuantity();

      // display cart message
      cartMessage(productID);
    });
  });