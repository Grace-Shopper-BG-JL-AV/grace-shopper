import axios from 'axios'

//action type
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

//action creator
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const addProduct = input => {
  return {
    type: ADD_PRODUCT,
    input
  }
}

//thunk to get all of the products
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      dispatch(setProducts(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//thunk to add product to db
export const addProductToDb = productObj => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/products/', productObj)
      dispatch(addProduct(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

//thunk to delete product from db
export const deleteProduct = id => {
  return async (dispatch, getState) => {
    try {
      await axios.delete(`/api/products/${id}`)
      dispatch({
        type: DELETE_PRODUCT,
        id,
        state: getState
      })
    } catch (error) {
      console.log(error)
    }
  }
}

//reducer, which gets sent to store.js to be combined
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [
        ...state,
        {
          name: action.input.name,
          description: action.input.description,
          id: action.input.id
        }
      ]
    case DELETE_PRODUCT:
      return [
        ...state.filter(product => {
          return product.id !== action.id
        })
      ]
    default:
      return state
  }
}
