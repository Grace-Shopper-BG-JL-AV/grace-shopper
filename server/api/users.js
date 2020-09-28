const router = require('express').Router()
const {User, Product} = require('../db/models')
const {Cart, OrderProducts} = require('../db/models/cart')
const isAdmin = require('../auth/apiRouteMiddleware')
const isUser = require('../auth/userMiddleware')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/cart', isUser, async (req, res, next) => {
  try {
    let id = req.params.userId
    const currentCart = await Cart.findOne({
      where: {
        userId: id,
        isActive: true
      },
      include: {
        model: OrderProducts,
        include: [Product]
      }
    })
    res.json(currentCart)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId/:productId/add', isUser, async (req, res, next) => {
  try {
    let userId = req.params.userId
    let productId = req.params.productId
    const currentUser = await User.findByPk(userId, {
      include: [Cart]
    })
    let currentCart = await Cart.findOrCreate({
      where: {
        userId: userId,
        isActive: true
      },
      include: [OrderProducts]
    })
    let currentProduct = await Product.findByPk(productId)

    let currentOrderProduct = await OrderProducts.findOne({
      where: {
        productId: productId,
        cartId: currentCart[0].dataValues.id
      }
    })
    if (currentOrderProduct) {
      let newQuantity = currentOrderProduct.quantity + 1
      await currentOrderProduct.update({quantity: newQuantity})
    } else {
      OrderProducts.create({
        price: currentProduct.price,
        cartId: currentCart[0].dataValues.id,
        productId: productId
      })
    }
    res.json(currentUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderProductsId', isUser, async (req, res, next) => {
  try {
    let order = await OrderProducts.findByPk(req.params.orderProductsId)
    await order.update(req.body)
    await order.save()
    let updatedCart = await Cart.findByPk(order.cartId, {
      include: {
        model: OrderProducts,
        include: [Product]
      }
    })
    res.json(updatedCart)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartId/:orderProductsId', isUser, async (req, res, next) => {
  try {
    let orderProducts = await OrderProducts.findByPk(req.params.orderProductsId)
    await orderProducts.destroy()
    await orderProducts.save()
    let cart = await Cart.findByPk(req.params.cartId, {
      include: {
        model: OrderProducts,
        include: [Product]
      }
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})

router.put('/:cartId/purchase', isUser, async (req, res, next) => {
  try {
    let cartId = req.params.cartId
    let currentCart = await Cart.findByPk(cartId, {
      include: {
        model: OrderProducts,
        include: [Product]
      }
    })
    await currentCart.update(req.body)
    await currentCart.save()
    res.send(currentCart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
