const express = require('express')
const {
    CreateCourse,
    GetCourse,
    GetCourses,
    AddAdmin,
    AddInstructor,
    AddTrainee
} = require('../Controllers/CourseController')


const router = express.Router()

// Get all courses
router.get('/viewcourses', GetCourses)

//View Single Course
router.get('/:id', GetCourse)

//Post new course
router.post('/addcourse', CreateCourse)

//add new admin
router.post('/addadmin', AddAdmin)

//add new instructor
router.post('/addinstructor', AddInstructor)

//add new trainee
router.post('/addtrainee', AddTrainee)

module.exports = router