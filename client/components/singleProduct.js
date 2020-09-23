import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct} from '../store/singleProduct'

class SingleProduct extends React.Component {
  componentDidMount() {
    //dispatch the redux thunk
    const num = Number(this.props.match.params.id)

    this.props.getProduct(num)
  }

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
        <button type="button">Add to Cart</button>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
