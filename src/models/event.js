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
    company: {
        type: String,
        required: true,
        trim: true
    },
    organizer: {
        type: String,
        required: true,
        trim: true
    },
    funder: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    broadcastLink: {
        type: String,
        required: false,
        trim: true
    },
    imageUrl: {
        type: String,
        required: false,
        trim: true
    },
    userId: {
        type: String,
        required: true,
        trim: true
    },
})

const eventModel = model('events', eventSchema)

module.exports = {
    eventSchema,
    eventModel
}