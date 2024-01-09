import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom'
import MenuCard from './menuCard';
import { Button } from '@nextui-org/react';

const Dish = ({dish}) => {

  const navigate = useNavigate();  
  const dispatch = useDispatch()

  const [quantity, setQuantity] = React.useState(0);
  
  const increaseQuantity = (id) => {
    if(id) {
      setQuantity(quantity + 1);
    }
    dispatch(addToCart(id, quantity + 1))
  }; 

  const decreaseQuantity = (id) => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
    dispatch(addToCart(id, quantity + 1))
  };

  const handleAddToCart = (id, qty) => {
    console.log(id)
    console.log(qty)
    dispatch(addToCart(id, qty))
    // navigate(`/cart/${id}?qty=${qty}`)
  };




  return (
    // <Grid.Container gap={2} justify="center">
    //     <Grid xs={12} sm={3}>
    //         <div className='pointer-class' onClick={() => console.log("Vegetarian")}>
    //             <CuisineCard image={'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg'} text1={'Vegetarian'} text2={'10+ verieties'}/>
    //         </div>
    //     </Grid>
    // </Grid.Container>
    // <Card style={{ width: '18rem' }}>
    //   <Card.Img variant="top" src={dish.item_image} />
    //   <Card.Body>
    //     <Card.Title>{dish.item_name}</Card.Title>
    //     <button onClick={decreaseQuantity}>-</button>
    //       <span>{quantity}</span>
    //     <button onClick={increaseQuantity}>+</button>
    //     <button onClick={() => handleAddToCart(dish._id, quantity)}>Add to Cart</button>
    //   </Card.Body>
    // </Card>
    <div>
        <MenuCard image={dish.item_image} />
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>{dish.item_name}</p>
            <p style={{marginTop: "-8px", fontWeight: "bold"}}>{dish.item_price} /-</p>
            {/* <div style={{display: "flex", justifyContent: "center"}}>
              <Button>-</Button>
              <span>{quantity}</span>
              <Button>+</Button>
            </div> */}
             <div style={{display: "flex", justifyContent: "center"}}>
                <button onClick={() => decreaseQuantity(dish._id)} style={{width: "40px", marginRight: "8px"}}>-</button>
                <span> {quantity} </span>
                <button onClick={() => increaseQuantity(dish._id)} style={{width: "40px", marginLeft: "8px"}}>+</button>
             </div>
        </div>
    </div>
  );
}

export default Dish;