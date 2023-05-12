const mongoose = require('mongoose')
const { eventModel } = require('../../models/event')

module.exports = (request, response) => {

    const pagination = {
        offset: 0,
        limit: 10
    }
    if (request.query.page && request.query.itemsPerPage) {
        pagination.offset = (request.query.page - 1) * request.query.itemsPerPage,
            pagination.limit = parseInt(request.query.itemsPerPage)
    }

    eventModel
        .findOne({ _id: request.params.id })
        .select('lots')
        .skip(pagination.offset)
        .limit(pagination.limit)
        .then(lots => {
            response.status(200).json({
                lots
            })
        }).catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error trying to list the lots'
            })
        })
}