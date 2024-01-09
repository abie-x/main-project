import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {addToCart, removeFromCart} from '../actions/cartActions'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import {Container, Grid, useTheme, Input, Button, Textarea, Loading} from "@nextui-org/react";
import OtpInput from 'react-otp-input';
import {createOrder} from '../../src/actions/orderActions'
import {setTableNumber} from '../../src/actions/cartActions'
import Alert from 'react-bootstrap/Alert';
import axios from 'axios'


const CartScreen = ({  }) => {
  const location = useLocation();
  const navigate = useNavigate()
  const searchParams = new URLSearchParams(location.search);
  const qty = searchParams.get('qty'); 
  const id = useParams()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const orderCreate = useSelector((state) => state.orderCreate)
  const {success, order} = orderCreate

  useEffect(() => {
    console.log('iam printing the cart items')
    console.log(cartItems)
  }, [])
    
  // useEffect(() => {
  //   console.log(id.id)
  //   if (id) {
  //     dispatch(addToCart(id.id, qty))
  //   }
  // }, [dispatch, id, qty])
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState('')
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('')

  const userInfoString = localStorage.getItem('userInfo');
  const userInfo = JSON.parse(userInfoString);
  const username = userInfo.username;

  const handleChange = () => {
    console.log(searchTerm)
  }

  const removeFromCartHandler = (identifier) => {
    dispatch(removeFromCart(identifier))
  }

  const tableNumber = useSelector((state) => state.tableNumber)
  const { tableNumberChange } = tableNumber

  console.log(tableNumberChange)    

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  let govtTax = cartItems.length > 0 ? 20.25 : 0

  let finalPayable = totalPrice + govtTax
  finalPayable = finalPayable.toFixed(2)

  const placeOrderHandler = () => {
    
    const formattedMenuItems = [];


    cartItems.forEach(item => {
      console.log(item)
      const formattedItem = {
        item_id: item.id,
        quantity: item.qty,
        item_name: item.name,
        item_price: item.price,
        price: item.item_stripe_price
      };
      
      formattedMenuItems.push(formattedItem);
  });
    
    dispatch(
      createOrder({
        customer_name: username,
        menu_items: formattedMenuItems,
        restaurant_id: id.id,
        total_price: finalPayable,
        table_number: otp
      })
    )

    dispatch(setTableNumber(otp))

    navigate(`/restaurents/${id.id}`)
    // navigate('/view/orders')
      
  }

  const checkout = async () => { 
    await fetch(`http://localhost:3001/api/payment?restaurantId=${id.id}&tableNumber=${tableNumberChange}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => {
        return response.json();
    }).then((response) => {
        if(response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
        }
    });
}

// const checkout = async () => {
//   try {
//     const response = await axios.get('http://localhost:3001/api/payment?restaurantId=645b94b0c79b455543c41b52&tableNumber=8', {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       data: { items: cart.items }
//     });

//     const responseData = response.data;

//     if (responseData.url) {
//       window.location.assign(responseData.url); // Forwarding user to Stripe
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };


  return (
    <div className='hero-section-cart'>
      <div className='nav-component' style={{}}>
          <div className="logo">Le-Resto</div>
          <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for a dish..."
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button type="submit" onClick={() => console.log('iam searching!')}>
                            <FaSearch />
                        </button>
                    </div>
                    {/* <div className='remaining-nav'>
                      <button className="cta-button home-cta" style={{marginRight: "16px", fontWeight: "bold"}} onClick={submitHandler}>
                          <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                          <GiKnifeFork style={{marginTop: "3px", marginLeft: "-4px"}}/>
                          <span style={{marginRight: "-3px"}}>Dine</span>
                          </div>
                      </button>
                    </div> */}
                    <ul className="nav-links" style={{ position: "absolute", top: 40, right: 40}}>
                <li 
                    className={active === "home" ? "active" : ""}
                    onClick={() => console.log("home")}>
                        
                    <a href="#">Home</a>
                </li>
                <li
                    className={active === "about" ? "active" : ""}
                    onClick={() => console.log("about")}>
                    <a href="#">About</a>
                </li>
                </ul>
        </div>
        <div className='signup-parent' style={{ marginTop: "-80px", backgroundColor: "#FFFFCC"}}>
          <div className='signup-form' style={{backgroundColor: "#FFFFCC", display: "flex"}}>
            {/* <img src='/images/bg-2.png' className='signin-brand-image-1'/> */}
            <img src='/images/bg-1.png' className='cart-brand-image'/>
          </div>
          <div className='signup-brand' style={{backgroundColor: "#fff"}}>
          <h3 style={{marginLeft: "12px"}}>Dine</h3>
            {cartItems.map((x, idx) => (
              <div style={{width: "100%", display: "flex", justifyContent: "flex-start", marginBottom: "8px", paddingRight: "12px"}}>
                <div style={{width: "25%", display:"flex", justifyContent:"center"}}>
                  <img src={x.image} style={{width:  "50px", height: "50px", borderRadius: "50%"}}/>
                </div>
                <div style={{width: "25%", display:"flex", justifyContent:"center"}}>
                  <p>{x.name}</p>
                </div>
                <div style={{width: "20%", display: "flex", justifyContent: "center"}}>
                  <button style={{width: "40px", height: "30px", marginRight: "8px"}}>{x.qty}</button>
                </div>
                <div style={{width: "20%", display: "flex", justifyContent: "center"}}>
                  <p>${x.qty * x.price }</p>
                </div>
                <div style={{width: "10%", display: "flex", justifyContent: "center"}}>
                  <p style={{cursor: "pointer"}} onClick={() => removeFromCartHandler(x.id)}>X</p>
                </div>
                {console.log(x.id)}
              </div>
            ))}
            <hr />
            <div style={{width: "100%", marginTop: "12px", display: "flex"}}>
              <div style={{width: "80%", display: "flex", justifyContent: "flex-end"}}>
                  <h5>Item Total</h5>
              </div>
              <div style={{width: "20%", display: "flex", justifyContent: "center"}}>
                  <h5>{totalPrice}</h5>
              </div>
            </div>
            <div style={{width: "100%", display: "flex"}}>
              <div style={{width: "80%", display: "flex", justifyContent: "flex-end"}}>
                  <h5>Govt Tax & others</h5>
              </div>
              <div style={{width: "20%", display: "flex", justifyContent: "center"}}>
                  <h5>{govtTax}</h5>
              </div>
            </div>
            <div style={{width: "100%", display: "flex"}}>
              <div style={{width: "80%", display: "flex", justifyContent: "flex-end"}}>
                  <h5>To Pay</h5>
              </div>
              <div style={{width: "20%", display: "flex", justifyContent: "center"}}>
                  <h5>{finalPayable}</h5>
              </div>
            </div>
            <div style={{width: "100%", display: "flex"}}>
              <div style={{width: "50%", display: "flex", justifyContent: "flex-end", marginTop: "14px"}}>
                  <h5>Enter your table no</h5>
              </div>
              <div style={{width: "50%", display: "flex", justifyContent: "flex-start"}}>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={1}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{width: "100px", marginTop: "12px", paddingLeft: "18px"}}
                  inputStyle={{width: "40%"}}
                />
              </div>
            </div>
            <div style={{width: "100%", display: "flex"}}>
              <div style={{width: "50%", display: "flex", justifyContent: "flex-end", marginTop: "14px"}}>
                  <h5>Enter the table pin</h5>
              </div>
              <div style={{width: "50%", display: "flex", justifyContent: "center"}}>
                <OtpInput
                  value={pin}
                  onChange={setPin}
                  numInputs={4}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{width: "400px", marginTop: "12px", paddingLeft: "18px"}}
                  inputStyle={{width: "50%"}}
                />
              </div>
            </div>
              <div style={{width: "100%",  display: "flex", justifyContent: "flex-end"}}>
                <button className="cta-button home-cta" style={{marginRight: "16px", fontWeight: "bold", marginTop: "12px", width: "140px"}} onClick={placeOrderHandler}>
                  Place Order
                </button>
                <button className="cta-button home-cta" style={{marginRight: "16px", fontWeight: "bold", marginTop: "12px", width: "140px"}} onClick={checkout}>
                  checkout
                </button>
              </div>
            {console.log(pin)}
            {console.log(username)}
          </div>
          
        </div>
        {console.log('iam i the cart screen')}  
        {console.log(order)}
        {console.log(id.id)}
    </div>
  );
};

export default CartScreen;