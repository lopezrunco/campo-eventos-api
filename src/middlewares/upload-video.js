const util = require('util')
const multer = require('multer')
const maxSize = 70 * 1024 * 1024
const fs = require('fs')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__basedir}/resources/static/assets/uploads/`)
    },
    filename: (req, file, cb) => {
        console.log(`Uploading the file: ${file.originalname}`)
        cb(null, file.originalname)
    },
})

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: (req, file, cb) => {
        fs.access(`${__basedir}/resources/static/assets/uploads/${file.originalname}`, (err) => {
            if (err) {
                cb(null, true)
            } else {
                cb(new Error('Ya se ha subido un video con este nombre. Por favor, cambie el nombre de su video o seleccione otro.'))
            }
        })
    }
}).single('file')

let uploadFileMiddleware = util.promisify(uploadFile)
module.exports = uploadFileMiddleware