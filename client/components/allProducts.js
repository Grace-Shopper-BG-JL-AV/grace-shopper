import React from 'react'
import {fetchProducts, addProductToDb, deleteProduct} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProduct from './Forms/addProduct'
import {add} from '../store/user'
import {fetchProduct} from '../store/singleProduct'
import {addToGuestCartInRedux} from '../store/cart'

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
    //this.props.getGuestProducts()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.add(this.state) // do want this to happen
    this.setState({
      name: '',
      description: ''
      // price: '',
      // imageUrl: '',
      // size: '',
      // stars: '',
    })
  }
  //i am setting cart items here, not iterating thru them hereso just look at handleaddtocart
  async handleAddToCart(event) {
    let productId = Number(event.target.value)
    await this.props.getProduct(productId)
    const product = this.props.product
    console.log('PRODUCT', product)
    if (this.props.user.id) {
      console.log('hello User')
      this.props.addToCart(this.props.user.id, productId)
    } else {
      console.log('hello guest')

      this.props.addToGuestCart(product, productId)
    }
  }

  render() {
    //store products in productsArr
    const productsArr = this.props.products

    console.log('this.props.products', this.props.products)
    //console.log('this.props.products.orderProducts', this.props.products.orderProducts)

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
  console.log('products', state.products)
  return {
    products: state.products,
    user: state.user,
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()), //rendering
    add: stateObj => dispatch(addProductToDb(stateObj)), // for admin permissions
    delete: id => dispatch(deleteProduct(id)), //rendering
    addToCart: (userId, productId) => dispatch(add(userId, productId)),
    addToGuestCart: (product, productId) =>
      dispatch(addToGuestCartInRedux(product, productId)),
    //getGuestProducts: () => dispatch(fetchGuestProducts()),
    getProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
