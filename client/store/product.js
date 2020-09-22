import axios from 'axios'

//action type
const SET_PRODUCTS = 'SET_PRODUCTS'

//action creator
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

//thunk to get all of the products
export const fetchProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    dispatch(setProducts(response.data))
  }
}

//reducer, which gets sent to index.js to be combined
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
