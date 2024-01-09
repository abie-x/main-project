import axios from 'axios'
import {USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL} from "../constants/userConstants"

export const register = (username, email, password, phone_number) => async (dispatch) => {
    try {
        console.log("testing the app")
      dispatch({
        type: USER_REGISTER_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      console.log(email)
  
      const { data } = await axios.post(
        'http://127.0.0.1:3001/api/users/',
        { username, email, password, phone_number },
        config
      )
      console.log(data)
  
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      })

      
      console.log(data)
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const login = (email, password) => async (dispatch) => {
    try {
        console.log("iam handling login requests")
      dispatch({
        type: USER_LOGIN_REQUEST,
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        'http://127.0.0.1:3001/api/users/login',
        { email, password },
        config
      )

      console.log(data)
  
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  