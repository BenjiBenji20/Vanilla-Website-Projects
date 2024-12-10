// Save the data
const products = [
  {
    image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
    name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090
  }, 
  {
    image: 'images/products/intermediate-composite-basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095
  },
  {
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    name: 'Adults Plain Cotton T-Shirt - 2 Pack',
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799
  },
  {
    image: 'images/products/black-2-slot-toaster.jpg',
    name: '2 Slot Toaster - Black',
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899
  },
  {
    image: 'images/products/6-piece-white-dinner-plate-set.jpg',
    name: '6 Piece White Dinner Plate Set',
    rating: {
      stars: 4,
      count: 37
    },
    priceCents: 2067
  },
  {
    image: 'images/products/6-piece-non-stick-baking-set.webp',
    name: '6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set',
    rating: {
      stars: 4.5,
      count: 175
    },
    priceCents: 3499
  }
];

let productsHTML = '';
// Loop through the array
products.forEach((product) => {
  // accumalte 
  productsHTML += `
    <div class="js-product-container product-container" data-product-id="e43638ce-6aa0-4b85-b27f-e1d07eb678c6" data-testid="product-container-e43638ce-6aa0-4b85-b27f-e1d07eb678c6">
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
        add-to-cart-button button-primary" data-testid="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  `;
});

// pass html elements to the html
const productsContainer = document.querySelector('.js-products-grid');

productsContainer.innerHTML = productsHTML;