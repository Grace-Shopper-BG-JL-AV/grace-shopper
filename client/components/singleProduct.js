import React from 'react'
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {fetchProduct, updateProduct} from '../store/singleProduct'
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
      text: 'You added a product to your cart!',
      icon: 'success'
    })
  }

  render() {
    //store product
    const singleProd = this.props.product

    return (
      <div>
        {/* render the product created from the redux thunk */}
        <h2>{singleProd.name}</h2>
        <h2>${singleProd.price / 100}</h2>
        <p>{singleProd.description}</p>
        <img src={singleProd.imageUrl} />
        <button
          value={singleProd.id}
          onClick={this.handleAddToCart}
          type="button"
        >
          Add to cart
        </button>

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
    addToCart: (userId, productId) => dispatch(add(userId, productId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
