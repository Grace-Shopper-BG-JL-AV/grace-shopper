import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render() {
    const cartProducts = this.props.cartProducts
    return (
      <div>
        <h1>Items in your cart:</h1>

        {cartProducts.length ? (
          cartProducts.map(product => {
            return (
              // added link to single product view
              <div key={product.id}>
                <h2>{product.name}</h2>
                <h3>${product.price}</h3>
                <p>{product.description}</p>
                <img src={product.imageUrl} />
              </div>
            )
          })
        ) : (
          <div>No items in your cart right now!</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartProducts: state.cart
  }
}

export default connect(mapStateToProps)(Cart)
