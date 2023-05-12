const mongoose = require('mongoose')
const { lotModel } = require('../../models/lot')

module.exports = (request, response) => {

    const pagination = {
        offset: 0,
        limit: 10
    }
    if (request.query.page && request.query.itemsPerPage) {
        pagination.offset = (request.query.page - 1) * request.query.itemsPerPage,
            pagination.limit = parseInt(request.query.itemsPerPage)
    }

    lotModel
        .find()
        .skip(pagination.offset)
        .limit(pagination.limit)
        .then(lots => {
            lotModel
                .count()
                .then(count => {
                    const meta = {
                        count
                    }

                    response.status(200).json({
                        meta,
                        lots
                    })
                }).catch(error => {
                    console.error(error)

                    response.status(500).json({
                        message: 'Error trying to list the lots'
                    })
                })
        }).catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error trying to list the lots'
            })
        })
}