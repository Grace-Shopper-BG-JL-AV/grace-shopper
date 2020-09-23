import axios from 'axios'

//action type
const SET_USERS = 'SET_USERS'

//action creator
//all users
export const setUsers = users => {
  return {
    type: SET_USERS,
    users
  }
}

//thunk to get all of the products
export const fetchUsers = () => {
  return async dispatch => {
    const response = await axios.get('/api/users')
    dispatch(setUsers(response.data))
  }
}

//reducer, which gets sent to store.js to be combined
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    default:
      return state
  }
}
