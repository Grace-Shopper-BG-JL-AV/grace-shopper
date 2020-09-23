const app = require('../index')

let chai = require('chai')
let chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('GET routes', function() {
  it('/api/products should get all products', done => {
    //idk why the linter is mad, but the test works
    chai
      .request(app)
      .get('/api/products')
      .end((error, response) => {
        response.should.have.status(200)
        //still need to make sure the correct data is being fetched
        done(error)
      })
  })

  it('/api/products/:id should get one product', done => {
    chai
      .request(app)
      .get('/api/products/1')
      .end((err, result) => {
        result.should.have.status(200)
        //still need to make sure the correct data is being fetched
        done(err)
      })
  })
})
