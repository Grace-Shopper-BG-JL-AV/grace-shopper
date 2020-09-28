import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AllUsers from './allUsers'
import {updateUser} from '../store/user'
import swal from 'sweetalert'

/**
 * COMPONENT
 */

class UserHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      imageUrl: '',
      email: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const num = this.props.id
    this.props.updateUser(num, this.state)
    swal({
      title: 'Awesome!',
      text: 'Your info has been updated!',
      icon: 'success'
    })
    this.setState({
      firstName: '',
      lastName: '',
      imageUrl: '',
      email: ''
    })
  }

  render() {
    const {email, firstName, lastName, imageUrl, isAdmin} = this.props
    console.log(this.props)

    return isAdmin ? (
      <div className="allUsers">
        <h2>{`Welcome back, ${firstName} ${lastName}`}</h2>
        <img src={imageUrl} />

        <Link to="/products">View and add products to the store</Link>

        <Link to="/products/:id">Update a product</Link>

        <h3>Here are all of Hallowoof's users:</h3>
        <AllUsers />
      </div>
    ) : (
      <div className="allUsers">
        <h2>{`Welcome back, ${firstName} ${lastName}`}</h2>
        <img src={imageUrl} />
        <h3>
          <Link to="/products">Shop costumes</Link>
        </h3>

        <h2>Edit Info</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            name="firstName"
            type="text"
            value={this.state.firstName}
            onChange={this.handleChange}
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            name="lastName"
            type="text"
            value={this.state.lastName}
            onChange={this.handleChange}
          />

          <label htmlFor="imageUrl">imageUrl:</label>
          <input
            name="imageUrl"
            type="text"
            value={this.state.imageUrl}
            onChange={this.handleChange}
          />

          <label htmlFor="email">E-mail:</label>
          <input
            name="email"
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <button type="submit">Update Info</button>
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    imageUrl: state.user.imageUrl
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: (id, stateObj) => dispatch(updateUser(id, stateObj))
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
