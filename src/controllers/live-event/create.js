const Joi = require('joi')
const { liveEventModel } = require('../../models/live-event')

module.exports = (request, response) => {
    const liveEvent = request.body

    const schema = Joi.object({
        title: Joi.string()
            .alphanum()
            .required(),
        day: Joi.string()
            .alphanum()
            .required(),
        month: Joi.string()
            .alphanum()
            .required(),
        beginHour: Joi.string()
            .required(),
        endHour: Joi.string()
            .required(),
        location: Joi.string()
            .alphanum()
            .required(),
        organizer: Joi.string()
            .alphanum()
            .required(),
        coverImgName: Joi.string()
            .required(),
        broadcastLinkId: Joi.string()
            .required(),
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