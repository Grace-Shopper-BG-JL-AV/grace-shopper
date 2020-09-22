const router = require('express').Router()

router.use('/users', require('./users'))
//mounted the products api route
router.use('/products', require('./products'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
