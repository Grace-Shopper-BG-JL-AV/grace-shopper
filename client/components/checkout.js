import React from 'react'
import {connect} from 'react-redux'
import {makePurchase, fetchCartProducts, makeGuestPurchase} from '../store/cart'
import {me} from '../store/user'
import swal from 'sweetalert'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handlePurchase = this.handlePurchase.bind(this)
    this.calculateCost = this.calculateCost.bind(this)
  }

  async componentDidMount() {
    if (this.props.user.id) {
      await this.props.getUser()
      await this.props.getCartProducts(this.props.user.id)
    }
  }

  handlePurchase(event) {
    event.preventDefault()

    if (this.props.cart.id) {
      this.props.purchase(this.props.cart.id, this.props.user.id)
    } else {
      this.props.guestPurchase()
    }
    
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
      <div className="cart">
        <h1>Checkout</h1>
        <h2>Total cost: {this.calculateCost()}</h2>
        <button
          onClick={this.handlePurchase}
          type="submit"
          className="checkoutButton"
        >
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
    purchase: (cartId, userId) => dispatch(makePurchase(cartId, userId)),
    getUser: () => dispatch(me()),
    getCartProducts: userId => dispatch(fetchCartProducts(userId)),
    guestPurchase: () => dispatch(makeGuestPurchase())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
