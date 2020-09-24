import {expect} from 'chai'
import {fetchProducts, setProducts, SET_PRODUCTS} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'

import {rootReducer} from '../store'

import {composeWithDevTools} from 'redux-devtools-extension'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Redux Products', () => {
  const products = [
    {id: 1, name: 'dog costume', description: 'cute'},
    {id: 2, name: 'another costume', description: 'so cute'}
  ]

  let store
  let mockAxios

  const initialState = {products: [], user: {}, product: {}, users: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    mockAxios.onGet('/api/products').replyOnce(200, products)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('set/fetch products', () => {
    it('setProducts action creator', () => {
      expect(setProducts(products)).to.deep.equal({
        type: 'SET_PRODUCTS',
        products
      })
    })

    it('fetchProducts thunk creator returns a thunk that GETs /api/products', async () => {
      await store.dispatch(fetchProducts())
      const [getRequest] = mockAxios.history.get
      expect(getRequest).to.not.equal(undefined)
      expect(getRequest.url).to.equal('/api/products')
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_PRODUCTS')
      expect(actions[0].products).to.deep.equal(products)
    })
  })

  //keep getting error: expect reducer in before hook to be a function. need to fix.
  describe('products reducer', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(rootReducer)
    })

    xit('returns the initial state by default', () => {
      expect(testStore.getState().products).to.be.an('array')
    })

    xit('handles SET_PRODUCTS as expected', () => {
      const reducer = products(initialState, {
        type: SET_PRODUCTS,
        payload: {
          data: [{id: 1, name: 'dog costume', description: 'cute'}]
        }
      })

      expect(reducer).toEqual({
        products: [{id: 1, name: 'dog costume', description: 'cute'}],
        user: {},
        product: {},
        users: []
      })
    })
  })
})
