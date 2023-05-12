const Joi = require('joi')
const { eventModel } = require('../../models/event')

module.exports = (request, response) => {
    const event = request.body

    const schema = Joi.object({
        title: Joi.string()
            .alphanum()
            .required(),
        description: Joi.string()
            .alphanum()
            .required(),
        company: Joi.string()
            .alphanum()
            .required(),
        organizer: Joi.string()
            .alphanum()
            .required(),
        funder: Joi.string()
            .alphanum()
            .required(),
        location: Joi.string()
            .alphanum()
            .required(),
        lots: Joi.array(),
        videoLink: Joi.string()
            .alphanum()
            .required(),
        broadcastLink: Joi.string()
            .alphanum()
            .required(),
    })

    const validationResult = schema.validate(event)

    if (!validationResult.error) {
        eventModel.create({
            title: event.title,
            description: event.description,
            company: event.company,
            organizer: event.organizer,
            funder: event.funder,
            location: event.location,
            lots: [],
            videoLink: event.videoLink,
            broadcastLink: event.broadcastLink,
        }).then(event => {
            response.status(200).json({
                message: 'New event created'
            })
        }).catch(error => {
            response.status(500).json({
                message: 'Could not create the new event'
            })
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}