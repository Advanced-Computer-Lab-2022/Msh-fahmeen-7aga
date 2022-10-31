const express = require('express')

//Controller
const {StudentLogin, StudentSignup} = require('../Controllers/StudentController')


const router = express.Router()

//login
router.post('/studentlogin', StudentLogin)

//sign up
router.post('/studentsignup', StudentSignup)

module.exports = router