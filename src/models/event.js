const { model, Schema } = require('mongoose')

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    eventType: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    },
    rp: {
        type: String,
        required: false,
        trim: true
    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    weight: {
        type: Number,
        required: false,
    },
    birthDate: {
        type: String,
        required: false,
        trim: true
    },
    pedigree: {
        type: String,
        required: false,
        trim: true
    },
    breeder: {
        type: String,
        required: false,
        trim: true
    },
    other: {
        type: String,
        required: false,
        trim: true
    },
    company: {
        type: String,
        required: false,
        trim: true
    },
    organizer: {
        type: String,
        required: false,
        trim: true
    },
    funder: {
        type: String,
        required: false,
        trim: true
    },
    location: {
        type: String,
        required: false,
        trim: true
    },
    broadcastLink: {
        type: String,
        required: false,
        trim: true
    },
    eventTimestamp: {
        type: Date,
        required: true,
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