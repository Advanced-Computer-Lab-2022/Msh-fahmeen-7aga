const multer = require('multer');



const Course = require('../Models/CourseModel')

const Trainee = require('../Models/TraineeModel')

const Student = require ('../Models/Studentmodel')

const Problem = require('../Models/Problems');

const SolvedProblem = require('../Models/SolvedProblems')






const express = require('express')
const {
    GetCourse,
    GetCourses,
    registerForCourse,
    downloadCoursePDF,checkPromotion
} = require('../Controllers/CourseController')



const {TraineeSignup} = require('../Controllers/TraineeController')



const Auth = require('../Middleware/RequireAuth')
const router = express.Router()





// Get all courses
router.get('/viewcourses', GetCourses)

router.post('/traineesignup', TraineeSignup)


//View Single Course
router.get('/:id', GetCourse)







router.put('/checkPromotion',checkPromotion) //checking promos



  router.post('/register-for-course', async (req, res) => {
    const { studentEmail, courseId } = req.body
    const result = await registerForCourse(studentEmail, courseId)
    if (result.error) {
      res.status(400).json({ error: result.error })
    } else {
      res.status(200).json({ message: result.message })
    }
  })






  router.post('/upload-pdf', multer().single('pdf'), async (req, res) => {
    // Check if a file was provided
    if (!req.file) {
      return res.status(400).send('No file was provided');
    }
  
    // Check if the file is a PDF
    if (req.file.mimetype !== 'application/pdf') {
      return res.status(400).send('File must be a PDF');
    }
  
    // Find the course to update
    const course = await Course.findById(req.body.courseId);
    if (!course) {
      return res.status(404).send('Course not found');
    }
  
    // Create the new PDF object
    const newPdf = {
      name: req.body.name,
      file: req.file.buffer,
    };
  
    // Push the new PDF object to the pdfs array
    course.pdfs.push(newPdf);
    await course.save();
  
    res.send('PDF uploaded successfully');
  });
  

  router.get('/courses/:id/pdf', downloadCoursePDF);

 




  
  


  router.post('/request-access/:courseId', async (req, res) => {
    try {
      console.log(`Received request for course with ID: ${req.params.courseId}`);
      console.log(`Request body: ${JSON.stringify(req.body)}`);
  
      // Find the course by ID
      const course = await Course.findById(req.params.courseId);
      console.log(`Found course: ${JSON.stringify(course)}`);
  
      // Find the trainee by email
      const trainee = await Trainee.findOne({ email: req.body.email });
      console.log(`Found trainee: ${JSON.stringify(trainee)}`);
  
      // Add the trainee to the list of requested students for the course
      course.requestedStudents.push(trainee._id);
      await course.save();
  
      // Add the course to the list of requested courses for the trainee
      trainee.requestedCourses.push(course._id);
      await trainee.save();
  
      console.log('Request processed successfully');
  
      // Send a response indicating that the request was successful
      res.send({ success: true });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.send({ success: false, error: error.message });
    }
  });


  router.post('/grant-access/:courseId', async (req, res) => {
    try {
      console.log(`Received request to grant access for course with ID: ${req.params.courseId}`);
      console.log(`Request body: ${JSON.stringify(req.body)}`);
  
      // Find the course by ID
      const course = await Course.findById(req.params.courseId);
      console.log(`Found course: ${JSON.stringify(course)}`);
  
      // Find the trainee by email
      const trainee = await Trainee.findOne({ email: req.body.email });
      console.log(`Found trainee: ${JSON.stringify(trainee)}`);
  
      // Remove the trainee from the list of requested students for the course
      course.requestedStudents = course.requestedStudents.filter(studentId => !studentId.equals(trainee._id));
      await course.save();
  
      // Remove the course from the list of requested courses for the trainee
      trainee.requestedCourses = trainee.requestedCourses.filter(courseId => !courseId.equals(course._id));
      await trainee.save();
  
      // Add the trainee to the list of registered students for the course
      course.registeredStudents.push(trainee._id);
      await course.save();
  
      // Add the course to the list of registered courses for the trainee
      trainee.registeredCourses.push(course._id);
      await trainee.save();
  
      console.log('Access granted successfully');
  
      // Send a response indicating that the request was successful
      res.send({ success: true });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.send({ success: false, error: error.message });
    }
  });

  
  router.post('/notifications', async (req, res) => {
    try {
      console.log('Received request for notifications');
  
      // Process the request body as needed
  
      // Find all courses with requested students
      const courses = await Course.find({ requestedStudents: { $exists: true, $not: {$size: 0} } });
      console.log(`Found courses: ${JSON.stringify(courses)}`);
  
      // Extract the relevant information for each request (course ID and trainee email)
      const requests = courses.map(course => {
        return {
          courseId: course._id,
          email: course.requestedStudents[0].email
        };
      });
  
      console.log(`Sending notifications: ${JSON.stringify(requests)}`);
  
      // Send the list of requests as a response
      res.send(requests);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.send({ error: error.message });
    }
  });
  
  
  router.post('/reject-access/:courseId', async (req, res) => {
    try {
      console.log(`Received request to reject access for course with ID: ${req.params.courseId}`);
      console.log(`Request body: ${JSON.stringify(req.body)}`);
  
      // Find the course by ID
      const course = await Course.findById(req.params.courseId);
      console.log(`Found course: ${JSON.stringify(course)}`);
  
      // Find the trainee by email
      const trainee = await Trainee.findOne({ email: req.body.email });
      console.log(`Found trainee: ${JSON.stringify(trainee)}`);
  
      // Remove the trainee from the list of requested students for the course
      course.requestedStudents = course.requestedStudents.filter(studentId => !studentId.equals(trainee._id));
      await course.save();
  
      // Remove the course from the list of requested courses for the trainee
      trainee.requestedCourses = trainee.requestedCourses.filter(courseId => !courseId.equals(course._id));
      await trainee.save();
  
      console.log('Access request rejected successfully');
  
      // Send a response indicating that the request was successful
      res.send({ success: true });
    } catch (error) {
      // Handle any errors that occur during the request
      console.error(error);
      res.send({ success: false, error: error.message });
    }
  });

  router.post('/registered-courses', async (req, res) => {
    try {
      // Find the logged in user by email or other identifier
      const user = await Student.findOne({ Email: req.body.email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  

      const registeredCourses = await Course.find({
        _id: { $in: user.registeredCourses },
      });
  

      return res.json(registeredCourses);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  router.post('/student/balance', async (req, res) => {
    try {
      const student = await Student.findOne({ email: req.body.email });
      res.send({ walletBalance: student.walletBalance });
    } catch (error) {
      res.status(500).send({ error: 'Error getting student balance' });
    }
  });

  router.post('/student/deposit', async (req, res) => {
    try {
      const student = await Student.findOneAndUpdate(
        { email: req.body.email },
        { $inc: { walletBalance: req.body.amount } }
      );
      res.send({ message: 'Funds deposited successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Error depositing funds' });
    }
  });

  async function fetchStudentCourses(studentId) {
    const student = await Student.findById(studentId).populate('registeredCourses')
    return student.registeredCourses
  }
  
  router.post('/fetch-student-courses', async (req, res) => {
    try {
      const studentId = req.body.studentId
      const courses = await fetchStudentCourses(studentId)
      res.json(courses)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  })


  router.post('/report-problem', async (req, res) => {
    try {
      const problem = new Problem({
        Problem: req.body.Problem,
        CourseName: req.body.CourseName
      });
      await problem.save();
      res.send({ message: 'Problem reported successfully' });
    } catch (error) {
      res.status(500).send({ error: 'Error reporting problem' });
    }
  });

  router.post('/problems', async (req, res) => {
    try {
      const problems = await Problem.find();
      res.send(problems);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching problems' });
    }
  });

  router.post('/mark-problem-as-resolved', async (req, res) => {
    try {
      const { problemId } = req.body;
      // find the problem in the "Problem" collection
      const problem = await Problem.findById(problemId);
      if (!problem) {
        // if the problem doesn't exist, return an error
        return res.status(404).send({ error: 'Problem not found' });
      }
      // create a new document in the "SolvedProblem" collection
      const solvedProblem = new SolvedProblem({
        Problem: problem.Problem,
        CourseName: problem.CourseName,
      });
      // save the new document in the "SolvedProblem" collection
      await solvedProblem.save();
      // delete the problem from the "Problem" collection
      await problem.delete();
      // return a success message
      res.send({ message: 'Problem marked as resolved' });
    } catch (error) {
      res.status(500).send({ error: 'Error marking problem as resolved' });
    }
  });

  router.post('/resolved-problems', async (req, res) => {
    try {
      // fetch the resolved problems from the "SolvedProblem" collection
      const resolvedProblems = await SolvedProblem.find();
      // return the resolved problems in the response
      res.send(resolvedProblems);
    } catch (error) {
      res.status(500).send({ error: 'Error fetching resolved problems' });
    }
  });


  router.post('/popularcourses', async (req, res) => {
    try {
      // Populate the `registeredStudents` array for each course
      const courses = await Course.find().populate('registeredStudents');
  
      // Map the courses array to an array of objects with course details and the number of students
      const coursesWithStudentCount = courses.map(course => {
        return {
          title: course.title,
          subtitle: course.subtitle,
          price: course.price,
          summary: course.summary,
          Subject: course.Subject,
          Promotion: course.Promotion,
          hasPromo: course.hasPromo,
          pdfs: course.pdfs,
          studentCount: course.registeredStudents.length
        }
      });
  
      res.json(coursesWithStudentCount);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  router.post('/rate', async (req, res) => {
    try {
      // find the course in the database
      const course = await Course.findById(req.body.courseId);
      if (!course) {
        return res.status(404).send({ message: 'Course not found' });
      }
      // add the new rating to the ratings array
      course.ratings.push({
        rating: req.body.rating,
        userId: req.body.userId,
      });
      // calculate the new average rating
      const sum = course.ratings.reduce((acc, r) => acc + r.rating, 0);
      course.avgRating = sum / course.ratings.length;
      // save the updated course document
      await course.save();
      res.send({ message: 'Course rated successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
  
  router.post('/avg-rating', async (req, res) => {
    try {
      // find the course in the database
      const course = await Course.findById(req.body.courseId);
      if (!course) {
        return res.status(404).send({ message: 'Course not found' });
      }
      // return the average rating
      res.send({ avgRating: course.avgRating });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });
  
  
  
  
  
  
  
  
  
  
  module.exports = router;


  
  
  
  




  

        
  
  
  
  
  
  
  




  

 
  

module.exports = router