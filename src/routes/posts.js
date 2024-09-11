const express = require('express')
const router = express.Router()

const checkUserCredentials = require('../middlewares/check-user-credentials')
const checkUserRole = require('../middlewares/check-user-role')

const searchByTitle = require('../controllers/post/search-by-title')
const searchPublishedByTitle = require('../controllers/post/search-published-by-title')
const getPostByUserIdAndTitle = require('../controllers/post/get-by-user-id-and-title')
const getAllPosts = require('../controllers/post/get-all')
const getPublishedPosts = require('../controllers/post/get-published')
const getAllTags = require('../controllers/post/get-all-tags')
const getPostById = require('../controllers/post/get-by-id')
const getPostByUserId = require('../controllers/post/get-by-user-id')
const getPostByCategory = require('../controllers/post/get-by-category')
const createPost = require('../controllers/post/create')
const updatePost = require('../controllers/post/update')
const deletePost = require('../controllers/post/delete')
const getPostsByTag = require('../controllers/post/get-by-tag')

router.get('/posts/search', checkUserCredentials(), checkUserRole(['ADMIN', 'AUTHOR']), searchByTitle)
router.get('/posts/search/published', searchPublishedByTitle)
router.get('/posts/my-posts/search', checkUserCredentials(), checkUserRole(['ADMIN', 'AUTHOR']), getPostByUserIdAndTitle)
router.get('/posts', checkUserCredentials(), checkUserRole(['ADMIN']), getAllPosts)
router.get('/posts/published', getPublishedPosts)
router.get('/posts/:id', getPostById)
router.post('/my-posts', checkUserCredentials(), checkUserRole(['ADMIN', 'AUTHOR']), getPostByUserId)
router.get('/posts/category/:category', getPostByCategory)
router.post('/posts/create', checkUserCredentials(), checkUserRole(['ADMIN', 'AUTHOR']), createPost)
router.put('/posts/:id', checkUserCredentials(), checkUserRole(['ADMIN', 'AUTHOR']), updatePost)
router.delete('/posts/:id', checkUserCredentials(), checkUserRole(['ADMIN', 'AUTHOR']), deletePost)
router.get('/tags', getAllTags)
router.get('/posts/tag/:tag', getPostsByTag)

module.exports = router