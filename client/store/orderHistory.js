import axios from 'axios'

//action type
const SET_ORDER_HISTORY = 'SET_ORDER_HISTORY'

//action creator
export const setOrderHistory = orders => {
  return {
    type: 'SET_ORDER_HISTORY',
    orders
  }
}

//thunk to get all of the user cart products
export const fetchOrderHistory = userId => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${userId}/orderHistory`)
    dispatch(setOrderHistory(response.data))
  }
}

//reducer, which gets sent to store.js to be combined
export default function orderHistoryReducer(state = [], action) {
  console.log('action: ', action)
  switch (action.type) {
    case SET_ORDER_HISTORY:
      return action.orders
    default:
      return state
  }
}
