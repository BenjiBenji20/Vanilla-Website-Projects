export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionID: '1'
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionID: '2'
  }
];

// saving every cart updates to the local storage
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


// add items to the cart
export function addToCart(productID) {
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
      id: productID,
      quantity: selectedQuantity, 
      deliveryOptionID: '1'
    });
  }

  saveToStorage();
}

// make the added to cart message visible
export function cartMessage(productID) {
  const addToCartMessage = document.querySelector(`.js-added-to-cart-message-${productID}`);
  addToCartMessage.style.visibility = 'visible';

  // set time out to hide the message
  setTimeout(() =>{
    addToCartMessage.style.visibility = 'hidden';
  }, 1000);
}

// removing element to the array
export function removeCartItem(productID) {
  const newCartArr = [];

  cart.forEach((cartItems) => {
    // find item that does not match with the delete product id
    if(cartItems.id !== productID) {
      newCartArr.push(cartItems);
    }
  });

  // pass new array elements to the cart array
  cart = newCartArr;
  saveToStorage();
}


// calculates cart quantity
export function calculateCartQuantity() {
  let checkoutQuantity = 0;
  cart.forEach((cartItem) => {
    checkoutQuantity += cartItem.quantity;
  });

  return checkoutQuantity;
}


// change checkout quantity on header
export function changeCheckoutQuantity() {
  document.querySelector('.js-checkout-quantity').innerHTML = calculateCartQuantity() > 0 ? `${calculateCartQuantity()} items` : '';
}


// Update quantity of an item
export function updateQuantity(productID) {
  const quantityLabel = document.querySelector(`.quantity-label-${productID}`);
  const updateLink = document.querySelector(`.js-update-quantity-link-${productID}`);

  const currentQuantity = Number(quantityLabel.textContent); // Current quantity
  
  // change into input field
  quantityLabel.innerHTML = 
    `<input type="number" class="input-update-cart-quantity" value="${currentQuantity}">`;
  
  const inputField = document.querySelector(`.input-update-cart-quantity`);
  
  // change the update link label
  updateLink.innerHTML = 'Save';

  // Add an event listener to save the new quantity when "Save" is clicked
  updateLink.addEventListener('click', () => saveNewCartQuantity(productID, inputField));
} 


// Save new quantity
function saveNewCartQuantity(productID, inputField) {
  const quantityLabel = document.querySelector(`.quantity-label-${productID}`);
  const updateLink = document.querySelector(`.js-update-quantity-link-${productID}`);

  const newQuantity = Number(inputField.value);

  // Get the new quantity from the input field
  inputField.textContent = newQuantity;

  // Revert input field back to a label
  quantityLabel.textContent = newQuantity;

  updateLink.textContent = 'Update';

  // save updated quantity to the array
  cart.forEach((cartItem) => {
    if(cartItem.id === productID) {
      cartItem.quantity = newQuantity;
    }
  })

  // remove click event listener
  updateLink.replaceWith(updateLink.cloneNode(true));

  // Save the updated cart to localStorage
  saveToStorage();

  // update quantity on header
  document.querySelector('.js-checkout-quantity').innerHTML = calculateCartQuantity() > 0 ? `${calculateCartQuantity()} items` : '';
}


// updating delivery option id
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItems) => {
    if(productId === cartItems.id) {
      matchingItem = cartItems;
    }
  });

  matchingItem.deliveryOptionID = deliveryOptionId;

  saveToStorage();
}