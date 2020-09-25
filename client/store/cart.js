import axios from 'axios'

//action type
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'
const SET_CART_PRODUCTS_GUEST = 'SET_CART_PRODUCTS_GUEST'

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
    console.log('RESOPONE', response.data)
    dispatch(setCartProducts(response.data))
  }
}

export const fetchStorageCartProducts = products => {
  return {
    type: SET_CART_PRODUCTS_GUEST,
    products
  }
}

//reducer, which gets sent to store.js to be combined
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.products
    case SET_CART_PRODUCTS_GUEST:
      return action.products
    default:
      return state
  }
}
