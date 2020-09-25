import axios from 'axios'

//action type
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'

//action creator
export const setCartProducts = products => {
  return {
    type: SET_CART_PRODUCTS,
    products
  }
}

//thunk to get all of the cart products
export const fetchCartProducts = userId => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${userId}/cart`)
    dispatch(setCartProducts(response.data))
  }
}

//reducer, which gets sent to store.js to be combined
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.products
    default:
      return state
  }
}
