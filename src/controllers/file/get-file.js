module.exports = (req, res) => {
    const fileName = req.params.name
    const directoryPath = __basedir + "/resources/static/assets/uploads/"

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            })
        }
    })
}
