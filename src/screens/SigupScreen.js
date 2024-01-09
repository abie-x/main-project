import React, {useState, useEffect} from 'react'
import {Container, Grid, useTheme, Input, Button, Textarea} from "@nextui-org/react";
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../actions/userActions'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { AiFillEye } from "react-icons/ai";

const SigupScreen = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')
  const [phNo, setPhNo] = useState('')
  const [err, setErr] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if(userInfo) {
      navigate('/home')
    }
    if(error) {
      setErr(error)
    }
  }, [userInfo, navigate])

  const submitHandler = () => {
    console.log('iam being pressed!!')
    if(userName === '' || email === '' || pwd === '') {
      setErr('please fill the required creditionals')
    }
    else if(pwd !== confirmPwd) {
      setErr("Passwords doesn't match")
    } else {
      dispatch(register(userName,email,pwd, phNo))
    }
    
  }
  return (
    <div className='signup-parent'>
        <div className="signup-brand">
            <h1 className="signup-brand-heading"><h1 style={{fontWeight: 1000, display: 'inline'}}></h1></h1>
            <h6 className='signup-tagline'></h6>
            <img src='/images/bg-1.png' className='signup-brand-battle'/>
            {/* <img src='/images/' className='signup-brand-paper'/> */}
            {err && (
              <div style={{position: "absolute", left: "25%", top: "2%"}}>
                <Input value={err}status="error" width='700px' style={{textAlign: "center"}}/>
              </div>
            )}
        </div>
        <div className='signup-form'>
            <h2 className='signup-form-heading'>CREATE YOUR ACCOUNT</h2>
            <div className='signup-form-container' style={{marginTop: '-50px'}}>
              <div style={{display: 'block', marginBottom: '40px', marginTop: '10px'}}>
              <Input 
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Username" 
                color="#889096"
                autoComplete='off'
                onChange={(e) => setUserName(e.target.value)}
              />
              {console.log(email)}
              </div>
              <div style={{display: 'block', marginBottom: '40px', marginTop: '10px'}}>
              <Input 
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Email Address" 
                color="#889096"
                autoComplete='off'
                onChange={(e) => setEmail(e.target.value)}
              />
              {console.log(email)}
              </div>
              <div style={{display: 'block', marginBottom: '40px'}}>
              {/* <Input 
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Password" 
                color="#889096"
                onChange={(e) => setPwd(e.target.value)}
              /> */}
              <Input.Password
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Password" 
                color="#889096"
                visibleIcon={<AiFillEye />}
                autoComplete='off'
                onChange={(e) => setPwd(e.target.value)}
              />
              {console.log(pwd)}
              </div>
              <div>
              {/* <Input 
                style={{display: 'block'}}
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Confirm Password" 
                color="#889096"
                onChange={(e) => setConfirmPwd(e.target.value)}
              /> */}
              <Input.Password
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Password" 
                color="#889096"
                visibleIcon={<AiFillEye />}
                autoComplete='off'
                onChange={(e) => setConfirmPwd(e.target.value)}
              />
              {console.log(confirmPwd)}
              </div>
              <div style={{display: 'block', marginBottom: '40px', marginTop: '40px'}}>
              <Input 
                size='lg'
                width='330px'
                underlined 
                labelPlaceholder="Phone number" 
                color="#889096"
                autoComplete='off'
                onChange={(e) => setPhNo(e.target.value)}
              />
              {console.log(email)}
              </div>
              <button className='cta-button signup-button' onClick={() => submitHandler()}>
                  <h4>Create New Account</h4>
              </button>
              <div className='signup-redirector'>
                <h5 style={{display: "inline"}}>Already have an Account? <Link to={'/login'}><h5 style={{fontWeight:800, display: "inline", letterSpacing: "0.75px", cursor: "pointer", color: "#000"}}>Login</h5></Link></h5>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SigupScreen