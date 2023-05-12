const { model, Schema } = require('mongoose')
const { lotSchema } = require('./lot')

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
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    lots: {
        type: [lotSchema],
        default: () => ([])     // If the event does not have lots, add an empty list
    },
    videoLink: {
        type: String,
        required: false,
        trim: true
    },
    broadcastLink: {
        type: String,
        required: false,
        trim: true
    },
})

const eventModel = model('events', eventSchema)

module.exports = {
    eventSchema,
    eventModel
}