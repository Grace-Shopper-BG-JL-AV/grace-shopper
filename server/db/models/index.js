const User = require('./user')
const Product = require('./product')
const {Cart, OrderProducts} = require('./cart')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

//User and Cart association (cart akin to an individual order)
User.hasMany(Cart)
Cart.belongsTo(User)

//Cart and OrderProducts associations
Cart.hasMany(OrderProducts)
OrderProducts.belongsTo(Cart)

//OrderProducts and Product associations
Product.hasMany(OrderProducts)
OrderProducts.belongsTo(Product)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product
}
