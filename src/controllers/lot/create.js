const Joi = require('joi')
const { lotModel } = require('../../models/lot')

module.exports = (request, response) => {
    const lot = request.body

    const schema = Joi.object({
        title: Joi.string()
            .required()
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        category: Joi.string()
            .required()
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        description: Joi.string()
            .allow(null, '')
            .min(1)
            .max(600)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        animals: Joi.number()
            .allow(null, ''),
        weight: Joi.number()
            .allow(null, ''),
        age: Joi.number()
            .allow(null, ''),
        class: Joi.string()
            .allow(null, '')
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        state: Joi.string()
            .allow(null, '')
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        observations: Joi.string()
            .allow(null, '')
            .min(1)
            .max(600)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        race: Joi.string()
            .allow(null, '')
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        certificate: Joi.string()
            .allow(null, '')
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        type: Joi.string()
            .allow(null, '')
            .min(1)
            .max(50)
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/),
        open: Joi.boolean()
            .required(),
        sold: Joi.boolean()
            .required(),
        completed: Joi.boolean()
            .required(),
        YTVideoSrc: Joi.string()
            .allow(null, '')
            .min(1)
            .max(50),
        eventId: Joi.string()
            .required()
            .alphanum()
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
            open: lot.open,
            sold: lot.sold,
            completed: lot.completed,
            YTVideoSrc: lot.YTVideoSrc,
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