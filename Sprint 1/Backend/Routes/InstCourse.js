


const express = require('express')
const {
    CreateCourse,
    GetCourse,
    GetCourses,
    InstGetCourses,
    uploadPDF
} = require('../Controllers/CourseController')




const RequireAuth = require('../Middleware/RequireAuthins')


const router = express.Router()

router.use(RequireAuth)

// Get all courses
router.get('/viewcourses', GetCourses)

//Get courses taught by instructor
router.get('/yourcourses', InstGetCourses)

//View Single Course
router.get('/:id', GetCourse)

//Post new course
router.post('/addcourse', CreateCourse)

//Post new course for you (postman)






module.exports = router