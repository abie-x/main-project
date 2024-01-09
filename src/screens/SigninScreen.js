import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Container, Grid, useTheme, Input, Button, Textarea, Loading} from "@nextui-org/react";
import { login } from "../actions/userActions";

const SigninScreen = ({location, history}) => {
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('')
    const [err, setErr] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    useEffect(() => {
        if(userInfo) {
            navigate('/home')
        }
        if(error) { 
            setErr(error)
        }  
    }, [error, history, userInfo])

    const submitHandler = () => {
        dispatch(login(email, pwd))
    }

    return(
        <div className='signup-parent'>
            <div className="signup-brand">
                <h1 className="signup-brand-heading"><h1 style={{fontWeight: 1000, display: 'inline'}}></h1></h1>
                <h6 className='signup-tagline'></h6>
                <img src='/images/bg-2.png' className='signin-brand-image'/>
                {/* <img src='/images/electionpaper.png' className='signup-brand-paper'/> */}
                {err && (
                <div style={{position: "absolute", left: "25%", top: "2%"}}>
                    <Input value={err}status="error" width='700px' style={{textAlign: "center"}}/>
                </div>
                )}
                {console.log(error)}
            </div>
            <div className='signup-form'>
                <h2 className='signup-form-heading' style={{marginLeft: "16%"}}>LOGIN</h2>
                <div className='signup-form-container'>
                <div style={{display: 'block', marginBottom: '40px',}}>
                <Input 
                    size='md'
                    width='330px'
                    underlined 
                    labelPlaceholder="Email Address" 
                    color="#889096"
                    onChange={(e)  => setEmail(e.target.value)}
                />
                </div>
                {/* {console.log(error)} */}
                <div style={{display: 'block', marginBottom: '40px', marginTop: '10px'}}>
                <Input 
                    size='lg'
                    width='330px'
                    underlined 
                    labelPlaceholder="Password" 
                    color="#889096"
                    onChange={(e) => setPwd(e.target.value)}
                />
                </div>
                
                <button className='cta-button signup-button' onClick={() => submitHandler()}>
                  <h4>Login</h4>
              </button>
                <div className='signup-redirector'>
                    <h5 style={{display: "inline", marginLeft: "4px"}}>Not a member? <Link to={'/'}><h5 style={{fontWeight:800, display: "inline", letterSpacing: "0.75px", cursor: "pointer", color: "#000"}}>Signup</h5></Link></h5>
                </div>
                </div>
            </div>
        </div>
    )
}

export default SigninScreen
