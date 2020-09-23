import React from 'react'
import {fetchProducts} from '../store/product'
//import {addToCart} from '../store/cart'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  constructor() {
    super()
    //this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    //dispatch the redux thunk
    this.props.getProducts()
  }

  // handleAddToCart(productId) {
  //   this.props.addToCart(productId)
  // }

  render() {
    //store products in productsArr
    const productsArr = this.props.products

    return (
      <div>
        {/* render the products created from the redux thunk */}
        {productsArr.map(product => {
          return (
            // added link to single product view
            <div key={product.id}>
              <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
                <h3>${product.price / 100}</h3>
                <p>{product.description}</p>
                <img src={product.imageUrl} />
              </Link>
              <button
                // onClick={() => this.handleAddToCart(product.id)}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

//connect to redux store
const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts())
    // addToCart: (productId) => dispatch(addToCart(productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
