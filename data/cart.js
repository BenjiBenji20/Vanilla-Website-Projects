export const cart = [];

export function productQuantity(productID, productName) {
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
}

export function cartMessage(productID) {
  // make the added to cart message visible
  const addToCartMessage = document.querySelector(`.js-added-to-cart-message-${productID}`);
  addToCartMessage.style.visibility = 'visible';

  // set time out to hide the message
  setTimeout(() =>{
    addToCartMessage.style.visibility = 'hidden';
  }, 1000);
}
