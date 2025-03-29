const express = require('express')
const router = express.Router()

const {
    test,
    downloadData
} = require('../controllers/mainController')

router.get('/', test)
router.post('/sendData', downloadData)


module.exports = router