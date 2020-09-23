import axios from 'axios'

//action type
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'
const ADD_TO_CART = 'ADD_TO_CART'
//const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

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
    const response = await axios.get(`/api/${userId}/products`)
    dispatch(setCartProducts(response.data))
  }
}

//action creator
export const addProduct = product => {
  return {
    type: ADD_TO_CART,
    product
  }
}

//thunk to add product to cart
export const addToCart = productId => {
  return async dispatch => {
    const response = await axios.get(`/api/products/${productId}`)
    dispatch(addProduct(response.data))
  }
}

//reducer, which gets sent to store.js to be combined
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.products
    case ADD_TO_CART:
      return [...state, action.product]
    default:
      return state
  }
}
