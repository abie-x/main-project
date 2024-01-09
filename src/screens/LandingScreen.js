import react, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LandingScreen = () => {

    const navigate = useNavigate()

    const [active, setActive] = useState('home')

    const handleHover = (option) => {
        setActive(option);
      };

      const handleLeave = () => {
        setActive(null);
      };

      console.log(active)

      const submitHandler = () => {
        navigate('/signup')
      }

    return (
        <div className="hero-section">
            <nav className="navigation-bar">
                <div className="logo">Le-Resto</div>
                <ul className="nav-links">
                <li 
                    className={active === "home" ? "active" : ""}
                    onClick={() => handleHover("home")}>
                        
                    <a href="#">Home</a>
                </li>
                <li
                    className={active === "about" ? "active" : ""}
                    onClick={() => handleHover("about")}>
                    <a href="#">About</a>
                </li>
                <li
                    className={active === "contact" ? "active" : ""}
                    onClick={() => handleHover("contact")}>
                    <a href="#">Contact</a>
                </li>
                </ul>
            </nav>
            <div className="hero-content">
                <div className="left-section">
                <h1>Elevate your dining Experience: The future of  <span style={{color: "#CC5500"}}>food</span> is here!!</h1>
                <p>Experience the future of food like never before. Our innovative platform connects you with the best restaurants, personalized to your dietary preferences. Discover new flavors, indulge in healthy options, and elevate your dining experience with ease</p>
                <button className="cta-button" onClick={() => submitHandler()}>Get Started</button>
                </div>
                <div className="right-section">
                <img src="https://omnifood.dev/img/hero.webp" alt="Image 1" className='right-section-img'/>
                {/* <img src="https://omnifood.dev/img/hero.webp" alt="Image 2"/>
                <img src="https://omnifood.dev/img/hero.webp" alt="Image 3"/> */}
                </div>
            </div>
        </div>
    )
}


export default LandingScreen