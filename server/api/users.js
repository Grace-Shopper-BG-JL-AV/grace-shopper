const router = require('express').Router()
const {User, Product} = require('../db/models')
const {Cart, OrderProducts} = require('../db/models/cart')

router.get('/', async (req, res, next) => {
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

router.put('/:userId/:productId/add', async (req, res, next) => {
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
    console.log('currentOrderProduct: ', currentOrderProduct)
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

// router.put('/:id/remove', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.id, {
//       include: [Cart],
//     })
//     res.json(user)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:id/cart', async (req, res, next) => {
  try {
    let id = req.params.id
    const currentCart = await Cart.findOne({
      where: {
        userId: id,
        isActive: true
      }
    })
    const orderProducts = await OrderProducts.findAll({
      where: {
        cartId: currentCart.id
      },
      include: [Product]
    })
    res.json(orderProducts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
