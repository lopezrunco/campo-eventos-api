const { liveEventModel } = require('../../models/live-event')

module.exports = (request, response) => {
    liveEventModel
        .findOneAndDelete({ _id: request.params.id })
        .then(() => {
            response.status(200).json({
                message: 'Live event deleted succesfully.'
            }).end()
        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error trying to delete the live event.'
            })

        }).catch(error => {
            console.error(error)

            response.status(500).json({
                message: 'Error trying to delete the live event'
            })
        })
}

