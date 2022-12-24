const express = require('express')
const {
    CreateCourse,
    GetCourse,
    GetCourses,
    AddAdmin,
    AddInstructor,
    AddTrainee,
    setPromotion,
} = require('../Controllers/CourseController')

const {InstructorSignup} = require('../Controllers/InstructorController')


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

//instructor sign up
router.post('/instructorsignup', InstructorSignup)

router.put('/promotion',setPromotion)

module.exports = router