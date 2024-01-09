import axios from "axios";
import {RESTAURENT_LIST_REQUEST, RESTAURENT_LIST_SUCCESS, RESTAURENT_LIST_FAILURE, RESTAURENT_AMBIENCE_LIST_REQUEST, RESTAURENT_AMBIENCE_LIST_SUCCESSS, RESTAURENT_AMBIENCE_LIST_FAILURE, RESTAURENT_CUISINE_LIST_REQUEST, RESTAURENT_CUISINE_LIST_SUCCESS, RESTAURENT_CUISINE_LIST_FAILURE, RESTAURENT_MENU_LIST_REQUEST, RESTAURENT_MENU_LIST_SUCCESS, RESTAURENT_MENU_LIST_FAILURE} from '../../src/constants/restaurentConstants'

export const RestaurentSearchData = (city, query) => async (dispatch) => {
    try {
        dispatch({ type: RESTAURENT_LIST_REQUEST })
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    
        const { data } = await axios.get(
          `http://127.0.0.1:3001/api/restaurents/search?dish=${query}&city=${city}`,
        )

        console.log('iam getting exectuted')
        console.log(data)
  
    
        dispatch({
          type: RESTAURENT_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        console.log('some errors are happening')
        console.log(error)
        dispatch({
          type: RESTAURENT_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
  }

  export const RestaurentAmbienceData = (city, ambience) => async (dispatch) => {
    try {
        dispatch({ type: RESTAURENT_AMBIENCE_LIST_REQUEST })
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    
        const { data } = await axios.get(
          `http://127.0.0.1:3001/api/restaurents/ambience/${ambience}?city=${city}`,
        )

        console.log('iam getting exectuted')
        console.log(data)
  
    
        dispatch({
          type: RESTAURENT_AMBIENCE_LIST_SUCCESSS,
          payload: data,
        })
      } catch (error) {
        console.log('some errors are happening')
        console.log(error)
        dispatch({
          type: RESTAURENT_AMBIENCE_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
  }

  export const RestaurentCuisineData = (city, cuisine) => async (dispatch) => {
    try {
        dispatch({ type: RESTAURENT_CUISINE_LIST_REQUEST })
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    
        const { data } = await axios.get(
          `http://127.0.0.1:3001/api/restaurents/cuisine/${cuisine}?city=${city}`,
        )

        console.log('iam getting exectuted')
        console.log(data)
  
    
        dispatch({
          type: RESTAURENT_CUISINE_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        console.log('some errors are happening')
        console.log(error)
        dispatch({
          type: RESTAURENT_CUISINE_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
  }


  export const RestaurentMenuData = (id) => async (dispatch) => {
    try {
        dispatch({ type: RESTAURENT_MENU_LIST_REQUEST })
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
    
        const { data } = await axios.get(
          `http://127.0.0.1:3001/api/restaurents/${id}`,
        )

        console.log('iam getting exectuted')
        console.log(data)
  
    
        dispatch({
          type: RESTAURENT_MENU_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        console.log('some errors are happening')
        dispatch({
          type: RESTAURENT_MENU_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
  }