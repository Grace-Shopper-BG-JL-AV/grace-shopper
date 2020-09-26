const Sequelize = require('sequelize')
const db = require('../db')

//default product image
const defaultImageUrl =
  'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fstock-photo%2Fno_image_available.html&psig=AOvVaw2tIx3zCuE7PIySgFTsv8QL&ust=1600876046047000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCfxJKO_esCFQAAAAAdAAAAABAD'

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: defaultImageUrl
  },
  size: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: ['small', 'medium', 'large']
  },
  stars: {
    type: Sequelize.ARRAY(Sequelize.INTEGER(0, 5)),
    defaultValue: []
  }
})

module.exports = Product
