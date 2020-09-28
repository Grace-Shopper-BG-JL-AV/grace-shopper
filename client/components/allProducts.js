import React from 'react'
import {fetchProducts, addProductToDb, deleteProduct} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProduct from './Forms/addProduct'
import {add} from '../store/user'
import swal from 'sweetalert'
import {addToGuestCartInRedux} from '../store/cart'
import {fetchProduct} from '../store/singleProduct'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
      // price: '',
      // imageUrl: '',
      // size: '',
      // stars: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    //dispatch the redux thunk
    this.props.getProducts()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.add(this.state)

    swal({
      title: 'Great!',
      text: 'Your item has been added to the store!',
      icon: 'success'
    })

    this.setState({
      name: '',
      description: ''
      // price: '',
      // imageUrl: '',
      // size: '',
      // stars: '',
    })
  }

  async handleAddToCart(event) {
    let productId = Number(event.target.value)
    await this.props.getProduct(productId)
    const product = this.props.product

    if (this.props.user.id) {
      this.props.addToCart(this.props.user.id, productId)
    } else {
      this.props.addToGuestCart(product, productId)
    }

    swal({
      title: 'Hooray!',
      text: 'Your item has been added to your cart!',
      icon: 'success'
    })
  }

  render() {
    //store products in productsArr
    const productsArr = this.props.products
    return (
      <div>
        <div className="all-preview-container">
          {/* render the products created from the redux thunk */}
          {productsArr.map(product => {
            return (
              <div key={product.id} className="product-preview-container">
                <Link to={`/products/${product.id}`}>
                  <div className="artwork-preview-image">
                    <img
                      className="product-preview-image"
                      src={product.imageUrl}
                    />
                  </div>
                </Link>
                <div className="product-preview-text">
                  <h3 id="product">{product.name}</h3>
                  <p>{product.description}</p>
                  <h3>${product.price / 100}</h3>
                </div>
                {/* if the user is an admin, show the delete product button, otherwise show add to cart button */}
                {this.props.user.isAdmin ? (
                  <button
                    type="submit"
                    onClick={e => {
                      e.preventDefault()
                      this.props.delete(product.id)
                      swal({
                        title: 'Warning!',
                        text: 'Your item has been deleted from the store',
                        icon: 'warning'
                      })
                    }}
                  >
                    delete
                  </button>
                ) : (
                  <button
                    value={product.id}
                    onClick={this.handleAddToCart}
                    type="button"
                  >
                    Add to cart
                  </button>
                )}
              </div>
            )
          })}
          {this.props.user.isAdmin ? (
            <div className="addProduct">
              <AddProduct
                {...this.state}
                name={this.state.name}
                description={this.state.description}
                // price={this.state.price}
                // size={this.state.size}
                // stars={this.state.stars}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
              />
            </div>
          ) : (
            <div> </div>
          )}
        </div>
      </div>
    )
  }
}

//connect to redux store
const mapStateToProps = state => {
  console.log('product in state', state.product)
  return {
    products: state.products,
    user: state.user,
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    add: stateObj => dispatch(addProductToDb(stateObj)),
    delete: id => dispatch(deleteProduct(id)),
    addToCart: (userId, productId) => dispatch(add(userId, productId)),
    addToGuestCart: (product, productId) =>
      dispatch(addToGuestCartInRedux(product, productId)),
    getProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
