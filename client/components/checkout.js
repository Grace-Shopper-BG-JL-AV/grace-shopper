import React from 'react'
import {connect} from 'react-redux'
import {makePurchase, fetchCartProducts} from '../store/cart'
import {me} from '../store/user'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handlePurchase = this.handlePurchase.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCartProducts(this.props.user.id)
  }

  handlePurchase(event) {
    event.preventDefault()
    this.props.purchase(this.props.cart.id)
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <button onClick={this.handlePurchase} type="button">
          Purchase
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    purchase: cartId => dispatch(makePurchase(cartId)),
    getUser: () => dispatch(me()),
    getCartProducts: userId => dispatch(fetchCartProducts(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
