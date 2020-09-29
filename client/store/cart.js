import axios from 'axios'

//action type
const SET_CART_PRODUCTS = 'SET_CART_PRODUCTS'
const CHANGE_QUANTITY = 'CHANGE_QUANTITY'
const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS'
const PURCHASE = 'PURCHASE'

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

export const removeProducts = products => {
  return {
    type: REMOVE_PRODUCTS,
    products
  }
}

export const purchase = products => {
  return {
    type: PURCHASE,
    products
  }
}

//thunk to get all of the user cart products
export const fetchCartProducts = userId => {
  return async dispatch => {
    const response = await axios.get(`/api/users/${userId}/cart`)
    dispatch(setCartProducts(response.data))
  }
}

export const setStorageCartProducts = products => {
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
        isActive: true,
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
        isActive: true,
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
export const updateQuantity = (orderProductsId, newQuantity, userId) => {
  return async dispatch => {
    const response = await axios.put(
      `/api/users/${userId}/${orderProductsId}`,
      {
        quantity: newQuantity
      }
    )
    dispatch(changeQuantity(response.data))
  }
}

export const updateGuestCartQuantity = (newQuantity, productId) => {
  return dispatch => {
    let storageProducts = localStorage.getItem('storageProducts')
    storageProducts = JSON.parse(storageProducts)

    storageProducts.orderProducts = storageProducts.orderProducts.map(
      product => {
        if (product.productId === productId) {
          product.quantity = newQuantity
        }
        return product
      }
    )

    dispatch(changeQuantity(storageProducts))
    storageProducts = JSON.stringify(storageProducts)
    localStorage.setItem('storageProducts', storageProducts)
  }
}

//thunk to remove products from cart
export const deleteProducts = (cartId, orderProductsId, userId) => {
  return async dispatch => {
    const response = await axios.delete(
      `/api/users/${userId}/${cartId}/${orderProductsId}`
    )
    dispatch(removeProducts(response.data))
  }
}

//thunk to remove products from guest cart
export const deleteStorageProducts = orderProductId => {
  return dispatch => {
    let storageProducts = localStorage.getItem('storageProducts')

    storageProducts = JSON.parse(storageProducts)
    storageProducts.orderProducts = storageProducts.orderProducts.filter(
      product => product.id !== orderProductId
    )
    dispatch(removeProducts(storageProducts))
    storageProducts = JSON.stringify(storageProducts)
    localStorage.setItem('storageProducts', storageProducts)
  }
}

//thunk to purchase
export const makePurchase = (cartId, userId) => {
  return async dispatch => {
    const response = await axios.put(
      `/api/users/${userId}/${cartId}/purchase`,
      {
        isActive: false
      }
    )
    dispatch(purchase(response.data))
  }
}

export const makeGuestPurchase = () => {
  return dispatch => {
    let storageProducts = localStorage.getItem('storageProducts')

    storageProducts = JSON.parse(storageProducts)
    storageProducts.isActive = false
    dispatch(purchase(storageProducts))
    localStorage.clear()
  }
}

//reducer, which gets sent to store.js to be combined
export default function cartReducer(state = {orderProducts: []}, action) {
  switch (action.type) {
    case SET_CART_PRODUCTS:
      return action.products
    case CHANGE_QUANTITY:
      return {
        ...state,
        orderProducts: [...action.products.orderProducts]
      }
    case REMOVE_PRODUCTS:
      return {
        ...state,
        orderProducts: [...action.products.orderProducts]
      }
    case PURCHASE:
      return action.products
    default:
      return state
  }
}
