import axios from 'axios'

//action type
const GET_PRODUCT = 'GET_PRODUCT'

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

//reducer
const initialState = {}

export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
