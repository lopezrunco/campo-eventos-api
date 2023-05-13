require('dotenv').config() // Load environment variables

const mongoose = require('mongoose') // MongoDB mapper
const mongooseToJson = require('@meanie/mongoose-to-json') // Cleans the requeston _id & __v fields
const express = require('express')
const cors = require('cors') // Allows connections between the same IP
const getDbConnectionString = require('./utils/get-db-connection-string') // Returns the conection string

mongoose.plugin(mongooseToJson) // Loads the mongooseToJson plugin in mongoose

// -------------------------------------------------------------------------------------------------- //
// Creation of express app
// -------------------------------------------------------------------------------------------------- //

const app = express()

// -------------------------------------------------------------------------------------------------- //
// Middlewares
// -------------------------------------------------------------------------------------------------- //

const checkUserCredentials = require('./middlewares/check-user-credentials')

app.use(cors()) // Cors returns middleware function that opens the API in security terms, to connect the front-end (Allow conections between the same IP)
app.use(express.json()) // Understand the JSON sended by the API

// -------------------------------------------------------------------------------------------------- //
// Controllers
// -------------------------------------------------------------------------------------------------- //

// Security
const refresh = require('./controllers/auth/refresh')
const enableMfa = require('./controllers/auth/enable-mfa')

// Users
const login = require('./controllers/user/login')
const register = require('./controllers/user/register')
const getAllUsers = require('./controllers/user/get-all')
const getUserById = require('./controllers/user/get-by-id')

// Events
const getAllEvents = require('./controllers/event/get-all')
const getEventById = require('./controllers/event/get-by-id')
const createEvent = require('./controllers/event/create')
const updateEvent = require('./controllers/event/update')

// Lots
const getAllLots = require('./controllers/lot/get-all')
const getLotById = require('./controllers/lot/get-by-id')
const createLot = require('./controllers/lot/create')
const updateLot = require('./controllers/lot/update')

// Preoffers
// const getAllEvents = require('./controllers/event/get-all')
// const getEventById = require('./controllers/event/get-by-id')
// const createEvent = require('./controllers/event/create')
// const updateEvent = require('./controllers/event/update')

// -------------------------------------------------------------------------------------------------- //
// Routes definition
// -------------------------------------------------------------------------------------------------- //

// Users
app.post('/login', login)
app.post('/register', register)
app.get('/admin/users', getAllUsers)
app.get('/admin/users/:id', getUserById)

// Events
app.get('/events', getAllEvents)
app.get('/events/:id', getEventById)
app.post('/events/create', createEvent)
app.put('/events/:id', updateEvent)

// Lots
app.get('/lots', getAllLots)
app.get('/lots/:id', getLotById)
app.post('/lots/create', createLot)
app.put('/lots/:id', updateLot)

// Preoffers
// app.get('/events', getAllEvents)
// app.get('/events/:id', getEventById)
// app.post('/events/create', createEvent)
// app.put('/events/:id', updateEvent)

// Use the imported credentials to connect to the database
mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT) // Start to listen for connections
        console.log('Connected to database.')
    }).catch(error => {
        console.error('Could not connect to the database => ', error)
    })