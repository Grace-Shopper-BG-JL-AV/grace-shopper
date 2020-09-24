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
    const currentUser = User.findByPk(userId, {
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

    let currentOrderProduct = await OrderProducts.findOrCreate({
      where: {
        productId: productId,
        price: currentProduct.price,
        cartId: currentCart[0].dataValues.id
      }
    })
    await currentOrderProduct.increment('quantity', {by: 1})
    await currentOrderProduct.save()

    // let currentProduct = Product.findByPk(productId)

    // let currentOrderProducts = currentCart.dataValues.orderProducts
    // currentOrderProducts.forEach((orderProduct) => {
    //   if (
    //     orderProduct.productId === productId &&
    //     orderProduct.cartId === currentCart.id
    //   ) {
    //     let newQuantity = orderProduct.quantity + 1
    //     orderProduct.update({quantity: newQuantity})
    //   } else {
    //     currentCart.addOrderProduct(currentProduct)
    //   }
    // })
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

module.exports = router
