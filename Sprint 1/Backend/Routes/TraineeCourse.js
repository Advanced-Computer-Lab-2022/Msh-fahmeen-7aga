const express = require('express')
const {
    GetCourse,
    GetCourses,
    InstCreateCourse,
    GetInstructor
} = require('../Controllers/CourseController')

const router = express.Router()

// Get all courses
router.get('/viewcourses', GetCourses)



//View Single Course
router.get('/:id', GetCourse)

router.post('/instaddcourse', InstCreateCourse)




module.exports = router