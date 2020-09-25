import React from 'react'
import {connect} from 'react-redux'
import {fetchCartProducts} from '../store/cart'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartProducts(this.props.user.id)
  }
  render() {
    const cartProducts = this.props.cart
    console.log('cartProducts: ', cartProducts)
    return (
      <div>
        <h1>Items in your cart:</h1>

        {cartProducts.length ? (
          cartProducts.map(product => {
            return (
              // added link to single product view
              <div key={product.id}>
                <h2>{product.name}</h2>
                <h3>${product.price / 100}</h3>
                <p>{product.description}</p>
                <img src={product.imageUrl} />
              </div>
            )
          })
        ) : (
          <div>No items in your cart right now!</div>
        )}
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
    getCartProducts: userId => dispatch(fetchCartProducts(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
