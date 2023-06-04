const fs = require("fs")

module.exports = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = `${__basedir}/resources/static/assets/uploads/`

  try {
    fs.unlinkSync(directoryPath + fileName)

    res.status(200).send({
      message: "Video borrado.",
    })
  } catch (err) {
    res.status(500).send({
      message: "No se pudo borrar el video. " + err,
    })
  }
}