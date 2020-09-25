const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  }
})

const OrderProducts = db.define('orderProduct', {
  price: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTEGER,
    //tbd!
    defaultValue: 1
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    get() {
      return this.price * this.quantity
    }
  }
})

module.exports = {
  Cart,
  OrderProducts
}
