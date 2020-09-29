import React from 'react'
import {connect} from 'react-redux'
import {me} from '../store/user'
import {fetchOrderHistory} from '../store/orderHistory'

class OrderHistory extends React.Component {
  async componentDidMount() {
    await this.props.getUser()
    await this.props.getHistory(this.props.user.id)
  }

  render() {
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
            <div />
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getHistory: userId => dispatch(fetchOrderHistory(userId)),
    getUser: () => dispatch(me())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
