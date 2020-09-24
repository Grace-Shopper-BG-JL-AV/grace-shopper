const router = require('express').Router()
//assuming the db model is called Product
const {Product, User} = require('../db/models')
const {Cart, OrderProducts} = require('../db/models/cart')
const {users} = require('../../script/data')

//all products api route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//single products api route
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
