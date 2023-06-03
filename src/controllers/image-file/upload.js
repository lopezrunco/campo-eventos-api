const uploadFile = require('../../middlewares/upload')

module.exports = async (req, res) => {
    try {
        await uploadFile(req, res)

        if (req.file == undefined) {
            return res.status(400).send({ message: "Por favor, seleccione una imagen válida." })
        }

        res.status(200).send({
            // message: `${req.file.originalname} successfully uploaded`,
            message: `Imagen subida con éxito!`,
        })
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "La imagen no puede pesar los 2MB!",
            });
        }

        res.status(500).send({
            // message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            message: `No se puedo subir la imagen. ${err}`,
        })
    }
}