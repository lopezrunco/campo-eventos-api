module.exports = (req, res) => {
    const fileName = req.params.name
    const directoryPath = __basedir + "/resources/static/assets/uploads/"

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "No se pudo descargar el archivo. " + err,
            })
        }
    })
}
