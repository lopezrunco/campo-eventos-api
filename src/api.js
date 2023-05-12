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

// -------------------------------------------------------------------------------------------------- //
// Routes definition
// -------------------------------------------------------------------------------------------------- //

// Users
app.post('/login', login)
app.post('/register', register)
app.get('/admin/users', getAllUsers)
app.get('/admin/users/:id', getUserById)

// Events
// app.post('/event/create', createEvent)
// app.get('/event/open/:id', getEventById)
// app.post('/event/edit/:id', editEvent)
// app.get('/event/history', getEventsHistory)

// Use the imported credentials to connect to the database
mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT) // Start to listen for connections
        console.log('Connected to database.')
    }).catch(error => {
        console.error('Could not connect to the database => ', error)
    })