const { liveEventModel } = require('../../models/live-event')

module.exports = (request, response) => {
    liveEventModel
        .findOne({ _id: request.params.id })
        .then(event => {
            event.set(request.body)
            event.save().then(() => {
                response.status(200).json({
                    message: 'Live event updated successfully'
                }).end()
            }).catch(error => {
                console.error(error)
                response.status(500).json({
                    message: 'Error trying to update the live event'
                })
            })
        }).catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error trying to update the live event'
            })
        })
}