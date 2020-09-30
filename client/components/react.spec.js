import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts from './allProducts'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllProducts', () => {
  const mockState = {
    prods: [
      {id: 1, name: 'dog costume', description: 'cool'},
      {id: 2, name: 'costume', description: 'a costume'}
    ]
  }
  const mockStore = configureStore()
  const store = mockStore(mockState)

  let wrapper
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <AllProducts />
      </Provider>
    )
  })

  xit('renders the name and description', () => {
    expect(AllProducts.find('Product').length).to.be(2)
  })

  describe('all products test', function() {
    xit('renders description', function() {
      wrapper = shallow(<AllProducts />)
      const description = <p>cool</p>
      expect(wrapper.contains(description)).to.equal(true)
    })
  })
})
