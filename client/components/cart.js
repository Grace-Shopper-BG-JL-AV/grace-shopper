import React from 'react'
import {connect} from 'react-redux'
import {fetchCartProducts, fetchStorageCartProducts} from '../store/cart'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: this.props.user.id
    }
  }
  componentDidMount() {
    if (this.state.userId) {
      this.props.getCartProducts(this.state.userId)
      this.props.getUser()
    } else {
      const storedProducts = sessionStorage.getItem('products')
      this.props.getStorageCartProducts(JSON.parse(storedProducts))
    }
  }

  render() {
    const cartProducts = this.props.cart || []
    console.log('cartProducts: ', cartProducts)
    return (
      <div>
        <h1>Items in your cart:</h1>

        {cartProducts.length ? (
          cartProducts.map(product => {
            return (
              // added link to single product view
              <div key={product.id}>
                <h2>{product.product.name}</h2>
                <p>
                  Total Price: $
                  {product.product.price / 100 * product.quantity}
                </p>
                <p>Quantity: {product.quantity}</p>
                <p>{product.product.description}</p>
                <img src={product.product.imageUrl} />
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
    getCartProducts: userId => dispatch(fetchCartProducts(userId)),
    getUser: () => dispatch(me()),
    getStorageCartProducts: storedProducts =>
      dispatch(fetchStorageCartProducts(storedProducts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
