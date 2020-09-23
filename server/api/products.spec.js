import app from '../index'

let chai = require('chai')
let chaiHttp = require('chai-http')

chai.use(chaiHttp)
chai.should()

describe('GET routes', function() {
  it('/api/products should get all products', done => {
    //idk why the linter is mad, but the test works
    chai
      .request(app)
      .get('/api/products')
      .end((error, res) => {
        res.should.have.status(200)
        //still need to make sure the correct data is being fetched
        done(error)
      })
  })

  it('/api/products/:id should get one product', done => {
    chai
      .request(app)
      .get('/api/products/1')
      .end((err, res) => {
        res.should.have.status(200)
        //still need to make sure the correct data is being fetched
        done(err)
      })
  })
})
