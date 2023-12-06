require('dotenv').config() // Load environment variables

const mongoose = require('mongoose') // MongoDB mapper
const mongooseToJson = require('@meanie/mongoose-to-json') // Cleans the requests on _id & __v fields
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
app.use(express.json()) // Understand the JSON sent by the API

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
const updateUser = require('./controllers/user/update')
const deleteUser = require('./controllers/user/delete')

// Posts
// const getAllPosts = require('./controllers/post/get-all')
// const getPostById = require('./controllers/post/get-by-id')
// const getPostByUserId = require('./controllers/post/get-by-user-id')
const createPost = require('./controllers/post/create')
// const updatePost = require('./controllers/post/update')
// const deletePost = require('./controllers/post/delete')

// Events
const getAllEvents = require('./controllers/event/get-all')
const getEventById = require('./controllers/event/get-by-id')
const getEventByUserId = require('./controllers/event/get-by-user-id')
const createEvent = require('./controllers/event/create')
const updateEvent = require('./controllers/event/update')
const deleteEvent = require('./controllers/event/delete')

// Lots
const getAllLots = require('./controllers/lot/get-all')
const getLotById = require('./controllers/lot/get-by-id')
const createLot = require('./controllers/lot/create')
const updateLot = require('./controllers/lot/update')
const deleteLot = require('./controllers/lot/delete')

// Preoffers
const getAllPreoffers = require('./controllers/preoffer/get-all')
const getPreofferById = require('./controllers/preoffer/get-by-id')
const getPreofferByUserId = require('./controllers/preoffer/get-by-user-id')
const createPreoffer = require('./controllers/preoffer/create')
const updatePreoffer = require('./controllers/preoffer/update')
const deletePreoffer  = require('./controllers/preoffer/delete')

// -------------------------------------------------------------------------------------------------- //
// Routes definition
// -------------------------------------------------------------------------------------------------- //

// Users
app.post('/login', login)
app.post('/register', register)
app.put('/user/:id/update', updateUser)
app.get('/admin/users', getAllUsers)
app.get('/admin/users/:id', getUserById)
app.delete('/admin/users/:id', deleteUser)

// Posts
// app.get('/posts', getAllPosts)
// app.get('/posts/:id', getPostById)
// app.post('/my-posts', getPostByUserId)
app.post('/posts/create', createPost)
// app.put('/posts/:id', updatePost)
// app.delete('/posts/:id', deletePost)

// Events
app.get('/events', getAllEvents)
app.get('/events/:id', getEventById)
app.post('/my-events', getEventByUserId)
app.post('/events/create', createEvent)
app.put('/events/:id', updateEvent)
app.delete('/events/:id', deleteEvent)

// Lots
app.post('/lots', getAllLots)
app.get('/lots/:id', getLotById)
app.post('/lots/create', createLot)
app.put('/lots/:id', updateLot)
app.delete('/lots/:id', deleteLot)

// Preoffers
app.post('/preoffers', getAllPreoffers)
app.get('/preoffers/:id', getPreofferById)
app.get('/preoffers/user/:id', getPreofferByUserId)
app.post('/preoffers/create', createPreoffer)
app.put('/preoffers/:id', updatePreoffer)
app.delete('/preoffers/:id', deletePreoffer)

// Use the imported credentials to connect to the database
mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT) // Start to listen for connections
        console.log('Connected to database.')
    }).catch(error => {
        console.error('Could not connect to the database => ', error)
    })

