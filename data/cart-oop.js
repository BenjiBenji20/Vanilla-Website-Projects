// this file is an oop version of cart.js
// creates a function that returns the cart object. 
// this will make easy to use cart object again with different use cases
function Cart(localStorageKey) {
  const cart = {
    cartItems: JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    ],
  
  
    // saving every cart updates to the local storage
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },
  
  
    // add items to the cart
    addToCart(productID) {
      const selector = document.querySelector(`.js-quantity-selector-${productID}`); 
      const selectedQuantity = Number(selector.value);
  
      // Check if the product is already in the cart
      let productInCart = this.cartItems.find((item) => item.id === productID);
  
      // push the product obj to the cart array
      // cart array was loaded from other js file data/cart.js
      if(productInCart) {
        productInCart.quantity += selectedQuantity;
      } 
      else {
        // Add the new product to the cart
        this.cartItems.push({
          id: productID,
          quantity: selectedQuantity, 
          deliveryOptionID: '1'
        });
      }
  
      this.saveToStorage();
    },
  
  
    // make the added to cart message visible
    cartMessage(productID) {
      const addToCartMessage = document.querySelector(`.js-added-to-cart-message-${productID}`);
      addToCartMessage.style.visibility = 'visible';
  
      // set time out to hide the message
      setTimeout(() =>{
        addToCartMessage.style.visibility = 'hidden';
      }, 1000);
    },
  
  
    // removing element to the array
    removeCartItem(productID) {
      const newCartArr = [];
  
      this.cartItems.forEach((cartItem) => {
        // find item that does not match with the delete product id
        if(cartItem.id !== productID) {
          newCartArr.push(cartItem);
        }
      });
  
      // pass new array elements to the cart array
      this.cartItems = newCartArr;
      this.saveToStorage();
    },
  
  
    // calculates cart quantity
    calculateCartQuantity() {
      let checkoutQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        checkoutQuantity += cartItem.quantity;
      });
  
      return checkoutQuantity;
    },
  
  
    // change checkout quantity on header
    changeCheckoutQuantity() {
      document.querySelector('.js-checkout-quantity').innerHTML = this.calculateCartQuantity() > 0 ? `${this.calculateCartQuantity()} items` : '';
    },
  
  
    // Save new quantity
    saveNewCartQuantity(productID, inputField) {
      const quantityLabel = document.querySelector(`.quantity-label-${productID}`);
      const updateLink = document.querySelector(`.js-update-quantity-link-${productID}`);
  
      const newQuantity = Number(inputField.value);
  
      // Get the new quantity from the input field
      inputField.textContent = newQuantity;
  
      // Revert input field back to a label
      quantityLabel.textContent = newQuantity;
  
      updateLink.textContent = 'Update';
  
      // save updated quantity to the array
      this.cartItems.forEach((cartItem) => {
        if(cartItem.id === productID) {
          cartItem.quantity = newQuantity;
        }
      })
  
      // remove click event listener
      updateLink.replaceWith(updateLink.cloneNode(true));
  
      // Save the updated cart to localStorage
      this.saveToStorage();
  
      // update quantity on header
      document.querySelector('.js-checkout-quantity').innerHTML = this.calculateCartQuantity() > 0 ? `${this.calculateCartQuantity()} items` : '';
    },
  
  
    // Update quantity of an item
    updateQuantity(productID) {
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
      updateLink.addEventListener('click', () => this.saveNewCartQuantity(productID, inputField));
    },
  
  
    // updating delivery option id
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.id) {
          matchingItem = cartItem;
        }
      });
  
      matchingItem.deliveryOptionID = deliveryOptionId;
  
      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const cartBusiness = Cart('cart-business');

console.log(cart);
console.log(cartBusiness);