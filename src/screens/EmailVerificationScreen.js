import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import {Container, Grid, useTheme, Input, Button, Textarea} from "@nextui-org/react";
import { useNavigate, useLocation } from 'react-router-dom'
import { RestaurentSearchData, RestaurentAmbienceData, RestaurentCuisineData} from '../actions/restaurentActions';
import CuisineCard from '../components/CuisineCard';
import RestaurentCard from '../components/RestaurentCard';

const EmailVerificationScreen = () => {

    const { search } = useLocation();
    const city = new URLSearchParams(search).get("city");
    const query = new URLSearchParams(search).get("query");
    const ambience = new URLSearchParams(search).get("ambience");
    const cuisine = new URLSearchParams(search).get("cuisine");

    const [active, setActive] = useState("home")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const RestaurentSearchList = useSelector((state) => state.RestaurentSearchList)
    const {loading, restaurents, error} = RestaurentSearchList

    const RestaurentAmbienceList = useSelector((state) => state.RestaurentAmbienceList)
    const {ambience_loading, ambience_restaurents, ambience_error} = RestaurentAmbienceList

    const RestaurentCuisineList = useSelector((state) => state.RestaurentCuisineList)
    const {cuisine_loading, cuisine_restaurents, cuisine_error} = RestaurentCuisineList

    useEffect(() => {
      if(city && query) {
        console.log(restaurents)
        dispatch(RestaurentSearchData(city, query))
      } else if(city && ambience) {
        console.log(ambience_restaurents)
        dispatch(RestaurentAmbienceData(city, ambience))
      } else if(city && cuisine) {
        console.log(cuisine)
        dispatch(RestaurentCuisineData(city, cuisine))
      }
    }, [city, query, ambience, cuisine])

    const cuisineHandler = (text) => {
      navigate(`/restaurents/${text}`)
    }

  return (
    <div className='hero-section-list'> 
      <nav className="navigation-bar-list">
        {console.log(restaurents)}
                <div className="logo">Le-Resto</div>
                <ul className="nav-links">
                <li 
                    className={active === "home" ? "active" : ""}
                    onClick={() => console.log("home")}>
                         
                    <a href="#">Restaurents</a>
                </li>
                <li
                    className={active === "about" ? "active" : ""}
                    onClick={() => console.log("about")}>
                    <a href="#">About</a>
                </li>
                <li
                    className={active === "contact" ? "active" : ""}
                    onClick={() => console.log("contact")}>
                    <a href="#">Contact</a>
                </li>
                </ul>
            </nav>
      <div className='list-head'>
        <h5>{query ? `Here's the best restaurents in ${city} that serves ${query}` : ambience ? `Here's the best restaurents in ${city} that are ${ambience}` : cuisine ?  `Here's the best restaurents in ${city} that serves ${cuisine}` : "somethig went wrong.."}</h5>
      </div>
      <div>
        <Grid.Container gap={2} justify="center" style={{display: "flex", justifyContent: "flex-start"}}>
            {restaurents.map((x, idx) => {
              return (
                <Grid xs={12} sm={3}>
                  <div className='pointer-class' onClick={() => cuisineHandler(x._id)}>
                      <RestaurentCard image={x.image} name={x.restaurant_name} address={x.address}/>
                  </div>
                </Grid>
              )
            })}
            { ambience_restaurents.map((x, idx) => {
              return (
                <Grid xs={12} sm={3}>
                  <div className='pointer-class' onClick={() => cuisineHandler(x._id)}>
                      <RestaurentCard image={x.image} name={x.restaurant_name} address={x.address}/>
                  </div>
                </Grid>
              ) 
            })}
            {cuisine_restaurents.map((x, idx) => {
              return (
                <Grid xs={12} sm={3}>
                  <div className='pointer-class' onClick={() => cuisineHandler(x._id)}>
                      <RestaurentCard image={x.image} name={x.restaurant_name} address={x.address}/>
                  </div>
                </Grid>
              ) 
            })}

                  {/* <Grid xs={12} sm={3}>
                          <div className='pointer-class' onClick={() => cuisineHandler("Vegetarian")}>
                              <CuisineCard image={'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg'} text1={'Vegetarian'} text2={'10+ verieties'}/>
                          </div>
                      </Grid>
                  <Grid xs={12} sm={3}>
                      <div className='pointer-class' onClick={() => cuisineHandler("Rice dishes")}>
                          <CuisineCard image={'https://insanelygoodrecipes.com/wp-content/uploads/2022/06/Delicious-Homemade-Indian-Lamb-Rice-Pilaf.jpg'} text1={'Rice dishes'} text2={'19+ verieties'}/>
                      </div>
                  </Grid>
                  <Grid xs={12} sm={3}>
                      <div className='pointer-class' onClick={() => cuisineHandler("BBQ")}>
                          <CuisineCard image={'https://imageio.forbes.com/specials-images/imageserve/1177886278/x.jpg?format=jpg&width=960'} text1={'BBQ/Grills'} text2={'5+ verieties'}/>
                      </div>
                  </Grid>
                  <Grid xs={12} sm={3}>
                      <div className='pointer-class' onClick={() => cuisineHandler("BBQ")}>
                          <CuisineCard image={'https://imageio.forbes.com/specials-images/imageserve/1177886278/x.jpg?format=jpg&width=960'} text1={'BBQ/Grills'} text2={'5+ verieties'}/>
                      </div>
                  </Grid> */}
        </Grid.Container>
      </div>
    </div>
  )
}

export default EmailVerificationScreen