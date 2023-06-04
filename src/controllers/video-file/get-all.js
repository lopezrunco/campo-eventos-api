const fs = require("fs")
const baseUrl = "http://localhost:3000/files/";

module.exports = (req, res) => {
    const directoryPath = `${__basedir}/resources/static/assets/uploads/`

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "No se pudieron obtener los videos.",
            })
        }

        let fileInfos = []

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            })
        })

        res.status(200).send(fileInfos)
    })
}
