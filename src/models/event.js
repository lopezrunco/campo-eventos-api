const { model, Schema } = require('mongoose')

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    priority: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        required: false
    }
})

const eventModel = model('events', eventSchema)

module.exports = {
    eventSchema,
    eventModel
}