import {expect} from 'chai'
import {fetchProducts, setProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
import appReducer from './index'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Redux Products', () => {
  const products = [
    //will need to edit when I can see the models
    {id: 1, name: 'dog costume', imageUrl: '/images/r2d2.png'},
    {id: 2, name: 'another costume', imageUrl: '/images/walle.jpeg'}
  ]

  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
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
      expect(actions[0].robots).to.deep.equal(products)
    })
  })

  describe('products reducer', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(appReducer)
    })

    it('returns the initial state by default', () => {
      expect(store.getState().products).to.be.an('array')
    })

    it('reduces on SET_PRODUCTS action', () => {
      const action = {type: 'SET_PRODUCTS', products}

      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()

      expect(newState.products).to.be.deep.equal(products)
      expect(newState.products).to.not.be.equal(prevState.products)
    })
  })
})
