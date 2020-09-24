/* global describe beforeEach it */

const chai = require('chai')
const expect = chai.expect
const db = require('../index')
const Cart = db.model('cart')
const OrderProducts = db.model('orderProduct')
const Product = db.model('product')
const User = db.model('user')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Order Products', () => {
    let orderProduct
    let product
    beforeEach(async () => {
      product = await Product.create({
        name: 'Puppy Pope',
        description: 'This is the puppy pope.',
        price: 1000
      })
      orderProduct = await OrderProducts.create({
        price: product.price,
        quantity: 2
      })
    })
    it('orderProducts total price calculates correctly', () => {
      expect(orderProduct.totalPrice).to.equal(2000)
    })
  })
  describe('Magic Methods', () => {
    let newCart
    let newOrderProduct
    let newProduct
    let user
    beforeEach(async () => {
      newProduct = await Product.create({
        name: 'Puppy Pope',
        description: 'This is the puppy pope.',
        price: 1000
      })
      newCart = await Cart.create({})
      newOrderProduct = await OrderProducts.create({
        price: newProduct.price,
        quantity: 2
      })
      user = await User.create({
        email: 'nonsense@nonsense',
        password: 'nonsense',
        firstName: 'idk',
        lastName: 'tbd'
      })
    })
    it('User can add cart', async () => {
      await user.addCart(newCart)
      let id = user.id
      let userWithCart = await User.findByPk(id, {
        include: [Cart]
      })
      expect(userWithCart.carts.length).to.equal(1)
    })
    it('Cart can add orderProduct', async () => {
      await newCart.addOrderProduct(newOrderProduct)
      let id = newCart.id
      let cartWithOrders = await Cart.findByPk(id, {
        include: [OrderProducts]
      })
      expect(cartWithOrders.orderProducts.length).to.equal(1)
    })
  })
  // end describe('Product model')
})
