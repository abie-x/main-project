import {CANDIDATE_LIST_REQUEST, CANDIDATE_LIST_SUCCESS, CANDIDATE_LIST_FAILURE, ELECTION_CANDIDATE_REQUEST, ELECTION_CANDIDATE_SUCCESS, ELECTION_CANDIDATE_FAILURE, VOTE_REQUEST, VOTE_SUCCESS, VOTE_FAILURE} from "../constants/electionConstants"

export const candidateListReducer = (state = { candidates: [] }, action) => {
    switch (action.type) {
      case CANDIDATE_LIST_REQUEST:
        return { loading: true, candidates: [] }
      case CANDIDATE_LIST_SUCCESS:
        return { 
          loading: false,
          candidates: action.payload.candidates,
        }
      case CANDIDATE_LIST_FAILURE:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  } 

  export const candidateReducer = (state = { candidate: {} }, action) => {
    switch (action.type) {
      case ELECTION_CANDIDATE_REQUEST:
        return { loading: true, candidate: {} }
      case ELECTION_CANDIDATE_SUCCESS:
        return {
          loading: false,
          candidate: action.payload,
        }
      case ELECTION_CANDIDATE_FAILURE:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  } 

  export const voteReducer = (state = { electionData: {} }, action) => {
    switch (action.type) {
      case VOTE_REQUEST:
        return { loading: true, electionData: {} }
      case VOTE_SUCCESS:
        return {
          loading: false,
          electionData: action.payload,
        }
      case VOTE_FAILURE:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  } 