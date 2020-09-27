import React from 'react'
import {connect} from 'react-redux'
import {makePurchase, fetchCartProducts} from '../store/cart'
import {me} from '../store/user'
import swal from 'sweetalert'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handlePurchase = this.handlePurchase.bind(this)
    this.calculateCost = this.calculateCost.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    await this.props.getCartProducts(this.props.user.id)
  }

  handlePurchase(event) {
    event.preventDefault()
    this.props.purchase(this.props.cart.id)
    this.props.history.replace('/postPurchase')
    swal({
      title: 'Hooray!',
      text: 'Your purchase has been completed!',
      icon: 'success'
    })
  }

  calculateCost() {
    let cost = 0
    this.props.cart.orderProducts.forEach(product => {
      cost = cost + product.totalPrice
    })
    return cost / 100
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <h2>Total cost: {this.calculateCost()}</h2>
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
