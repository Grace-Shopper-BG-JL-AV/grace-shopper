import React from 'react'
import {connect} from 'react-redux'
import {addToCart} from '../store/cart'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  constructor() {
    super()
    //this.handleAddToCart = this.handleAddToCart.bind(this)
  }
  componentDidMount() {
    //dispatch the redux thunk
    const num = Number(this.props.match.params.id)

    this.props.getProduct(num)
  }

  // handleAddToCart(productId) {
  //   this.props.addToCart(productId)
  // }

  render() {
    //store product
    const singleProd = this.props.product

    return (
      <div>
        {/* render the product created from the redux thunk */}
        <h2>{singleProd.name}</h2>
        <h2>${singleProd.price}</h2>
        <p>{singleProd.description}</p>
        <img src={singleProd.imageUrl} />
        <button
          // onClick={() => this.handleAddToCart(singleProd.id)}
          type="button"
        >
          Add to Cart
        </button>
      </div>
    )
  }
}

//connect to redux store
const mapStateToProps = state => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id))
    // addToCart: (productId) => dispatch(addToCart(productId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
