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
        mfaSecret: '',
        role: userIteration === 0 ? 'ADMIN' : 'BASIC'   // First user is ADMIN, the rest are BASIC
    })
}
// Generate events
for (let eventIteration = 0; eventIteration < numberOfEvents; eventIteration++) {
    const lots = []

    // Generate lots
    for (let lotIteration = 0; lotIteration < faker.datatype.number(20); lotIteration++) {
        const preoffers = []

        // Generate preoffers
        for (let preofferIteration = 0; preofferIteration < faker.datatype.number(5); preofferIteration++) {
            preoffers.push({
                userId: '465678456345656',
                date: '9 de mayo 2023',
                amount: faker.datatype.number(500),
                accepted: faker.datatype.boolean(),
            })
        }

        lots.push({
            title: faker.commerce.productName(),
            category: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            animals: 43,
            weight: 457,
            age: 3,
            class: 'MBB',
            state: 'Regular',
            observations: 'Lorem ipsum dolor sit sament amel del rad jadar melopifunak eme tele pudar.',
            race: 'Merilin',
            certificate: faker.datatype.boolean(),
            type: 'Mocheados',
            currency: 'U$S',
            open: faker.datatype.boolean(),
            preoffers: preoffers,
            sold: faker.datatype.boolean(),
            completed: faker.datatype.boolean(),
        })
    }

    events.push({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        company: faker.commerce.productName(),
        organizer: faker.commerce.productName(),
        funder: faker.commerce.productName(),
        location: faker.commerce.productName(),
        lots: lots,
        videoLink: faker.commerce.productName(),
        broadcastLink: faker.commerce.productName(),
    })
}

console.log('------------------------------------------------------------------------')
console.log(`Seeder running...`)

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