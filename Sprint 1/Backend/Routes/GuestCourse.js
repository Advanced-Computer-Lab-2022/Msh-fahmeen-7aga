const multer = require('multer');

const upload = multer({ dest: 'upload/' });




const express = require('express')
const {
    GetCourse,
<<<<<<< Updated upstream
    GetCourses, rateCourse
=======
    GetCourses, rateCourse,
    registerForCourse,
    registeredCourses,
    coursetitles, uploadPDF, GetInstructor
>>>>>>> Stashed changes
} = require('../Controllers/CourseController')

const RequireAuth = require('../Middleware/RequireAuth')
const router = express.Router()

// Get all courses
router.get('/viewcourses', GetCourses)


//View Single Course
router.get('/:id', GetCourse)

router.put('/rating', rateCourse) //route to rate

<<<<<<< Updated upstream
=======

router.post('/uploadPDF', upload.single('pdf'), async (req, res) => {
    try {
      const { courseId } = req.body;
      const pdf = req.file;
  
      if (!pdf) {
        return res.status(400).json({ error: 'Please select a pdf file to upload' });
      }
  
      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return res.status(404).json({ error: 'Invalid course id' });
      }
  
      const course = await Course.findById(courseId);
  
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      // Add the pdf to the course's exercises array
      course.exercises.push({
        filename: pdf.originalname,
        path: pdf.path,
        uploadDate: Date.now(),
      });
  
      // Save the course
      await course.save();
  
      return res.status(200).json({ message: 'PDF file uploaded successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.post('/register-for-course', async (req, res) => {
    const { studentEmail, courseId } = req.body
    const result = await registerForCourse(studentEmail, courseId)
    if (result.error) {
      res.status(400).json({ error: result.error })
    } else {
      res.status(200).json({ message: result.message })
    }
  })

  router.get('/registered-courses', registeredCourses)
  

 
  
>>>>>>> Stashed changes

module.exports = router