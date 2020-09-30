import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import AllProducts from './allProducts'

const adapter = new Adapter()
enzyme.configure({adapter})

//still fixing this one...
describe('AllProducts', () => {
  const prods = [
    {id: 1, name: 'dog costume', description: 'cool'},
    {id: 2, name: 'costume', description: 'a costume'}
  ]

  let allProducts

  beforeEach(() => {
    allProducts = shallow(<AllProducts products={prods} />)
  })

  xit('renders the name and description', () => {
    expect(allProducts.find('Product').length).to.be(2)
  })
})
