import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AllUsers from './allUsers'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isLoggedIn, isAdmin} = props
  console.log('props', props)

  return isAdmin ? (
    <div>
      <h1>{`Welcome back, ${email}`}</h1>
      <h3>Here are all of Hallowoof's users:</h3>
      <AllUsers />

      <Link to="/products">View and add products to the store</Link>
      <Link to="/products/:id">Update a product</Link>
    </div>
  ) : (
    <div className="page-wrapper">
      <div className="row2">
        <div className="column2">
          {/* this is messed up... */}
          <h2>{`Welcome ${isLoggedIn ? `, ${email}` : `to Hallowoof`}`}</h2>
          <h3>Our Mission</h3>
        </div>
        <div className="column2">
          <div className="blue-column2">
            <p>
              Here at Hallowoof Costumes we strive to provide the funnest
              halloween costumes for your furry dog friend while also making a
              positive impact for these kind creatures by sending half the
              proceeds to local animal shelters. We have all costume tastes
              ranging from magical to downright spooky. Want to try out more of
              these costumes but don't have another special dog in your life? No
              worries! All our handsome dog models are also up for adoption at a
              pet adoption center near you. Contact us for more information.{' '}
            </p>
            <h3>
              <Link to="/products">Shop costumes</Link>
            </h3>
            <img src="https://www.dhresource.com/0x0/f2/albu/g6/M01/E4/44/rBVaSFuaE02AZ_wNAAGNJrvv_zI981.jpg/winter-dog-halloween-costume-christmas-dog.jpg" />
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
