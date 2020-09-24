const router = require('express').Router()

//mounted the users api route
router.use('/users', require('./users'))
//mounted the products api route
router.use('/products', require('./products'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
