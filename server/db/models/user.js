const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

//default user image
const defaultUserImageUrl =
  'data:image/png;base64,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'

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },

  firstName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  lastName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  //determines whether user has admin privileges
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },

  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: defaultUserImageUrl
  },

  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },

  googleId: {
    type: Sequelize.STRING
  }
})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
