import { addToCart, cart } from "../../data/cart.js";

describe('add to cart suite: addToCart function', () => {
  it('adds a new item to the cart', () => {
    // creating a fake local storage inside block
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
  });
});