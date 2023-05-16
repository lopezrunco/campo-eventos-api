const mongoose = require('mongoose')
const { preofferModel } = require('../../models/preoffer')

module.exports = (request, response) => {
    const lotId = request.body.lotId
    console.log(lotId)

    const pagination = {
        offset: 0,
        limit: 10
    }
    if (request.query.page && request.query.itemsPerPage) {
        pagination.offset = (request.query.page - 1) * request.query.itemsPerPage,
            pagination.limit = parseInt(request.query.itemsPerPage)
    }

    preofferModel
        .find({ lotId: request.body.lotId })
        .skip(pagination.offset)
        .limit(pagination.limit)
        .then(preoffers => {
            preofferModel
                .count()
                .then(count => {
                    const meta = {
                        count
                    }

                    response.status(200).json({
                        meta,
                        preoffers
                    })
                }).catch(error => {
                    console.error(error)

                    response.status(500).json({
                        message: 'Error trying to list the preoffers'
                    })
                })
        }).catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error trying to list the preoffers'
            })
        })
}