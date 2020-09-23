//**modified from JPFP
import {createStore, applyMiddleware, combineReducers} from 'redux'
import axios from 'axios'
//import appReducer from './store'
import {createLogger} from 'redux-logger' // https://github.com/evgenyrodionov/redux-logger
import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk' // https://github.com/gaearon/redux-thunk
import productsReducer from './store/product'
import userReducer from './store/user'
import singleProductReducer from './store/singleProduct'

let middleware = [
  // `withExtraArgument` gives us access to axios in our async action creators!
  // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
  thunkMiddleware.withExtraArgument({axios})
]
if (process.browser) {
  // We'd like the redux logger to only log messages when it's running in the
  // browser, and not when we run the tests from within Mocha.
  middleware = [...middleware, createLogger({collapsed: true})]
}

/** We wrap the entire redux store in a root reducer with a special
 * action, RESET_STORE. It calls our application's reducer with
 * state = undefined. This will trigger each of our sub-reducers
 * to reset back to their initial state. This will come in
 * handy when we need to reset our redux store in between tests.
 */
//const RESET_STORE = 'RESET_STORE'
//export const resetStore = () => ({type: RESET_STORE})
//const rootReducer = (state, action) => {
// if (action.type === RESET_STORE) {
//   state = undefined
//return appReducer(state, action)
// }
// return appReducer(state, action)
//}
const rootReducer = combineReducers({
  products: productsReducer,
  user: userReducer,
  product: singleProductReducer
})

export default createStore(
  rootReducer,
  // 👇 This uses the Redux DevTools extension, assuming you have it installed in your browser.
  // 👇 See: https://github.com/zalmoxisus/redux-devtools-extension
  composeWithDevTools(applyMiddleware(...middleware))
)

// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import {createLogger} from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
// import user from './store/user'

// const reducer = combineReducers({user})
// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
// )
// const store = createStore(reducer, middleware)

// export default store
// export * from './store/user'
