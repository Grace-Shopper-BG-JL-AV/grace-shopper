import React from 'react'
import {connect} from 'react-redux'
import {
  fetchCartProducts,
  setStorageCartProducts,
  updateQuantity,
  deleteProducts
} from '../store/cart'
import {Link} from 'react-router-dom'
import {me} from '../store/user'
import swal from 'sweetalert'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  async componentDidMount() {
    await this.props.getUser()
    console.log('user id: ', this.props.user.id)
    if (this.props.user.id) {
      await this.props.getCartProducts(this.props.user.id)
    } else {
      const storageProducts = localStorage.getItem('storageProducts') //storageroducst would be obj
      if (storageProducts) {
        this.props.setStorageCartProducts(JSON.parse(storageProducts))
      }
    }
  }

  handleChange(event) {
    let newQuantity = Number(event.target.value)
    this.props.changeCartQuantity(
      Number(event.target.id),
      newQuantity,
      this.props.user.id
    )
  }

  async handleRemove(event) {
    event.preventDefault()
    let orderId = Number(event.target.id)
    console.log('cart: ', this.props.cart)
    let cartId = this.props.cart.id
    console.log('userId: ', this.props.userId)
    await this.props.deleteProducts(cartId, orderId, this.props.user.id)
    // swal({
    //   title: 'Warning!',
    //   text: 'Your items have been deleted from your cart',
    //   icon: 'warning',
    // })
  }

  render() {
    let cartProducts
    if (this.props.cart) {
      cartProducts = this.props.cart.orderProducts || []
    } else {
      cartProducts = []
    }

    return (
      <div className="cart">
        <h1>Items in your cart:</h1>
        {cartProducts.length ? (
          <Link to="/checkout">
            <button type="submit" className="checkoutButton">
              Checkout!
            </button>
          </Link>
        ) : (
          <div>No items in your cart right now!</div>
        )}
        {cartProducts.length ? (
          cartProducts.map(product => {
            console.log('product in map', product)
            return (
              // added link to single product view
              <div key={product.id} className="product-preview-container">
                <Link to={`/products/${product.id}`}>
                  <div className="product-preview-image">
                    <img
                      src={product.product.imageUrl}
                      className="product-preview-image"
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
                    onChange={this.handleChange}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
