const express = require('express')

const {AdminLogin} = require('../Controllers/AdminController')

const router = express.Router()

router.post('/adminlogin', AdminLogin)

module.exports = router
