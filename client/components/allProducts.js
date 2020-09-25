import React from 'react'
import {
  fetchProducts,
  addProductToDb,
  deleteProduct,
  fetchGuestProducts
} from '../store/product'
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
    // this.props.getGuestProducts()
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.props.user.id) {
      this.props.add(this.state)
    } else {
      sessionStorage.setItem('')
    }
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

    return (
      <div className="page-wrapper">
        <div className="row">
          {/* render the products created from the redux thunk */}
          {productsArr.map(product => {
            return (
              <div key={product.id} className="column">
                <Link to={`/products/${product.id}`}>
                  <h2 id="product">{product.name}</h2>
                </Link>
                <h3>${product.price / 100}</h3>
                <p>{product.description}</p>
                <img src={product.imageUrl} />

                <button
                  type="submit"
                  onClick={e => {
                    e.preventDefault()
                    this.props.delete(product.id)
                  }}
                >
                  x
                </button>

                <button
                  value={product.id}
                  onClick={this.handleAddToCart}
                  type="button"
                >
                  Add to cart
                </button>
              </div>
            )
          })}

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
    //getGuestProducts: () => dispatch(fetchGuestProducts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
