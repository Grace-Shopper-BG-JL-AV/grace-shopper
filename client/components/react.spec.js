import {expect} from 'chai'
import {mount} from 'enzyme'
import React from 'react'
import AllProducts, {AllProducts as UnconnectedAllProducts} from './allProducts'
import mockAxios from '../mock-axios'
import waitForExpect from 'wait-for-expect'
import sinon from 'sinon'

describe('React specs', () => {
  const products = [
    {id: 1, name: 'dog costume', imageUrl: 'www.google.com'},
    {id: 2, name: 'another costume', imageUrl: 'www.google.com'}
  ]

  beforeEach(() => {
    // mockAxios ensures that when our client-side code requests data from the
    // server, the request is always successful (even if we haven't implemented)
    // our server yet.
    mockAxios.onGet('/api/products').replyOnce(200, products)
  })

  describe('<AllProducts /> component', () => {
    const getProductsSpy = sinon.spy()

    afterEach(() => {
      getProductsSpy.resetHistory()
    })

    it('renders the products passed in as props', () => {
      const wrapper = mount(
        <UnconnectedAllProducts
          products={products}
          getProducts={getProductsSpy}
        />
      )
      expect(wrapper.text()).to.include('dog costume')
      expect(wrapper.text()).to.include('another costume')
      // The test is expecting an image for each product, with src set to the
      // product's imageUrl
      const images = wrapper.find('img').map(node => node.get(0).props.src)
      expect(images).to.include.members(['www.google.com', 'www.google.com'])
    })

    // it('calls this.props.getProducts after mount', async () => {
    //   mount(
    //     <UnconnectedAllProducts
    //       products={products}
    //       getProducts={getProductsSpy}
    //     />
    //   )
    //   await waitForExpect(() => {
    //     expect(getProductsSpy).to.have.been.called
    //   })
    // })
  })
})
