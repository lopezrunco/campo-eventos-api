const uploadFile = require('../../middlewares/upload-video')

module.exports = async (req, res) => {
    try {
        await uploadFile(req, res)

        if (req.file == undefined) {
            return res.status(400).send({ message: "Por favor, seleccione un video válido." })
        }

        res.status(200).send({
            // message: `${req.file.originalname} successfully uploaded`,
            message: `Video subido con éxito!`,
        })
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "El video no puede pesar más de 70 MB!",
            });
        }

        res.status(500).send({
            // message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            message: `No se puedo subir el video. ${err}`,
        })
    }
}