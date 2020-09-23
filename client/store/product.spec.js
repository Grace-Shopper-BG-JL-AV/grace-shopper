import {expect} from 'chai'
import {fetchProducts, setProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
import rootReducer from '../store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Redux Products', () => {
  const products = [
    {
      id: 1,
      name: 'Puppy Mermaid',
      description: 'This is the puppy mermaid costume.',
      price: 25,
      imageUrl:
        'https://media1.popsugar-assets.com/files/thumbor/SB70R-f3IPPLQIaFkfiJNXUklKw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/08/27/976/n/45222255/bdcfccc5d33228c3_91i-GqxdEpL._AC_UL640_QL65_/i/Ariel-Dog-Halloween-Costume.jpg',
      size: ['small', 'medium', 'large'],
      stars: []
    },
    {
      id: 2,
      name: 'Puppy Sunflower',
      description: 'This is the puppy sunflower costume.',
      price: 50.99,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/51tZYAEi6RL._AC_UX425_.jpg',
      size: ['small', 'medium', 'large'],
      stars: []
    }
  ]

  let store
  let mockAxios

  const initialState = {products: [], user: {}, product: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  it('setProducts action creator', () => {
    expect(setProducts(products)).to.deep.equal({
      type: 'SET_PRODUCTS',
      products
    })

    it('fetchProducts thunk creator returns a thunk that GETs /api/products', async () => {
      await store.dispatch(fetchProducts())
      const [getRequest] = mockAxios.history.get
      expect(getRequest.url).to.equal('/api/products')
      const actions = store.getActions()
      expect(actions[0].type).to.equal('SET_PRODUCTS')
      expect(actions[0].products).to.deep.equal(products)
    })
  })

  it('returns the initial state by default', () => {
    expect(store.getState().products).to.be.an('array')
  })

  //still working on this one...
  it('reduces on SET_PRODUCTS action', async () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(rootReducer)
    })
    // afterEach(() => {
    //   testStore = createStore(initialState)
    // })

    await testStore.dispatch(setProducts(products))
    await testStore.dispatch(fetchProducts())
    const newState = testStore.getState()

    expect(newState.products).to.be.deep.equal(products)
  })
})
