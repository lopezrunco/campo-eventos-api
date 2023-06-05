require('dotenv').config() // Load environment variables

const mongoose = require('mongoose') // MongoDB mapper
const mongooseToJson = require('@meanie/mongoose-to-json') // Cleans the requeston _id & __v fields
const express = require('express')
const cors = require('cors') // Allows connections between the same IP
const getDbConnectionString = require('./utils/get-db-connection-string') // Returns the conection string

mongoose.plugin(mongooseToJson) // Loads the mongooseToJson plugin in mongoose

global.__basedir = __dirname;

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

// Image files
const uploadImageFile = require('./controllers/image-file/upload')
const getAllImageFiles = require('./controllers/image-file/get-all')
const getImageFile = require('./controllers/image-file/get-file')
const deleteImageFile = require('./controllers/image-file/delete')

// Video files
const uploadVideoFile = require('./controllers/video-file/upload')
const getAllVideoFiles = require('./controllers/video-file/get-all')
const getVideoFile = require('./controllers/video-file/get-file')
const deleteVideoFile = require('./controllers/video-file/delete')

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

// Image files
app.post('/image-upload', uploadImageFile)
app.get('/image-files', getAllImageFiles)
app.get('/image-files/:name', getImageFile)
app.delete('/image-files/:name', deleteImageFile)

// Video files
app.post('/video-upload', uploadVideoFile)
app.get('/video-files', getAllVideoFiles)
app.get('/video-files/:name', getVideoFile)
app.delete('/video-files/:name', deleteVideoFile)

// Use the imported credentials to connect to the database
mongoose.connect(getDbConnectionString(), { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(process.env.PORT) // Start to listen for connections
        console.log('Connected to database.')
    }).catch(error => {
        console.error('Could not connect to the database => ', error)
    })