const uploadFile = require('../../middlewares/upload')

module.exports = async (req, res) => {
    try {
        await uploadFile(req, res)

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file." })
        }

        res.status(200).send({
            message: `${req.file.originalname} successfully uploaded`,
        })
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        })
    }
}