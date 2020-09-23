const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
//I'll need to add the associations we made...?
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //spec for all products api route
  describe('/api/products/', () => {
    beforeEach(() => {
      return Product.create([
        //edit once you have db model from Jackie
        {
          name: 'dog costume',
          price: 30,
          description: 'a cool costume',
          imageUrl: 'www.google.com',
          size: 'Medium'
        },
        {
          name: 'dog costume',
          price: 30,
          description: 'a cool costume',
          imageUrl: 'www.google.com',
          size: 'Medium'
        }
      ])
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].title).to.be.equal('dog costume')
    })
  }) // end describe('/api/products')

  //spec for single product api route
  describe('/api/products/:productId', () => {
    beforeEach(() => {
      return Product.create({
        //edit once you have db model from Jackie
        name: 'dog costume',
        price: 30,
        description: 'a cool costume',
        imageUrl: 'www.google.com',
        size: 'Medium'
      })
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/3')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.title).to.be.equal('dog costume')
    })
  }) // end describe('/api/products/:productId')
}) // end describe('Product routes')
