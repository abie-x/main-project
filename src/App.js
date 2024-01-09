import React from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react';
import SigupScreen from "./screens/SigupScreen";
import SigninScreen from "./screens/SigninScreen";
import HomeScreen from "./screens/HomeScreen";
import CandidateListScreen from "./screens/CandidateListScreen";
import VotingScreen from "./screens/VotingScreen";
import VotingSuccessScreen from "./screens/VotingSuccessScreen";
import ResultsScreen from "./screens/ResultsScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import LandingScreen from "./screens/LandingScreen";
import Cart from "./components/Cart";
import CartScreen from './screens/CartScreen'
import OrderViewScreen from "./screens/orderViewScreen";
import SuccessScreen from "./screens/SuccessScreen";
import CancelScreen from "./screens/CancelScreen";

const App = () => {

  const [cartItems, setCartItems] = React.useState([]);

  const addToCart = (item) => {
    console.log(item.item_name)
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      const updatedItems = cartItems.map((cartItem) =>
        cartItem._id === item._id ? item : cartItem
      );
      setCartItems(updatedItems);
      console.log(cartItems)
    } else {
      setCartItems([...cartItems, item]);
      console.log(cartItems)
    }
  };

  return(
    <NextUIProvider>
        <Router>
          <Routes>
          <Route path='/signup' element={<SigupScreen />} />
            <Route path='/login' element={<SigninScreen />} /> 
            <Route path='/home' element={<HomeScreen />} />
            <Route path='/restaurents/:id' element={<CandidateListScreen addToCart={addToCart}/>} />
            <Route path='/elections/vote/:name' element={<VotingScreen />} />
            <Route path='/success/:name' element={<VotingSuccessScreen />} />
            <Route path='/results/:name' element={<ResultsScreen />} />
            <Route path='/verify' element={<EmailVerificationScreen />} />
            <Route path='/cart/:id?' element={<CartScreen  />} />
            <Route path='/view/orders' element={<OrderViewScreen  />} />
            <Route path='/success' element={<SuccessScreen />} />
            <Route path='/cancel' element={<CancelScreen />} />
            <Route path='/' element={<LandingScreen />} exact />
          </Routes>
        </Router>
    </NextUIProvider>
  )
}

export default App