import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { Textarea, Grid, Button } from "@nextui-org/react";
import { useNavigate, useLocation } from 'react-router-dom'
import {Alert} from 'react-bootstrap';
import axios from 'axios';

const SuccessScreen = () => {

  const [textValue, setTextValue] = useState('')
  const [rating, setRating] = useState(0);
  const navigate = useNavigate()
  //const restaurentId = useSelector((state) => state.restaurentId)
  //const { restaurentIdChange } = restaurentId

//   useEffect(() => {
//     console.log(restaurentId)
//   }, [])

  const bearerToken = localStorage.getItem('userInfo');
  const token = bearerToken ? JSON.parse(bearerToken).token : '';

  console.log(token)

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  }

  const order = {
    "restaurant_id": "6493e44ad5c0a70db42ab22c",
    "rating": rating,
    "comment": textValue
}

  const submitHandler = async () => {
    console.log('hi')
    console.log(token)
    //console.log(restaurentIdChange)
    const { data } = await axios.post(`http://127.0.0.1:3001/api/restaurents/review`, order, config)
    console.log(data)
    navigate('/home')
  }

    const Circle = ({ value, filled, handleClick }) => {
        const handleClickCircle = () => {
          handleClick(value);
        };
      
        return (
          <span
            style={{
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              border: '1px solid black',
              backgroundColor: filled ? 'green' : 'transparent',
              margin: '5px',
              cursor: 'pointer',
              textAlign: 'center',
              lineHeight: '20px',
              fontWeight: 'bold',
            }}
            onClick={handleClickCircle}
          >{value}</span>
        );
      };
    
      const RatingComponent = () => {
        const handleRatingChange = (newRating) => {
          setRating(newRating);
        };
      
        return (
          <div>
            {/* <p>Rating: {rating}</p> */}
            {[1, 2, 3, 4, 5].map((value) => (
              <Circle
                key={value}
                value={value}
                filled={value <= rating}
                handleClick={handleRatingChange}
              />
            ))}
          </div>
        );
      };
    

    return(
        <div className="success-parent"> 
            <div style={{paddingTop: "2%"}}>
                <Alert key='success' variant='success'>
                  Thank you for your purchase....
                </Alert>
                <div style={{paddingTop: "3%"}}>
                    <h4>Rate the experience</h4>
                    <div>
                        <div className="rating-parent">
                            <RatingComponent />
                        </div>
                    </div>
                    <h4 style={{marginTop: "18px"}}>Anything can be improved?</h4>
                    <Grid.Container style={{marginTop: "10px"}}>
                      <Grid>
                        <Textarea placeholder="Your feedback" rows={4} status='success' width='480px' onChange={(e) => setTextValue(e.target.value)}/>
                      </Grid>
                      {console.log(textValue)}
                    </Grid.Container>
                    <button className="cta-button home-cta" style={{marginTop: "16px", width: "180px"}} onClick={submitHandler}>Add review</button>
                </div>
            </div>
            {/* <div style={{display: "flex", justifyContent: "center"}}>
                <h4>Rate your experience</h4>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <div className="rating-parent">
                    <p>iam just executing..</p>
                </div>
            </div> */}
        </div>
    )
}

export default SuccessScreen