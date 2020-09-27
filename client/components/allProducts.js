import React from 'react'
import {fetchProducts, addProductToDb, deleteProduct} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddProduct from './Forms/addProduct'
import {add} from '../store/user'
import swal from 'sweetalert'

class AllProducts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      activePage: 1,
      productsPerPage: 20
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
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
    })
  }

  //pagination: change the active page number
  handlePageChange(event) {
    this.setState({
      activePage: Number(event.target.id)
    })
  }

  handleAddToCart(event) {
    let productId = Number(event.target.value)
    this.props.addToCart(this.props.user.id, productId)
    swal({
      title: 'Hooray!',
      text: 'Your item has been added to your cart!',
      icon: 'success'
    })
  }

  render() {
    //store products in productsArr
    const productsArr = this.props.products
    //pagination
    const {activePage, productsPerPage} = this.state
    const indexLastProd = activePage * productsPerPage
    const indexFirstProd = indexLastProd - productsPerPage
    const currentProducts = productsArr.slice(indexFirstProd, indexLastProd)
    const renderProducts = currentProducts.map(product => {
      return (
        <div key={product.id} className="product-preview-container">
          <Link to={`/products/${product.id}`}>
            <div className="artwork-preview-image">
              <img className="product-preview-image" src={product.imageUrl} />
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
    })

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(productsArr.length / productsPerPage); i++) {
      pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          key={number}
          id={number}
          type="button"
          onClick={this.handlePageChange}
        >
          {number}
        </button>
      )
    })

    return (
      <div>
        {/* pagination */}
        <ul id="page-numbers">{renderPageNumbers}</ul>
        <div className="all-preview-container">
          {renderProducts}

          {this.props.user.isAdmin ? (
            <div className="addProduct">
              <AddProduct
                {...this.state}
                name={this.state.name}
                description={this.state.description}
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
