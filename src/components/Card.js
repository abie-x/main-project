import React, { useState } from 'react';

function Cart() {
  // Initialize cart state with an empty array of items
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addItemToCart = (item, quantity) => {
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(cartItem => cartItem.item === item);

    if (existingItem) {
      // If the item already exists in the cart, update its quantity
      existingItem.quantity += quantity;
      setCartItems([...cartItems]);
    } else {
      // If the item does not exist in the cart, add it as a new item
      setCartItems([...cartItems, { item, quantity }]);
    }
  };

  // Function to remove an item from the cart
  const removeItemFromCart = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.item !== item);
    setCartItems(updatedCartItems);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map(cartItem => (
          <li key={cartItem.item.id}>
            {cartItem.item.name} - {cartItem.quantity} - 
            <button onClick={() => removeItemFromCart(cartItem.item)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;