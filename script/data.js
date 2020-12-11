const faker = require('faker')

const createFakeUser = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName()
})

const users = []
const desiredUsers = 20
//seeded the database with 20 users
for (let i = 0; i < desiredUsers; i++) {
  users.push(createFakeUser())
}

const admin = [
  {
    email: 'jroyankfan42@gmail.com',
    password: '123',
    firstName: 'Jack',
    lastName: 'Lev',
    isAdmin: true
  },
  {
    email: 'betsy@gmail.com',
    password: '456',
    firstName: 'Betsy',
    lastName: 'Groton',
    isAdmin: false
  },
  {
    email: 'ashley@gmail.com',
    password: 'mynameisashley',
    firstName: 'Ash',
    lastName: 'Valenz',
    isAdmin: false
  }
]

admin.map(person => {
  users.push(person)
})

const createFakeProduct = () => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.random.number(),
  imageUrl: faker.image.cats()
})

//products array
const products = []

const puppyCostumes = [
  {
    name: 'Puppy Mermaid',
    description: 'This is the puppy mermaid costume.',
    price: 2500,
    imageUrl:
      'https://media1.popsugar-assets.com/files/thumbor/SB70R-f3IPPLQIaFkfiJNXUklKw/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2019/08/27/976/n/45222255/bdcfccc5d33228c3_91i-GqxdEpL._AC_UL640_QL65_/i/Ariel-Dog-Halloween-Costume.jpg'
  },
  {
    name: 'Puppy Sunflower',
    description: 'This is the puppy sunflower costume.',
    price: 5099,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/51tZYAEi6RL._AC_UX425_.jpg'
  },
  {
    name: 'Puppy Pumpkin',
    description: 'This is the puppy pumpkin costume.',
    price: 2025,
    imageUrl:
      'https://i5.walmartimages.com/asr/f83525b8-ffac-4dde-84b0-650e0cc2a276_1.a155def4b10c68c64f7cf90f0a9b7226.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff'
  },
  {
    name: 'Puppy Plaid Pajama Party',
    description: 'This is a puppy in plaid pajamas.',
    price: 0,
    imageUrl: 'image_from_ios.jpg'
  },
  {
    name: 'Daddy, Doggie Hawaiian Beachday',
    description: 'This is a puppy in a Hawaiian shirt matching with her daddy.',
    price: 0,
    imageUrl: 'daddy_doggie_hawaiian.jpg'
  }
]

puppyCostumes.map(costume => {
  products.push(costume)
})

const desiredProducts = 100
//seeded the database with 100 products
for (let i = 0; i < desiredProducts; i++) {
  products.push(createFakeProduct())
}

module.exports = {users, products}
