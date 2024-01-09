import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {Grid} from "@nextui-org/react";
import { RestaurentMenuData } from '../actions/restaurentActions' 
import { GiKnifeFork } from "react-icons/gi";
import { BiSolidHot } from "react-icons/bi";
import {Link, useParams} from 'react-router-dom' 
import { FaSearch } from "react-icons/fa";
import Dish from '../components/Dish';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CandidateListScreen = ({addToCart, location}) => {

  const navigate = useNavigate()

  const {id} = useParams()


  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = React.useState(0);

    const dispatch = useDispatch()

    const RestaurentMenuList = useSelector((state) => state.RestaurentMenuList)
    const {loading, restaurentMenu, errror, startersArray, mainCourseArray, chefSpecialsArray} = RestaurentMenuList

    const handleChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const increaseQuantity = () => {
      setQuantity(quantity + 1);
    };

    const decreaseQuantity = () => {
      if (quantity > 0) {
        setQuantity(quantity - 1);
      }
    };
 
    const handleAddToCart = (dish, quantity) => {
      
      console.log(dish)
      console.log(quantity)
    };

    const submitHandler = () => {
      navigate(`/cart/${id}`)
    }

    useEffect(() => {
        dispatch(RestaurentMenuData(id))
    }, [id])


  return (
      <div className='hero-section-menu'>
        <div className='nav-component'>
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
                    <div className='remaining-nav'>
                      <button className="cta-button home-cta" style={{marginRight: "16px", fontWeight: "bold"}} onClick={submitHandler}>
                          <div style={{width: "100%", display: "flex", justifyContent: "space-around"}}>
                          <GiKnifeFork style={{marginTop: "3px", marginLeft: "-4px"}}/>
                          <span style={{marginRight: "-3px"}}>Dine</span>
                          </div>
                      </button>
                    </div>
        </div>
        <div className='test-class-menu'>
          <h4>Hey, what's in your mind?</h4>
        </div>
        <Grid.Container gap={4} justify="center" style={{width: "100%"}}>
        {restaurentMenu && restaurentMenu.map((dish) => (
              <Grid xs={12} sm={2.4}>
                <Dish dish={dish} />
              </Grid>
          ))}
        </Grid.Container>
      </div>
  )
}

export default CandidateListScreen