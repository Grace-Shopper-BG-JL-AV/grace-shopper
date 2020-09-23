import {expect} from 'chai'
import React from 'react'
import AllProducts from './allProducts'
// import mockAxios from '../mock-axios'
// import waitForExpect from 'wait-for-expect'
import sinon from 'sinon'
import {JSDOM} from 'jsdom'
import {mount, render, shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Routes from '../routes'
import {Route} from 'react-router-dom'

// describe('All Products', () => {
//   it('should render the all products page', () => {
//     const wrapper = shallow(<Routes />)
//     expect(
//       wrapper.find(<Route path="/products" component={AllProducts} />)
//     ).to.have.length(1)
//   })

//   it('calls componentDidMount', () => {
//     sinon.spy(AllProducts.prototype, 'componentDidMount')
//     const wrapper = mount(<allProducts />)
//     expect(AllProducts.prototype.componentDidMount.calledOnce).to.equal(true)
//   })
// })
