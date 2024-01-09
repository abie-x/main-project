import React from 'react'
import Lottie from "lottie-react";
import successAnimation from '../success.json'
import {Button} from "@nextui-org/react";
import {useNavigate, useSearchParams, useParams} from 'react-router-dom'

const VotingSuccessScreen = () => {
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const {name} = useParams()
    
  return (
    <div className='candidate-background'>
      <div className='candidate-background-child'>
        <div style={{display: "flex", justifyContent: "center",  paddingTop: "120px"}}>
            <Lottie animationData={successAnimation} loop={true} style={{height: "250px", width: "250px"}} />
        </div>
        {console.log(name)}
        <div style={{display: "flex", justifyContent: "center"}}>
            <h4 style={{color: "grey",letterSpacing: "1px" }}>VOTED SUCCESSFULLY</h4>
        </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Button color="success" auto style={{height: "40px", width: "250px", marginTop: "25px", paddingTop: "5px"}} onPress={() => navigate(`/results/${name}`)}>
                <h4>View Result</h4>
            </Button>
        </div>
      </div>
    </div>
  )
}

export default VotingSuccessScreen