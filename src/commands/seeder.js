require('dotenv').config() // Util to read the env variables
const bcrypt = require('bcrypt')
const faker = require('faker')
const mongoose = require('mongoose')
const getDbConnectionString = require('../utils/get-db-connection-string')
const { userModel } = require('../models/user')
const { eventModel } = require('../models/event')

const users = []
const events = []
const userPassword = bcrypt.hashSync('supersecret', 2)
const numberOfUsers = 10
const numberOfEvents = 5

// Generate users
for (let userIteration = 0; userIteration < numberOfUsers; userIteration++) {
    users.push({
        nickname: faker.name.findName(),
        email: faker.internet.email(),
        password: userPassword,
        mfaEnabled: false,
        mfaSecret: ''
    })
}
// Generate events
for (let eventIteration = 0; eventIteration < numberOfEvents; eventIteration++) {
    events.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        completed: faker.datatype.boolean(),
        priority: faker.random.arrayElement(['LOW', 'MID', 'HIGH']),
    })
}

console.log('------------------------------------------------------------------------')
console.log(`Seeder running. ${numberOfUsers} users and ${numberOfEvents} events will be inserted...`)

mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        Promise.all([
            userModel.insertMany(users),
            eventModel.insertMany(events)
        ]).then(() => {
            console.log('Done!')
            console.log('------------------------------------------------------------------------')
            mongoose.connection.close()
        })
    }).catch(error => {
        console.error('Could not connect to database => ', error)
    })