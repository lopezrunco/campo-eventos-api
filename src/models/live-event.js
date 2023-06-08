const { model, Schema } = require('mongoose')

const liveEventSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    day: {
        type: String,
        required: true,
        trim: true
    },
    month: {
        type: String,
        required: true,
        trim: true
    },
    beginHour: {
        type: String,
        required: true,
        trim: true
    },
    endHour: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    organizer: {
        type: String,
        required: true,
        trim: true
    },
    coverImgName: {
        type: String,
        required: false,
        trim: true
    },
    broadcastLinkId: {
        type: String,
        required: false,
        trim: true
    },
})

const liveEventModel = model('liveEvents', liveEventSchema)

module.exports = {
    liveEventSchema,
    liveEventModel
}