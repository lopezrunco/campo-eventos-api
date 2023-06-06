const Joi = require('joi')
const { lotModel } = require('../../models/lot')

module.exports = (request, response) => {
    const lot = request.body

    const schema = Joi.object({
        title: Joi.string()
            .alphanum()
            .required(),
        category: Joi.string()
            .alphanum()
            .required(),
        description: Joi.string()
            .alphanum()
            .required(),
        animals: Joi.number()
            .required(),
        weight: Joi.number()
            .required(),
        age: Joi.number()
            .required(),
        class: Joi.string()
            .alphanum()
            .required(),
        state: Joi.string()
            .alphanum()
            .required(),
        observations: Joi.string()
            .alphanum()
            .required(),
        race: Joi.string()
            .alphanum()
            .required(),
        certificate: Joi.string()
            .alphanum()
            .required(),
        type: Joi.string()
            .alphanum()
            .required(),
        currency: Joi.string()
            .alphanum()
            .required(),
        open: Joi.boolean()
            .required(),
        sold: Joi.boolean()
            .required(),
        completed: Joi.boolean()
            .required(),
        YTVideoSrc: Joi.string(),
        videoSrc: Joi.string(),
        eventId: Joi.string()
            .alphanum()
            .required(),
    })

    const validationResult = schema.validate(lot)

    if (!validationResult.error) {
        lotModel.create({
            title: lot.title,
            category: lot.category,
            description: lot.description,
            animals: lot.animals,
            weight: lot.weight,
            age: lot.age,
            class: lot.class,
            state: lot.state,
            observations: lot.observations,
            race: lot.race,
            certificate: lot.certificate,
            type: lot.type,
            currency: lot.currency,
            open: lot.open,
            sold: lot.sold,
            completed: lot.completed,
            YTVideoSrc: lot.YTVideoSrc,
            videoSrc: lot.videoSrc,
            eventId: lot.eventId
        }).then(lot => {
            response.status(200).json({
                message: 'New lot created'
            })
        }).catch(error => {
            response.status(500).json({
                message: 'Could not create the new lot'
            })
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}