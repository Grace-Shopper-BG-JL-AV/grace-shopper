import React from 'react'
import {fetchProducts} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {}
  // }

  componentDidMount() {
    //dispatch the redux thunk
    this.props.getProducts()
  }

  render() {
    //store products in productsArr
    const productsArr = this.props.products

    return (
      <div>
        {/* render the products created from the redux thunk */}
        {productsArr.map(product => {
          return (
            // added link to single product view
            <Link to={`/products/${product.id}`} key={product.id}>
              <h2>{product.name}</h2>
              <h3>${product.price}</h3>
              <p>{product.description}</p>
              <img src={product.imageUrl} />
            </Link>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
