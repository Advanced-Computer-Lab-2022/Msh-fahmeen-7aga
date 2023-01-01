const express = require('express')

const {TraineeLogin} = require('../Controllers/TraineeController')

const router = express.Router()

router.post('/traineelogin', TraineeLogin)

module.exports = router