import React from 'react'
import {fetchProducts, addProductToDb, deleteProduct} from '../store/product'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProduct from './Forms/addProduct'
import {add} from '../store/user'

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
    this.setState({
      name: '',
      description: ''
      // price: '',
      // imageUrl: '',
      // size: '',
      // stars: '',
    })
  }

  handleAddToCart(event) {
    let productId = Number(event.target.value)
    this.props.addToCart(this.props.user.id, productId)
  }

  render() {
    //store products in productsArr
    const productsArr = this.props.products
    console.log('user', this.props)

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
  return {
    products: state.products,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    add: stateObj => dispatch(addProductToDb(stateObj)),
    delete: id => dispatch(deleteProduct(id)),
    addToCart: (userId, productId) => dispatch(add(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
