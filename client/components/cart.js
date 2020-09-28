import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCartProducts,
  setStorageCartProducts,
  updateQuantity,
  deleteProducts,
  deleteStorageProducts
} from '../store/cart'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.getCartProducts(this.props.user.id)
      this.props.getUser()
    } else {
      const storageProducts = localStorage.getItem('storageProducts')
      if (storageProducts) {
        this.props.setStorageCartProducts(JSON.parse(storageProducts))
      }
    }
  }

  handleChange(event) {
    let newQuantity = Number(event.target.value)
    this.props.changeCartQuantity(Number(event.target.id), newQuantity)
  }

  async handleRemove(event) {
    event.preventDefault()
    let orderId = Number(event.target.id)
    let cartId = this.props.cart.id

    if (cartId) {
      await this.props.deleteProducts(cartId, orderId)
    } else {
      this.props.deleteStorageProducts(orderId)
    }
  }

  render() {
    let cartProducts
    if (this.props.cart) {
      cartProducts = this.props.cart.orderProducts || []
    }

    return (
      <div>
        <h1>Items in your cart:</h1>
        {cartProducts ? (
          <Link to="/checkout">
            <button type="button">Checkout!</button>
          </Link>
        ) : (
          <div>No items in your cart right now!</div>
        )}
        {cartProducts ? (
          cartProducts.map(product => {
            console.log('product in map', product)
            return (
              // added link to single product view
              <div key={product.id}>
                <h2>{product.product.name}</h2>
                <p>Total Price: ${product.totalPrice / 100}</p>
                <select
                  id={product.id}
                  label="Quantity: "
                  onChange={this.handleChange}
                >
                  <option selected>{product.quantity}</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
                <p>{product.product.description}</p>
                <img src={product.product.imageUrl} />
                <button
                  id={product.id}
                  onClick={this.handleRemove}
                  type="button"
                >
                  Remove all from cart!
                </button>
              </div>
            )
          })
        ) : (
          <div />
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
    setStorageCartProducts: storageProducts =>
      dispatch(setStorageCartProducts(storageProducts)),
    changeCartQuantity: (orderProductId, newQuantity) =>
      dispatch(updateQuantity(orderProductId, newQuantity)),
    deleteProducts: (cartId, orderProductId) => {
      dispatch(deleteProducts(cartId, orderProductId))
    },
    deleteStorageProducts: orderId => {
      dispatch(deleteStorageProducts(orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
