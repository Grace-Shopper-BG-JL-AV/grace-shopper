/* global describe beforeEach it */

const chai = require('chai')
const expect = chai.expect
const db = require('../index')
const Product = db.model('product')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Basic Fields: name, description, price, imageUrl, size, stars', () => {
    let costume
    beforeEach(async () => {
      costume = await Product.create({
        name: 'Pope',
        description: 'Pope costume for a pug!',
        price: 25.0
      })
    })
    it('name is a string', () => {
      expect(costume.name).to.equal('Pope')
    })
    it('name cannot be null', async () => {
      const product = Product.create({})
      await expect(product).to.be.rejected
    })
    it('description is a string', () => {
      expect(costume.description).to.equal('Pope costume for a pug!')
    })
    it('description cannot be an empty string', async () => {
      const product = Product.create({
        name: 'pope',
        description: '',
        price: 25.0
      })
      await expect(product).to.be.rejected
    })
    it('price is a float', () => {
      expect(typeof costume.price).to.equal('number')
    })
    it('size is an array', () => {
      expect(costume.size).to.deep.equal(['small', 'medium', 'large'])
    })
    it('stars is an array', () => {
      expect(costume.stars).to.deep.equal([])
    })
  })
}) // end describe('Product model')
