import {combineReducers} from 'redux'
import productsReducer from './product'

const appReducer = combineReducers({
  products: productsReducer
})

export default appReducer
