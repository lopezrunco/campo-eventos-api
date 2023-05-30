const uploadFile = require('../../middlewares/upload')

module.exports = async (req, res) => {
    try {
        await uploadFile(req, res)

        if (req.file == undefined) {
            return res.status(400).send({ message: "Por favor, seleccione un archivo válido." })
        }

        res.status(200).send({
            // message: `${req.file.originalname} successfully uploaded`,
            message: `Archivo subido con éxito! Redireccionando...`,
        })
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "El archivo no puede pesar mas de 2MB!",
            });
        }

        res.status(500).send({
            // message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            message: `No se puedo subir el archivo. ${err}`,
        })
    }
}