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
        <select class="js-quantity-selector" data-testid="quantity-selector">
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

      <div class="js-added-to-cart-message added-to-cart-message" data-testid="added-to-cart-message">
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

document.querySelectorAll('.js-add-to-cart-button')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productID = button.dataset.productId; // html data attribute id
      const productName = button.dataset.productName; // html data attribute name

      // push the product obj to the cart array
      // cart array was loaded from other js file data/cart.js
      let itemIsMatch;
      cart.forEach((item) => { 
        // checks if the item already exist in the cart
        if(item.id === productID) { 
          itemIsMatch = item
        }
      });

      // if the item already exist in the cart, then increment the quantity by 1
      if(itemIsMatch) {
        itemIsMatch.quantity += 1;
      }
      else {
        cart.push(
          {
            productName,
            id: productID,
            quantity: 1
          }
        );
      }

      // change the value of cart quantity icon to the total value of cart quantity
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      console.log(cart);
    });
  });