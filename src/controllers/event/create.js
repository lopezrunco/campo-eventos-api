const Joi = require('joi')
const { eventModel } = require('../../models/event')

module.exports = (request, response) => {
    const event = request.body

    const schema = Joi.object({
        title: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        eventType: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        category: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        description: Joi.string()
            .allow(null, '')
            .min(2)
            .max(600)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº&(\r\n|\r|\n) ]*$/),
        company: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        organizer: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        breeder: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        funder: Joi.string()
            .allow(null, '')
            .min(3)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        location: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        duration: Joi.number()
            .allow(null, ''),
        startBroadcastTimestamp: Joi.date()
            .required(),
        broadcastLinkId: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        coverImgName: Joi.string()
            .allow(null, '')
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóúº& ]*$/),
        userId: Joi.string()
            .required()
            .alphanum()
    })

    const validationResult = schema.validate(event)

    if (!validationResult.error) {
        eventModel.create({
            title: event.title,
            eventType: event.eventType,
            category: event.category,
            description: event.description,
            company: event.company,
            organizer: event.organizer,
            breeder: event.breeder,
            funder: event.funder,
            location: event.location,
            duration: event.duration,
            startBroadcastTimestamp: event.startBroadcastTimestamp,
            broadcastLinkId: event.broadcastLinkId,
            coverImgName: event.coverImgName,
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