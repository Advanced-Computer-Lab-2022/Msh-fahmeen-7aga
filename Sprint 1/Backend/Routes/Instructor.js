const express = require('express')

const {InstructorLogin} = require('../Controllers/InstructorController')

const router = express.Router()

router.post('/instructorlogin', InstructorLogin)

module.exports = router