const { model, Schema } = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    content: {
        type: String,
        required: false,
        trim: true
    },
    headline: {
        type: String,
        required: false,
        trim: true
    },
    picture: {
        type: String,
        required: false,
        trim: true
    },
    tags: {
        type: Array,
        default: () => ([])
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
})

const postModel = model('posts', postSchema)

module.exports = {
    postSchema,
    postModel
}