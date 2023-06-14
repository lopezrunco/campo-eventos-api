const Joi = require('joi')
const { eventModel } = require('../../models/event')

module.exports = (request, response) => {
    const event = request.body

    const schema = Joi.object({
        title: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        description: Joi.string()
            .allow(null, '')
            .min(2)
            .max(600)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        company: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        organizer: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        funder: Joi.string()
            .allow(null, '')
            .min(3)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        location: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        broadcastLink: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        imageUrl: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        userId: Joi.string()
            .required()
            .alphanum()
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
            broadcastLink: event.broadcastLink,
            imageUrl: event.imageUrl,
            userId: event.userId,
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