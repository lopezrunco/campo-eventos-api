const { model, Schema } = require('mongoose')

const allowedCategories = ['Zafras', 'Ferias', 'Pantalla', 'Equinos', 'Eventos', 'Sociales', 'Otros']

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: allowedCategories
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
}, {
    timestamps: true
})

const postModel = model('posts', postSchema)

module.exports = {
    postSchema,
    postModel
}