const { model, Schema } = require('mongoose')

const lotSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    animals: {
        type: Number,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    age: {
        type: Number,
        required: false,
        trim: true
    },
    class: {
        type: String,
        required: false,
        trim: true
    },
    state: {
        type: String,
        required: false,
        trim: true
    },
    observations: {
        type: String,
        required: false,
        trim: true
    },
    race: {
        type: String,
        required: true,
        trim: true
    },
    certificate: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    currency: {
        type: String,
        required: true,
        trim: true
    },
    open: {
        type: Boolean,
        required: true
    },
    sold: {
        type: Boolean,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    eventId: {
        type: String,
        required: true,
        trim: true
    },
})

const lotModel = model('lots', lotSchema)

module.exports = {
    lotSchema,
    lotModel
}