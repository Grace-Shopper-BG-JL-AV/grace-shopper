import React from 'react'
import {fetchProducts} from '../store/product'
import {connect} from 'react-dom'

export class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    //dispatch the redux thunk
    this.props.getProducts()
  }

  render() {
    //store products in productsArr
    const productsArr = this.props.products

    return (
      <div>
        <h1>Hello World!</h1>
        {/* render the products created from the redux thunk */}
        {productsArr.map(product => {
          return (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <img src={product.imgUrl} />
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
