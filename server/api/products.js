const router = require('express').Router()
const {Product} = require('../db/models')
const isAdmin = require('../auth/apiRouteMiddleware')

//all products api route
router.get('/', isAdmin, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//single products api route
router.get('/:productId', isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

//admin create new product api route
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (error) {
    next(error)
  }
})

//admin edit product api route
router.put('/:productId', isAdmin, async (req, res, next) => {
  try {
    const oneProduct = await Product.findByPk(req.params.productId)
    const updateProd = await oneProduct.update(req.body)
    res.json(updateProd)
  } catch (error) {
    next(error)
  }
})

//admin delete product api route
router.delete('/:productId', isAdmin, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
