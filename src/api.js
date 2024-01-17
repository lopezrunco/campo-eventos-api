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
const refresh = require('./controllers/auth/refresh') // TO DO: Apply this on all users
const enableMfa = require('./controllers/auth/enable-mfa') // TO DO: Apply this on Super users

// Users
const login = require('./controllers/user/login')
const register = require('./controllers/user/register')
const getAllUsers = require('./controllers/user/get-all')
const getUserById = require('./controllers/user/get-by-id')
const updateUser = require('./controllers/user/update')
const deleteUser = require('./controllers/user/delete')

// Posts
const searchByTitle = require('./controllers/post/search-by-title')
const searchPublishedByTitle = require('./controllers/post/search-published-by-title')
const getPostByUserIdAndTitle = require('./controllers/post/get-by-user-id-and-title')
const getAllPosts = require('./controllers/post/get-all')
const getPublishedPosts = require('./controllers/post/get-published')
const getAllTags = require('./controllers/post/get-all-tags')
const getPostById = require('./controllers/post/get-by-id')
const getPostByUserId = require('./controllers/post/get-by-user-id')
const getPostByCategory = require('./controllers/post/get-by-category')
const createPost = require('./controllers/post/create')
const updatePost = require('./controllers/post/update')
const deletePost = require('./controllers/post/delete')

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
const getPreoffersByUserId = require('./controllers/preoffer/get-by-user-id')
const createPreoffer = require('./controllers/preoffer/create')
const updatePreoffer = require('./controllers/preoffer/update')
const deletePreoffer = require('./controllers/preoffer/delete')
const getPostsByTag = require('./controllers/post/get-by-tag')

// Ads
const createAd = require('./controllers/ad/create')
const getAllAds = require('./controllers/ad/get-all')
const deleteAd = require('./controllers/ad/delete')
const getAdById = require('./controllers/ad/get-by-id')
const getAdsByUserId = require('./controllers/ad/get-by-user-id')
const updateAd = require('./controllers/ad/update')
const getAdsByPosition = require('./controllers/ad/get-by-position')

// -------------------------------------------------------------------------------------------------- //
// Routes definition
// -------------------------------------------------------------------------------------------------- //

// Users
app.post('/login', login)
app.post('/register', register)
app.put('/user/:id/update', checkUserCredentials(), updateUser)
app.get('/admin/users', checkUserCredentials(), getAllUsers)
app.get('/admin/users/:id', checkUserCredentials(), getUserById)
app.delete('/admin/users/:id', checkUserCredentials(), deleteUser)

// Posts
app.get('/posts/search', checkUserCredentials(), searchByTitle)
app.get('/posts/search/published', searchPublishedByTitle)
app.get('/posts/my-posts/search', checkUserCredentials(), getPostByUserIdAndTitle)
app.get('/posts', checkUserCredentials(), getAllPosts)
app.get('/posts/published', getPublishedPosts)
app.get('/posts/:id', getPostById)
app.post('/my-posts', checkUserCredentials(), getPostByUserId)
app.get('/posts/category/:category', getPostByCategory)
app.post('/posts/create', checkUserCredentials(), createPost)
app.put('/posts/:id', checkUserCredentials(), updatePost)
app.delete('/posts/:id', checkUserCredentials(), deletePost)
app.get('/tags', getAllTags)
app.get('/posts/tag/:tag', getPostsByTag)

// Events
app.get('/events', getAllEvents)
app.get('/events/:id', getEventById)
app.post('/my-events', checkUserCredentials(), getEventByUserId)
app.post('/events/create', checkUserCredentials(), createEvent)
app.put('/events/:id', checkUserCredentials(), updateEvent)
app.delete('/events/:id', checkUserCredentials(), deleteEvent)

// Lots
app.post('/lots', getAllLots)
app.get('/lots/:id', getLotById)
app.post('/lots/create', checkUserCredentials(), createLot)
app.put('/lots/:id', checkUserCredentials(), updateLot)
app.delete('/lots/:id', checkUserCredentials(), deleteLot)

// Preoffers
app.post('/preoffers', getAllPreoffers)
app.get('/preoffers/:id', checkUserCredentials(), getPreofferById)
app.get('/preoffers/user/:id', checkUserCredentials(), getPreoffersByUserId)
app.post('/preoffers/create', checkUserCredentials(), createPreoffer)
app.put('/preoffers/:id', checkUserCredentials(), updatePreoffer)
app.delete('/preoffers/:id', checkUserCredentials(), deletePreoffer)

// Ads
app.post('/ads/create', checkUserCredentials(), createAd)
app.get('/ads', checkUserCredentials(), getAllAds)
app.delete('/ads/:id', checkUserCredentials(), deleteAd)
app.get('/ads/:id', checkUserCredentials(), getAdById)
app.post('/my-ads', checkUserCredentials(), getAdsByUserId)
app.put('/ads/:id', checkUserCredentials(), updateAd)
app.get('/ads/position/:position', getAdsByPosition)

// Use the imported credentials to connect to the database
mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT) // Listening for connections
        console.log('Connected to database.')
    }).catch(error => {
        console.error('Could not connect to the database => ', error)
    })