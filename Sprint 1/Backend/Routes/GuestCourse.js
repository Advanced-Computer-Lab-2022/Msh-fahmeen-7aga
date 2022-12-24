const express = require('express')
const {
    GetCourse,
    GetCourses, rateCourse,checkPromotion
} = require('../Controllers/CourseController')

const RequireAuth = require('../Middleware/RequireAuth')
const router = express.Router()

// Get all courses
router.get('/viewcourses', GetCourses)


//View Single Course
router.get('/:id', GetCourse)

router.put('/rating', rateCourse) //route to rate

router.put('/checkPromotion',checkPromotion)


module.exports = router