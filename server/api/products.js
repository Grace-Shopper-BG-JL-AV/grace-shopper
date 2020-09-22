const router = require('express').Router()
//assuming the db model is called Product
const {Product, User} = require('../db/models')

//all products api route
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      //get all of the products, include the user if associated
      //but i *DON'T* want to include the user's private info, just first/last name??
      include: [User]
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//single products api route
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId, {
      //find the one product by primary key, include the user if associated
      //but i *DON'T* want to include the user's private info, just first/last name??
      include: [User]
    })
    res.json(product)
  } catch (error) {
    next(error)
  }
})

module.exports = router
