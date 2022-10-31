const express = require('express')
const {
    GetCourse,
    GetCourses
} = require('../Controllers/CourseController')
const RequireAuth = require('../Middleware/RequireAuth')

const router = express.Router()

router.use(RequireAuth)

// Get all courses
router.get('/viewcourses', GetCourses)


//View Single Course
router.get('/:id', GetCourse)


module.exports = router