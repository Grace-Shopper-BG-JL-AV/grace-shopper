const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //spec for all products api route
  describe('/api/products/', () => {
    beforeEach(() => {
      Product.create({
        name: 'dog costume',
        description: 'a cool costume'
      })
      Product.create({
        name: 'another dog costume',
        description: 'a cool costume'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('dog costume')
    })
  })

  //spec for single product api route
  describe('/api/products/:productId', () => {
    beforeEach(() => {
      Product.create({
        name: 'dog costume',
        description: 'a cool costume'
      })
    })

    xit('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('dog costume')
    })
  })
})
