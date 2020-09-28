import React from 'react'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {fetchProduct, updateProduct} from '../store/singleProduct'
import {deleteProduct} from '../store/product'
import EditProduct from './Forms/editProduct'
import {add} from '../store/user'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  componentDidMount() {
    //dispatch the redux thunk
    const num = Number(this.props.match.params.id)
    this.props.getProduct(num)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const num = Number(this.props.match.params.id)
    this.props.updateProduct(num, this.state)
    swal({
      title: 'Awesome!',
      text: 'Your item has been updated in the store',
      icon: 'success'
    })
    this.setState({
      name: '',
      description: ''
    })
  }

  async handleAddToCart(event) {
    let productId = Number(event.target.value)
    await this.props.addToCart(this.props.user.id, productId)
    swal({
      title: 'Hooray!',
      text: 'Your item has been added to your cart!',
      icon: 'success'
    })
  }

  render() {
    //store product
    const singleProd = this.props.product

    return (
      <div className="product-preview-container">
        {/* render the product created from the redux thunk */}
        <div className="product-preview-image">
          <img className="product-preview-image" src={singleProd.imageUrl} />
        </div>

        <div className="product-preview-text">
          <h3>{singleProd.name}</h3>

          <p>{singleProd.description}</p>
          <h3>${singleProd.price / 100}</h3>
        </div>

        {/* if the user is an admin, show the delete product button, otherwise show add to cart button */}
        {this.props.user.isAdmin ? (
          <button
            type="submit"
            onClick={e => {
              e.preventDefault()
              this.props.delete(singleProd.id)
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
            value={singleProd.id}
            onClick={this.handleAddToCart}
            type="submit"
          >
            Add to cart
          </button>
        )}

        {/* if you're an admin you can edit a product */}
        {this.props.user.isAdmin ? (
          <EditProduct
            {...this.state}
            name={this.state.name}
            description={this.state.description}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        ) : (
          <div> </div>
        )}
      </div>
    )
  }
}

//connect to redux store
const mapStateToProps = state => {
  return {
    product: state.product,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id)),
    updateProduct: (id, stateObj) => dispatch(updateProduct(id, stateObj)),
    delete: id => dispatch(deleteProduct(id)),
    addToCart: (userId, productId) => dispatch(add(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
