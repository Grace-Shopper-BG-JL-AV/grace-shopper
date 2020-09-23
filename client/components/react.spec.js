import {expect} from 'chai'
import {mount} from 'enzyme'
import React from 'react'
import {AllProducts as UnconnectedAllProducts} from './allProducts'
// import mockAxios from '../mock-axios'
// import waitForExpect from 'wait-for-expect'
import sinon from 'sinon'

describe('React specs', () => {
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
  })
})
