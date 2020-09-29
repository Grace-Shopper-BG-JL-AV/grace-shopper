import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCartProducts,
  setStorageCartProducts,
  updateQuantity,
  deleteProducts,
  deleteStorageProducts,
  updateGuestCartQuantity
} from '../store/cart'
import {Link} from 'react-router-dom'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    if (this.props.user.id) {
      await this.props.getCartProducts(this.props.user.id)
    } else {
      const storageProducts = localStorage.getItem('storageProducts')
      this.props.setStorageCartProducts(JSON.parse(storageProducts))
    }
  }

  handleChange(event, productId) {
    let newQuantity = Number(event.target.value)

    if (this.props.user.id) {
      this.props.changeCartQuantity(Number(event.target.id), newQuantity, this.props.user.id)
    } else {
      this.props.changeGuestCartQuantity(newQuantity, productId)
    }
  }

  async handleRemove(event) {
    event.preventDefault()
    let orderId = Number(event.target.id)
    let cartId = this.props.cart.id

    if (cartId) {
      await this.props.deleteProducts(cartId, orderId, this.props.user.id)
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
      <div className="cart">
        <h1>Items in your cart:</h1>

        {cartProducts && cartProducts.length ? (
          <Link to="/checkout">
            <button type="submit" className="checkoutButton">
              Checkout!
            </button>
          </Link>
        ) : (
          <div>No items in your cart right now!</div>
        )}
        <div id="cart">
          {cartProducts && cartProducts.length ? (
            cartProducts.map(product => {
              return (
                // added link to single product view
                <div key={product.id} className="cart-preview-container">
                  <Link to={`/products/${product.id}`}>
                    <div className="cart-preview-image">
                      <img
                        className="cart-preview-image"
                        src={product.product.imageUrl}
                      />
                    </div>
                  </Link>
                  <div className="product-preview-text">
                    <h3 id="product">{product.product.name}</h3>
                    <p>{product.product.description}</p>

                    <p>Total Price: ${product.totalPrice / 100}</p>
                    <select
                      id={product.id}
                      label="Quantity: "
                    onChange={event => this.handleChange(event, product.id)}
                    >
                      <option defaultValue={product.quantity}>
                        {product.quantity}
                      </option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                    </select>
                  </div>

                  <button
                    className="remove-button"
                    id={product.id}
                    onClick={this.handleRemove}
                    type="submit"
                  >
                    Remove this item from cart
                  </button>
                </div>
              )
            })
          ) : (
            <div />
          )}
        </div>
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
    changeCartQuantity: (orderProductId, newQuantity, userId) =>
      dispatch(updateQuantity(orderProductId, newQuantity, userId)),
    deleteProducts: (cartId, orderProductId, userId) => {
      dispatch(deleteProducts(cartId, orderProductId, userId))
    },
    deleteStorageProducts: orderId => {
      dispatch(deleteStorageProducts(orderId))
    },
    changeGuestCartQuantity: (newQuantity, productId) =>
      dispatch(updateGuestCartQuantity(newQuantity, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
