// Save the data
// cosnst products = []; products variable was loaded or passed from another js file from data/products.js 

let productsHTML = '';
// Loop through the array
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
        <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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

// pass html elements to the html
const productsContainer = document.querySelector('.js-products-grid');

productsContainer.innerHTML = productsHTML;

let quantity = 0;

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
      const selector = document.querySelector(`.js-quantity-selector-${productID}`); 
      const selectedQuantity = Number(selector.value);

      // Check if the product is already in the cart
      let productInCart = cart.find((item) => item.id === productID);

      // push the product obj to the cart array
      // cart array was loaded from other js file data/cart.js
      if(productInCart) {
        productInCart.quantity += selectedQuantity;
      } 
      else {
        // Add the new product to the cart
        cart.push({
          productName,
          id: productID,
          quantity: selectedQuantity, 
        });
      }
  
      // Calculate total cart quantity
      let cartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      console.log(cart);

      // make the added to cart message visible
      const addToCartMessage = document.querySelector(`.js-added-to-cart-message-${productID}`);
      addToCartMessage.style.visibility = 'visible';

      // set time out to hide the message
      setTimeout(() =>{
        addToCartMessage.style.visibility = 'hidden';
      }, 1000);
    });
  });