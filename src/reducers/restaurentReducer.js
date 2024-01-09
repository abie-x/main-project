import { RESTAURENT_LIST_REQUEST, RESTAURENT_LIST_SUCCESS, RESTAURENT_LIST_FAILURE, RESTAURENT_AMBIENCE_LIST_REQUEST, RESTAURENT_AMBIENCE_LIST_SUCCESSS, RESTAURENT_AMBIENCE_LIST_FAILURE, RESTAURENT_CUISINE_LIST_REQUEST, RESTAURENT_CUISINE_LIST_SUCCESS, RESTAURENT_CUISINE_LIST_FAILURE, RESTAURENT_MENU_LIST_REQUEST, RESTAURENT_MENU_LIST_SUCCESS, RESTAURENT_MENU_LIST_FAILURE } from '../../src/constants/restaurentConstants'

export const RestaurentSearchListReducer = (state = { restaurents: [] }, action) => {
  switch (action.type) {
    case RESTAURENT_LIST_REQUEST:
      console.log('req happens here')
      return { loading: true, restaurents: [] }
    case RESTAURENT_LIST_SUCCESS:
      console.log('success happens here')
      return {
        loading: false,
        restaurents: action.payload,
      }
    case RESTAURENT_LIST_FAILURE:
      console.log('failure happens here')
      return { loading: false, error: action.payload }
    default:
      return state
  }
} 

export const RestaurentAmbienceListReducer = (state = { ambience_restaurents: [] }, action) => {
  switch (action.type) {
    case RESTAURENT_AMBIENCE_LIST_REQUEST:
      console.log('req happens here')
      return { ambience_loading: true, ambience_restaurents: [] }
    case RESTAURENT_AMBIENCE_LIST_SUCCESSS:
      console.log('success happens here')
      return {
        ambience_loading: false,
        ambience_restaurents: action.payload,
      }
    case RESTAURENT_AMBIENCE_LIST_FAILURE:
      console.log('failure happens here')
      return { ambience_loading: false, ambience_error: action.payload }
    default:
      return state
  }
} 

export const RestaurentCuisineListReducer = (state = { cuisine_restaurents: [] }, action) => {
  switch (action.type) {
    case RESTAURENT_CUISINE_LIST_REQUEST:
      console.log('req happens here')
      return { cuisine_loading: true, cuisine_restaurents: [] }
    case RESTAURENT_CUISINE_LIST_SUCCESS:
      console.log('success happens here')
      return {
        cuisine_loading: false,
        cuisine_restaurents: action.payload,
      }
    case RESTAURENT_CUISINE_LIST_FAILURE:
      console.log('failure happens here')
      return { cuisine_loading: false, cuisine_error: action.payload }
    default:
      return state
  }
} 

export const RestaurentMenuListReducer = (state = { restaurentMenu: [] }, action) => {
  switch (action.type) {
    case RESTAURENT_MENU_LIST_REQUEST:
      console.log('req happens here')
      return { loading: true, restaurentMenu: [] }
    case RESTAURENT_MENU_LIST_SUCCESS:
      console.log('success happens here')
      const startersArray = [];
      const mainCourseArray = [];
      const chefSpecialsArray = [];
      action.payload.forEach(item => {
        switch (item.category) {
          case 'Starters':
            startersArray.push(item);
            break;
          case 'Main Course':
            mainCourseArray.push(item);
            break;
          case 'Chef Specials':
            chefSpecialsArray.push(item);
            break;
          default:
            break;
        }
      });
      return {
        loading: false,
        restaurentMenu: action.payload,
        startersArray,
        mainCourseArray,
        chefSpecialsArray
      }
    case RESTAURENT_MENU_LIST_FAILURE:
      console.log('failure happens here')
      return { loading: false, error: action.payload }
    default:
      return state
  }
} 