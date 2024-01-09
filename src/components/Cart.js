import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import { useParams, useLocation } from 'react-router-dom';

const Cart = ({  }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const qty = searchParams.get('qty'); 
  const id = useParams()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
    
  // useEffect(() => {
  //   console.log(id.id)
  //   if (id) {
  //     dispatch(addToCart(id.id, qty))
  //   }
  // }, [dispatch, id, qty])

  return (
    <div>
        {console.log(cartItems)}
      <h2>Cart</h2>
    </div>
  );
};

export default Cart;