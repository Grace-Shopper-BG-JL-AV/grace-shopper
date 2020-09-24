import React from 'react'
import {connect} from 'react-redux'
import {fetchProduct, updateProduct} from '../store/singleProduct'
import EditProduct from './Forms/editProduct'

class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    this.setState({
      name: '',
      description: ''
    })
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

        {/* ***need to add permissions for only admin */}
        <EditProduct
          {...this.state}
          name={this.state.name}
          description={this.state.description}
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
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id)),
    updateProduct: (id, stateObj) => dispatch(updateProduct(id, stateObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
