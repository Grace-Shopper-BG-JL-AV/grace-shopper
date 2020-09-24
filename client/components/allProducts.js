import React from 'react'

import {fetchProducts, addProductToDb, deleteProduct} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProduct from './Forms/addProduct'

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

              <button
                type="submit"
                onClick={e => {
                  e.preventDefault()
                  this.props.delete(product.id)
                }}
              >
                x
              </button>
            </Link>
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
    getProducts: () => dispatch(fetchProducts()),
    add: stateObj => dispatch(addProductToDb(stateObj)),
    delete: id => dispatch(deleteProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
