import axios from 'axios'
import {CANDIDATE_LIST_REQUEST, CANDIDATE_LIST_SUCCESS, CANDIDATE_LIST_FAILURE,ELECTION_CANDIDATE_FAILURE, ELECTION_CANDIDATE_REQUEST, ELECTION_CANDIDATE_SUCCESS, VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE, } from "../constants/electionConstants"

export const listCandidates = (name) => async (dispatch) => {
    try {
        dispatch({ type: CANDIDATE_LIST_REQUEST })

     
        const { data } = await axios.get(
          `http://127.0.0.1:5000/api/elections/${name}`
        )
    
        dispatch({
          type: CANDIDATE_LIST_SUCCESS,
          payload: data,
        })
      } catch (error) {
        dispatch({
          type: CANDIDATE_LIST_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
      }
}

export const candidateData = (name, cName) => async (dispatch) => {
  try {
      dispatch({ type: ELECTION_CANDIDATE_REQUEST })

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

    //   const data = {
    //     "candidateId": "62df428cd2f8308e8a68c7e4",
    //     "name": "Anna",
    //     "email": "testmail@gmail.com",
    //     "description": "simple and humple",
    //     "department": "S8 CSE",
    //     "instaId": "insta//12",
    //     "linkedinId": "linkedin//122",
    //     "imageUrl": "photos//123",
    //     "totalVotes": 2,
    //     "_id": "62df428dd2f8308e8a68c7e6"
    // }

    // console.log(name)
  
      const { data } = await axios.get(
        `http://127.0.0.1:5000/api/elections/candidate/${name}/${cName}`,
      )

  
      dispatch({
        type: ELECTION_CANDIDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ELECTION_CANDIDATE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
}

export const checkPolled = (newPoll) => async (dispatch) => {

  const testData = JSON.parse(localStorage.getItem('items'));
  console.log('hi')
  console.log(testData)
}


export const pollVote = (candidateId, userName, userEmail, name,) => async (dispatch) => {
  try {
      console.log("iam handling login requests")
    dispatch({
      type: VOTE_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.put(
      `http://127.0.0.1:5000/api/elections/vote/${name}`,
      { candidateId, userName, userEmail,  },
      config
    )

    // console.log(data)
    // const {
    //   vote: { voteData },
    // } = getState()
    // let newData
    // if(voteData.includes(name) === false) {
    //    newData = [...voteData, name]
    // } else {
    //    newData = [...voteData]
    // }

    dispatch({
      type: VOTE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    // console.log('testing error message')
    // console.log(error.response.data.message)
    dispatch({
      type: VOTE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}