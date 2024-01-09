import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ImLocation} from 'react-icons/im'
import { FaSearch } from "react-icons/fa";
import { Dropdown, Input, Avatar, Grid } from "@nextui-org/react";
import { useNavigate } from 'react-router-dom'
import CuisineCard from '../components/CuisineCard';

const HomeScreen = () => {

    const navigate = useNavigate();  

    const [selected, setSelected] = React.useState(new Set(["Kochi"]));
    const [searchTerm, setSearchTerm] = useState("");
    const [ambience, setAmbience] = useState("");
    const [cuisine, setCusine] = useState("")

    const dispatch = useDispatch()

  const selectedValue = React.useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const ambienceHandler = (text) => {
    setAmbience(text)
  }

  const cuisineHandler = (text) => {
    setCusine(text)
  }

  const loginHandler = () => {
    navigate('/login')
  }

  const SignUpHandler = () => {
    navigate('/signup')
  }

  const handleSearch = () => {
    let cityName = Array.from(selected)[0]
    navigate(`/verify?query=${searchTerm}&city=${cityName}`);
    console.log(searchTerm)
  }

  const navigator = (text) => {
    setCusine(text)
    if(ambience) {
        let cityName = Array.from(selected)[0]
        navigate(`/verify?ambience=${ambience}&city=${cityName}`);
    } else if(cuisine) {
        let cityName = Array.from(selected)[0]
        navigate(`/verify?cuisine=${cuisine}&city=${cityName}`);
    } else {
        console.log('iam fine')
    }
  }

  const submitHandler = () => {
    if(ambience) {
        let cityName = Array.from(selected)[0]
        navigate(`/verify?ambience=${ambience}&city=${cityName}`);
    } else if(cuisine) {
        let cityName = Array.from(selected)[0]
        navigate(`/verify?cuisine=${cuisine}&city=${cityName}`);
    } else {
        console.log('iam fine')
    }
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin


    return (
        <div className='hero-section-home'>
            <div className='nav-component'>
            `   <div className="logo">Le-Resto</div>
                    <Dropdown className='dropdown-component'>
                        <Dropdown.Button flat style={{backgroundColor: "#fff",color: "#333", width: "75px" }} className='dropdown-component'><ImLocation style={{marginRight: "34px"}}/>{selectedValue}</Dropdown.Button>
                        <Dropdown.Menu 
                            aria-label="Single selection actions"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selected}
                            onSelectionChange={setSelected}
                        >
                            <Dropdown.Item key="Mumbai">Mumbai</Dropdown.Item>
                            <Dropdown.Item key="Chennai">Chennai</Dropdown.Item>
                            <Dropdown.Item key="Kochi">Kochi</Dropdown.Item>
                        </Dropdown.Menu>
                        {console.log(Array.from(selected)[0])}
                    </Dropdown>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search for a cuisine..."
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button type="submit" onClick={() => handleSearch()}>
                            <FaSearch />
                        </button>
                    </div>
                    <div className='remaining-nav'>
                        <button className="cta-button home-cta" style={{marginRight: "16px"}} onClick={() => loginHandler()}>Login</button>
                        <button className="cta-button home-cta" onClick={() => SignUpHandler()}>SignUp</button>
                    </div>
            </div>
            <h4>Find your perfect ambience</h4>
            <div className='filter-ambience'>
                <div className='ambience-rest' onClick={() => ambienceHandler("outdoor seating")}>
                    <img className="circle-image" src="https://media.architecturaldigest.com/photos/618a7d98d4dc025cc87e313d/16:9/w_5984,h_3366,c_limit/Exterior%203.jpg" alt="some random shit!" />
                    <p>outdoor seating</p>
                </div>
                <div className='ambience-rest' onClick={() => ambienceHandler("family friendly")}>
                    <img className="circle-image" src="https://media.istockphoto.com/id/479195108/photo/cheerful-young-father-feeding-his-son-in-restaurant.jpg?s=612x612&w=0&k=20&c=U5bPSTsa50bneeSntFiI0YP2CnRiioyVmvzpRJheZrE=" alt="some random shit!" />
                    <p>family friendly</p>
                </div>
                <div className='ambience-rest' onClick={() => ambienceHandler("sports bar")}>
                    <img className="circle-image" src="https://images.pexels.com/photos/6241298/pexels-photo-6241298.jpeg?cs=srgb&dl=pexels-mohit-marwaha-6241298.jpg&fm=jpg" alt="some random shit!" />
                    <p>sports bar</p>
                </div>
                <div className='ambience-rest' onClick={() => ambienceHandler("romantic")}>
                    <img className="circle-image" src="https://media.istockphoto.com/id/865208774/photo/romantic-dining-at-night.jpg?s=612x612&w=0&k=20&c=Ege0ISa8UanWiqUMDvHLAfIcNhnw42CZdSRevM-NVmk=" alt="some random shit!" />
                    <p>romantic</p>
                </div>
                <div className='ambience-rest' onClick={() => ambienceHandler("retro")}>
                    <img className="circle-image" src="https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmV0cm8lMjBkaW5lcnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="some random shit!" />
                    <p>retro</p>
                </div>
                <div className='ambience-rest' onClick={() => ambienceHandler("live music")}>
                    <img className="circle-image" src="https://media.istockphoto.com/id/1179435850/photo/microphone-microphone-close-up-a-pub-bar-a-restaurant-classical-music-music.jpg?s=612x612&w=0&k=20&c=f74-R0k-QqDMai-Iu7jgyV_MA-Dmxoa9Mtvcg-VlZLs=" alt="some random shit!" />
                    <p>live music</p>
                </div>
            </div>
            <h4>Explore the restaurents by Cuisine</h4>
            <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={3}>
                        <div className='pointer-class' onClick={() => navigator("vegetarian")}>
                            <CuisineCard image={'https://vismaifood.com/storage/app/uploads/public/8b4/19e/427/thumb__700_0_0_0_auto.jpg'} text1={'vegetarian'} text2={'10+ verieties'}/>
                        </div>
                    </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("rice dishes")}>
                        <CuisineCard image={'https://insanelygoodrecipes.com/wp-content/uploads/2022/06/Delicious-Homemade-Indian-Lamb-Rice-Pilaf.jpg'} text1={'rice dishes'} text2={'19+ verieties'}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("grills")}>
                        <CuisineCard image={'https://imageio.forbes.com/specials-images/imageserve/1177886278/x.jpg?format=jpg&width=960'} text1={'grills'} text2={'5+ verieties'}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("seafood")}>
                        <CuisineCard image={'https://www.honestfoodtalks.com/wp-content/uploads/2020/11/Seafood-platter-500x400.jpg'} text1={'sea food'} text2={'10+ verieties'}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("burgers")}>
                        <CuisineCard image={'https://www.seriouseats.com/thmb/e16lLOoVEix_JZTv7iNyAuWkPn8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2014__09__20140918-jamie-olivers-comfort-food-insanity-burger-david-loftus-f7d9042bdc2a468fbbd50b10d467dafd.jpg'} text1={'burgers'} text2={'15+ verieties'}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("pizza")}>
                        <CuisineCard image={'https://static.toiimg.com/thumb/53110049.cms?width=1200&height=900'} text1={'pizza'} text2={'7+ verieties'}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("chineese")}>
                        <CuisineCard image={'https://ik.imagekit.io/awwybhhmo/satellite_images/chinese/beyondmenu/hero/2.jpg?tr=w-3840,q-50'} text1={'chineese'} text2={'21+ verieties'}/>
                    </div>
                </Grid>
                <Grid xs={12} sm={3}>
                    <div className='pointer-class' onClick={() => navigator("shakes")}>
                        <CuisineCard image={'https://media.istockphoto.com/id/1126893721/photo/low-key-chocolate-smoothies-on-a-table-in-a-rustic-kitchen.jpg?s=612x612&w=0&k=20&c=ubUfrroh2JWOvdqt3lFhfmXK0OZKzCDbGNj5JVcFRVg='} text1={'shakes'} text2={'17+ verieties'}/>
                    </div>
                </Grid>
            </Grid.Container>
            <div className='next-container'>
                <button className="cta-button home-cta" style={{marginRight: "16px", marginBottom: "16px", fontSize: "18px"}} onClick={() => submitHandler()}>Next</button>
            </div>
            {console.log(selected)}
            {console.log(searchTerm)} 
        </div>
    )
}

export default HomeScreen