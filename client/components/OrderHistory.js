import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchOrderHistory} from '../store/orderHistory'
import {fetchCartProducts} from '../store/cart'

class OrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    //await this.props.getCartProducts(this.props.user.id)
    await this.props.getHistory(this.props.user.id)
  }

  render() {
    console.log(this.props.orders)
    return (
      <div className="cart">
        <h1>Here is your order history!</h1>
        <div>
          {this.props.orders.length ? (
            this.props.orders.map(order => {
              return (
                <div id="orderHistory" key={order.id}>
                  <h3>Order Id: {order.id}</h3>
                  {order.orderProducts.map(product => {
                    console.log('product: ', product)
                    return (
                      <div key={product.id}>
                        <p>Name: {product.product.name}</p>
                        <p>Quantity: {product.quantity}</p>
                        <p>
                          Price:{' '}
                          {product.quantity * product.product.price / 100}
                        </p>
                      </div>
                    )
                  })}
                </div>
              )
            })
          ) : (
            <div>
              <h2>You have no order history yet!</h2>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartProducts: userId => dispatch(fetchCartProducts(userId)),
    getHistory: userId => dispatch(fetchOrderHistory(userId)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
