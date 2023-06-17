const Joi = require('joi')
const { liveEventModel } = require('../../models/live-event')

module.exports = (request, response) => {
    const liveEvent = request.body

    const schema = Joi.object({
        title: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ÁÉÍÓÚáéíóú ]*$/),
        day: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ÁÉÍÓÚáéíóú ]*$/),
        month: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ÁÉÍÓÚáéíóú ]*$/),
        beginHour: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.:ÁÉÍÓÚáéíóú ]*$/),
        endHour: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.:ÁÉÍÓÚáéíóú ]*$/),
        location: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ÁÉÍÓÚáéíóú ]*$/),
        organizer: Joi.string()
            .required()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ÁÉÍÓÚáéíóú ]*$/),
        coverImgName: Joi.string(),
        broadcastLinkId: Joi.string()
            .min(2)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ÁÉÍÓÚáéíóú ]*$/),
    })

    const validationResult = schema.validate(liveEvent)

    if (!validationResult.error) {
        liveEventModel.create({
            title: liveEvent.title,
            day: liveEvent.day,
            month: liveEvent.month,
            beginHour: liveEvent.beginHour,
            endHour: liveEvent.endHour,
            location: liveEvent.location,
            organizer: liveEvent.organizer,
            coverImgName: liveEvent.coverImgName,
            broadcastLinkId: liveEvent.broadcastLinkId,
        }).then(event => {
            response.status(200).json({
                message: 'New live event created'
            })
        }).catch(error => {
            response.status(500).json({
                message: 'Could not create the new live event'
            })
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}