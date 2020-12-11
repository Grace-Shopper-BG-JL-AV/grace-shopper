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

//kept the 3 of us as administrators...change your admin functions to test
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

function costumePic() {
  let dogCostumes = [
    'https://partycity1.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P901158_full',
    'https://partycity.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P890636_full',
    'https://partycity.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P815191_full',
    'https://partycity6.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P687539_full',
    'https://partycity6.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P890656_full',
    'https://partycity5.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P816029_full',
    'https://partycity.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P815221_full',
    'https://partycity4.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P856120_full',
    'https://partycity3.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P793619_full',
    'https://partycity.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P858506_full',
    'https://partycity5.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P815213_full',
    'https://partycity1.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P871112_full',
    'https://partycity4.scene7.com/is/image/PartyCity/_sq_?$_500x500_$&$product=PartyCity/P850788_full'
  ]
  return dogCostumes[Math.floor(Math.random() * dogCostumes.length)]
}

function name() {
  let costumeDescription = [
    'Cute Puppy Costume',
    'The Best Dog Costume',
    'Super Funny Dog Costume',
    'Movie Dog Costume',
    'Fluffy Costume',
    'Costume for Cute Dogs',
    'Adorable Costume',
    'Silly Costume'
  ]
  return costumeDescription[
    Math.floor(Math.random() * costumeDescription.length)
  ]
}

function description() {
  let describe = [
    'Your furry friend will love this costume!',
    "You'll get a lot of laughs with this costume.",
    'Your fluffy friend will be the life of the party in this costume!',
    'If you want a super cute costume for your pet, you should check this one out!',
    'Your pup will be happy as a clam in this costume!',
    'This costume is made with 100% cotton so your furry pal will be ultra comfy.',
    'If you love your pup, check out this costume!',
    'Everyone is going to love this costume at the pet parade!'
  ]
  return describe[Math.floor(Math.random() * describe.length)]
}

const createFakeProduct = () => ({
  name: name(),
  description: description(),
  price: faker.random.number(),
  imageUrl: costumePic()
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
