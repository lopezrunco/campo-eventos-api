const { model, Schema } = require('mongoose')

const preofferSchema = new Schema({
    userId: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
    },
    accepted: {
        type: Boolean,
        required: false
    }
})

const preofferModel = model('preoffers', preofferSchema)

module.exports = {
    preofferSchema,
    preofferModel
}