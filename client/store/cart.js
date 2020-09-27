import axios from 'axios'

//action type
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
//const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS'

//action creator
export const setCartProducts = products => {
  return {
    type: SET_CART_PRODUCTS,
    products
  }
}

export const changeQuantity = products => {
  return {
    type: CHANGE_QUANTITY,
    products
  }
}

// export const removeProducts = (products) => {
//   return {
//     type: REMOVE_PRODUCTS,
//     products,
//   }
// }

//thunk to get all of the user cart products
export const fetchCartProducts = userId => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${userId}/cart`)
    dispatch(setCartProducts(response.data))
  }
}

export const setStorageCartProducts = products => {
  console.log('products in thunk!', products)
  return dispatch => {
    dispatch(setCartProducts(products))
  }
}

export const addToGuestCartInRedux = (product, productId) => {
  return dispatch => {
    let storageProducts = localStorage.getItem('storageProducts')
    let updatedProducts

    if (storageProducts) {
      product.id = productId
      storageProducts = JSON.parse(storageProducts)
      updatedProducts = {
        orderProducts: [
          ...storageProducts.orderProducts,
          {
            id: productId,
            price: 0,
            product,
            productId,
            quantity: 1,
            totalPrice: 0
          }
        ]
      }
      localStorage.setItem('storageProducts', JSON.stringify(updatedProducts))
    } else {
      product.id = productId
      updatedProducts = {
        orderProducts: [
          {
            id: productId,
            price: 0,
            product,
            productId,
            quantity: 1,
            totalPrice: 0
          }
        ]
      }
      localStorage.setItem('storageProducts', JSON.stringify(updatedProducts))
    }
    dispatch(setCartProducts(updatedProducts))
  }
}

//thunk to update product quantity
export const updateQuantity = (orderProductsId, newQuantity) => {
  return async dispatch => {
    const response = await axios.put(`/api/users/${orderProductsId}`, {
      quantity: newQuantity
    })
    dispatch(changeQuantity(response.data))
  }
}

//thunk to remove products from cart
// export const deleteProducts = (cartId, orderProductsId) => {
//   return async (dispatch) => {
//     const response = await axios.put(`/api/users/${cartId}/${orderProductsId}`)
//     console.log('response data: ', response.data)
//     dispatch(removeProducts(response.data.orderProducts))
//   }
// }

//reducer, which gets sent to store.js to be combined
export default function cartReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.products
    case CHANGE_QUANTITY:
      return action.products
    // case REMOVE_PRODUCTS:
    //   return action.products
    default:
      return state
  }
}
