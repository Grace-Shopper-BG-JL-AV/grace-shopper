import axios from 'axios'

//action type
const GET_PRODUCT = 'GET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

//action creator
export const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

//thunk
export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(getProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//thunk to update product
export const updateProduct = (id, stateObj) => {
  return async (dispatch, getState) => {
    try {
      await axios.put(`/api/products/${id}`, stateObj)
      dispatch({
        type: UPDATE_PRODUCT,
        id,
        stateObj,
        state: getState
      })
    } catch (err) {
      console.log(err)
    }
  }
}

//reducer
const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return {
        ...state,
        name: action.stateObj.name,
        description: action.stateObj.description
      }
    default:
      return state
  }
}
