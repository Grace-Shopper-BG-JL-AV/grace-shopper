import React from 'react'
import {fetchProducts, addProductToDb, deleteProduct} from '../store/product'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {add, me} from '../store/user'
import AddProduct from './addProduct'
import swal from 'sweetalert'
import {
  addToGuestCartInRedux,
  updateGuestCartQuantity,
  setStorageCartProducts,
  fetchCartProducts
} from '../store/cart'
import {fetchProduct} from '../store/singleProduct'

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

  async componentDidMount() {
    //dispatch the redux thunk
    await this.props.getProducts()
    await this.props.getUser()
    if (this.props.user.id) {
      await this.props.getCartProducts(this.props.user.id)
    } else {
      const storageProducts = localStorage.getItem('storageProducts')
      this.props.setStorageCartProducts(JSON.parse(storageProducts))
    }
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

  async handleAddToCart(event) {
    let productId = Number(event.target.value)
    await this.props.getProduct(productId)
    const product = this.props.product
    if (this.props.user.id) {
      this.props.addToCart(this.props.user.id, productId)
    } else {
      let current = {}
      if (this.props.cart) {
        this.props.cart.orderProducts.forEach(orderProduct => {
          if (orderProduct.id === productId) {
            current = orderProduct
          }
        })
      }
      if (!current.id) {
        this.props.addToGuestCart(product, productId)
      } else {
        this.props.changeGuestCartQuantity(
          current.quantity + 1,
          current.product.id
        )
      }
    }

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
            <div className="product-preview-image">
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
              type="submit"
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
        {/* this next div is rendering the all products code from above */}
        <div className="all-preview-container">
          {renderProducts}
          {/* pagination again so it displays again at the bottom too */}
          <ul id="page-numbers">{renderPageNumbers}</ul>

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
    user: state.user,
    product: state.product,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(fetchProducts()),
    add: stateObj => dispatch(addProductToDb(stateObj)),
    delete: id => dispatch(deleteProduct(id)),
    addToCart: (userId, productId) => dispatch(add(userId, productId)),
    addToGuestCart: (product, productId) =>
      dispatch(addToGuestCartInRedux(product, productId)),
    getProduct: productId => dispatch(fetchProduct(productId)),
    getUser: () => dispatch(me()),
    changeGuestCartQuantity: (newQuantity, productId) =>
      dispatch(updateGuestCartQuantity(newQuantity, productId)),
    setStorageCartProducts: storageProducts =>
      dispatch(setStorageCartProducts(storageProducts)),
    getCartProducts: userId => dispatch(fetchCartProducts(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
