const express = require('express')
const {
    CreateCourse,
    GetCourse,
    GetCourses,
    InstGetCourses,
    InstCreateCourse
} = require('../Controllers/CourseController')


const router = express.Router()

// Get all courses
router.get('/viewcourses', GetCourses)

//Get courses taught by instructor
router.get('/yourcourses', InstGetCourses)

//View Single Course
router.get('/:id', GetCourse)

//Post new course
router.post('/addcourse', CreateCourse)

//Post new course for you (postman)
router.post('/instaddcourse', InstCreateCourse)

module.exports = router