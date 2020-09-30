/* global describe beforeEach */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome firstName="Betsy" />)
  })

  xit('renders the email in an h2', () => {
    expect(userHome.find('h2').text()).to.be.equal('Welcome back, Betsy')
  })
})
