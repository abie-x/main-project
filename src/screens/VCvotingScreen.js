import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useSearchParams, useNavigate} from 'react-router-dom'
import { candidateData } from '../actions/electionActions'
import { User, Avatar, Button, Input } from "@nextui-org/react";
import { SocialIcon } from 'react-social-icons';
import { pollVote, checkPolled } from '../actions/electionActions';

const VCvotingScreen = () => {
    const [searchParams] = useSearchParams();
    const {name} = useParams()

    const candidateInfo = useSelector((state) => state.candidateInfo)
    const {loading, candidate, } = candidateInfo

    const userRegister = useSelector((state) => state.userRegister)
    const {  userInfo } = userRegister

    const voteNow = useSelector((state) => state.vote)
    const {error, electionData} = voteNow

    const [err, setErr] = useState(false)
    const [polled, setPolled] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [imgSrc, setImgSrc] = useState("")

    const cName = searchParams.get('cName')
    useEffect(() => {
        dispatch(candidateData(name, cName))
        dispatch(pollVote(candidate._id, userInfo.name, userInfo.email, candidate.length >=0 && candidate[0].name))
        if(error) {
            setErr(true)
        }
    }, [name, cName])

    const submitHandler =  () => {
        dispatch(pollVote(candidate._id, userInfo.name, userInfo.email, candidate.length >=0 && candidate[0].name))
        if(error) {
            console.log('something went wrong...')
        } else {
            navigate(`/success/${name}`)
        }
    }

  return (
    <div className='candidate-background'>
      <div className='candidate-background-child'>
        <div className='candidate-title'>
            <h2 style={{color: "grey", letterSpacing: 1, fontWeight:700}}>{`${name.toLocaleUpperCase()} CANDIDATE`}</h2>
        </div>
        {candidate.length >= 0 ? console.log(candidate[0]) : console.log('hi')}
        {err&& (
                <div style={{position: "absolute", left: "25%", top: "8%"}}>
                    <Input value={'User already voted'}status="error" width='700px' style={{textAlign: "center"}}/>
                </div>
        )}
        {console.log(err)}
        <div style={{width: "100%", textAlign: "center", marginTop: "20px"}}>
            <User
                src="https://i.pravatar.cc/150?u=a042581f4e290888704d"
                name=""
                size='xxl'
                bordered
            />
            <div style={{textAlign: 'center'}}>
            <h4 style={{color: "grey"}}>{candidate.length >=0 && candidate[0].name}</h4>
            <h4 style={{color: "grey"}}>{candidate.length >=0 && candidate[0].department}</h4>
            <div style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                <SocialIcon url="https://www.instagram.com/troll_jyothi/?hl=en" style={{height: "25px", width: "25px", marginRight: "10px"}} />
                <SocialIcon url="https://twitter.com/jaketrent" style={{height: "25px", width: "25px", marginRight: "10px"}} />
                <SocialIcon url="https://linkedin.com/jaketrent" style={{height: "25px", width: "25px"}} />
            </div>
            </div>
            <div style={{width: "100%", display: "flex", justifyContent: "center"}}>
                <Button color="success" auto style={{height: "50px", width: "350px", marginTop: "25px", paddingTop: "5px"}} onPress={() => submitHandler()}>
                    <h4>Vote Now</h4>
                </Button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default VCvotingScreen