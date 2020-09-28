import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  Cart,
  AllProducts,
  SingleProduct,
  AddProduct,
  Checkout,
  AllUsers,
  SingleUser,
  PostPurchase,
  EditProduct
} from './components'
import Home from './components/home'
import {me} from './store/user'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route path="/login" component={Login} />

        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/users" component={AllUsers} />
        <Route exact path="/products" component={AllProducts} />
        <Route exact path="/products/:id" component={SingleProduct} />
        <Route path="/addProduct" component={AddProduct} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/postPurchase" component={PostPurchase} />
        <Route path="/users" component={AllUsers} />
        <Route path="/users/:id" component={SingleUser} />
        <Route path="/products/edit/:id" component={EditProduct} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}

            <Route path="/userHome" component={UserHome} />
          </Switch>
        )}

        <Route component={Home} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    //     // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    //     // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
