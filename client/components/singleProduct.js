import React from 'react'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {fetchProduct, updateProduct} from '../store/singleProduct'
import EditProduct from './editProduct'
import {add} from '../store/user'
import {
  addToGuestCartInRedux,
  updateGuestCartQuantity,
  setStorageCartProducts
} from '../store/cart'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    //dispatch the redux thunk
    const num = Number(this.props.match.params.id)
    this.props.getProduct(num)
    if (!this.props.user.id) {
      const storageProducts = localStorage.getItem('storageProducts')
      this.props.setStorageCartProducts(JSON.parse(storageProducts))
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const num = Number(this.props.match.params.id)
    this.props.updateProduct(num, this.state)
    swal({
      title: 'Awesome!',
      text: 'Your item has been updated in the store',
      icon: 'success'
    })
    this.setState({
      name: '',
      description: ''
    })
  }

  async handleAddToCart(event) {
    let productId = Number(event.target.value)
    await this.props.getProduct(productId)
    const product = this.props.product
    if (this.props.user.id) {
      this.props.addToCart(this.props.user.id, productId)
    } else {
      let current = {}
      if (this.props.cart) {
        this.props.cart.orderProducts.forEach(orderProduct => {
          if (orderProduct.id === productId) {
            current = orderProduct
          }
        })
      }
      if (!current.id) {
        this.props.addToGuestCart(product, productId)
      } else {
        this.props.changeGuestCartQuantity(
          current.quantity + 1,
          current.product.id
        )
      }
    }
    swal({
      title: 'Hooray!',
      text: 'Your item has been added to your cart!',
      icon: 'success'
    })
  }

  render() {
    //store product
    const singleProd = this.props.product

    if (singleProd) {
      return (
        <div id="single-prod">
          <div className="single-prod-container">
            {/* render the product created from the redux thunk */}
            <div className="product-preview-image">
              <img
                className="product-preview-image"
                src={singleProd.imageUrl}
              />
            </div>

            <div className="product-preview-text">
              <h3>{singleProd.name}</h3>

              <p>{singleProd.description}</p>
              <h3>${singleProd.price / 100}</h3>
            </div>

            {/* if the user is an admin, show the delete product button, otherwise show add to cart button */}
            {this.props.user.isAdmin ? (
              <div />
            ) : (
              <button
                value={singleProd.id}
                onClick={this.handleAddToCart}
                type="submit"
              >
                Add to cart
              </button>
            )}

            {/* if you're an admin you can edit a product */}
            {this.props.user.isAdmin ? (
              <EditProduct
                {...this.state}
                name={this.state.name}
                description={this.state.description}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      )
    } else return <h1>Not Found!</h1>
  }
}

//connect to redux store
const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id)),
    updateProduct: (id, stateObj) => dispatch(updateProduct(id, stateObj)),
    addToCart: (userId, productId) => dispatch(add(userId, productId)),
    addToGuestCart: (product, productId) =>
      dispatch(addToGuestCartInRedux(product, productId)),
    changeGuestCartQuantity: (newQuantity, productId) =>
      dispatch(updateGuestCartQuantity(newQuantity, productId)),
    setStorageCartProducts: storageProducts =>
      dispatch(setStorageCartProducts(storageProducts))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
