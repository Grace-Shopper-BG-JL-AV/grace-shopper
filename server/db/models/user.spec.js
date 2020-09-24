/* global describe beforeEach it */
const chai = require('chai')
const expect = chai.expect
const db = require('../index')
const User = db.model('user')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones',
          firstName: 'Cody',
          lastName: 'Pug'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')

  describe('Basic Fields: email, firstName, lastName, imageUrl, isAdmin', () => {
    let hannah
    beforeEach(async () => {
      hannah = await User.create({
        email: 'hannah@gmail.com',
        password: '123',
        firstName: 'Hannah',
        lastName: 'Miller'
      })
    })

    it('email is a string', () => {
      expect(hannah.email).to.equal('hannah@gmail.com')
    })
    it('email cannot be null', async () => {
      const user = User.create({})
      await expect(user).to.be.rejected
    })
    it('firstName cannot be an empty string', async () => {
      // We also shouldn't be able to create a user with an empty name.
      const user = User.create({firstName: ''})
      await expect(user).to.be.rejected
    })
    it('firstName is a string', () => {
      expect(hannah.firstName).to.equal('Hannah')
    })
    it('lastName is a string', () => {
      expect(hannah.lastName).to.equal('Miller')
    })
    it('isAdmin is a boolean', () => {
      expect(hannah.isAdmin).to.equal(false)
    })
  })
}) // end describe('User model')
