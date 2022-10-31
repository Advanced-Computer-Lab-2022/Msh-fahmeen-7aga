const express = require('express')
const {
    GetCourse,
    GetCourses
} = require('../Controllers/CourseController')

const router = express.Router()

// Get all courses
router.get('/viewcourses', GetCourses)


//View Single Course
router.get('/:id', GetCourse)


module.exports = router