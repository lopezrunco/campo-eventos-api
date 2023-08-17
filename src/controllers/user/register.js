const bcrypt = require('bcrypt')
const Joi = require('joi')
const createToken = require('../../utils/create-token')
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require('../../utils/token-types')
const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    const user = request.body

    const schema = Joi.object({
        nickname: Joi.string()
            .regex(/^[a-zA-Z0-9,.ñÁÉÍÓÚáéíóú ]*$/)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(7)
            .max(50)
            .required(),
        telephone: Joi.number()
            .allow(null, ''),
        phone: Joi.number()
            .allow(null, ''),
        address: Joi.string()
            .allow(null, '')
    })

    const validationResult = schema.validate(user)

    if (!validationResult.error) {

        user.password = bcrypt.hashSync(user.password, 2)

        userModel.create({
            nickname: user.nickname,
            email: user.email,
            password: user.password,
            role: 'BASIC',
            telephone: user.telephone,
            phone: user.phone,
            address: user.address,
        }).then(user => {

            // Obtain the user in plain
            const userWithoutPassword = user.toObject()

            delete userWithoutPassword.password

            userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, '20m')
            userWithoutPassword.refreshToken = createToken(user, REFRESH_TOKEN_TYPE, '2d')

            response.json({
                user: userWithoutPassword
            })

        }).catch(error => {
            console.log(error)
            response.status(500).json({
                message: 'Could not register the user'
            })
        })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}