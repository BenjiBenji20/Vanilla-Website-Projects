export let cart = JSON.parse(localStorage.getItem('cart')) || [
  {
    id: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    id: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

// saving every cart updates to the local storage
export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function productQuantity(productID) {
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