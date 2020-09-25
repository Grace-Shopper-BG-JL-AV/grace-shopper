import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store/user'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Hallowoof Costumes</h1>
    <nav className="text-link">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {/* {isAdmin ? (
            <div>
              <Link to="/allUsers">User Information</Link>
              <Link to="/editProduct">Edit Products</Link>
              <Link to="/addProduct">Add Products</Link>
            </div>
          ) : (
            <div>{null}</div>
          )} */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      )}
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/products">Costumes</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
