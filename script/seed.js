'use strict'
//const {yellow, green, red} = require('chalk')
const db = require('../server/db')
const {User, Product} = require('../server/db/models')
const {users, products} = require('./data')

async function seed() {
  try {
    await db.sync({force: true})
    // seed your database here!
    await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )
    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )
    console.log(`seeded successfully`)
    // const user = await User.findByPk(1)
    // const anotherUser = await User.findByPk(2)
    // const product = await Product.findByPk(1)
    // const anotherProduct = await Product.findByPk(2)
    // const andAnotherProduct = await Product.findByPk(3)
    // await user.addProduct(product)
    // await user.addProduct(anotherProduct)
    // await anotherUser.addProduct(product)
    // await anotherUser.addProduct(andAnotherProduct)
  } catch (err) {
    console.log(err)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
