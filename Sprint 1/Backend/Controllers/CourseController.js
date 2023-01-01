const course = require('../Models/CourseModel')
const admin = require('../Models/AdminModel')
const instructor = require('../Models/InstructorModel')
const trainee = require('../Models/TraineeModel')
const instcourse = require('../Models/InstCourses')
const student = require('../Models/Studentmodel')


const mongoose = require('mongoose')
const CourseModel = require('../Models/CourseModel')







//Get all courses

const GetCourses = async (req, res) => {
    const Courses = await course.find({}).sort({createdAt: -1})

    res.status(200).json(Courses)
}

const InstGetCourses = async (req, res) => {
    const InstCourse = await instcourse.find({}).sort({createdAt: -1})

    res.status(200).json(InstCourse)
}

//Get single course

const GetCourse = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'Course does not exist'})
    }

    const Course = await course.findById(id)

    if(!Course){
        return res.status(404).json({error: 'Course does not exist'})
    }

    res.status(200).json(Course)
}

//Add new course



const CreateCourse = async (req, res) => {
  // retrieve fields from request body
  const { title, subtitle, price, summary, Subject, videoId, pdfs, lessonVideoIds: [...lessonVideoIds] } = req.body;

  try {

    const Course = await course.create({
      title,
      subtitle,
      price,
      summary,
      Subject,
      videoId,
      pdfs,
      lessonVideoIds,
    });
    res.status(200).json(Course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const InstCreateCourse = async (req, res) => {
    const{title, subtitle, price, summary, Subject} = req.body
    //adds course to db
    try{
        const InstCourses = await instcourse.create({title, subtitle, price, summary, Subject})
        res.status(200).json(InstCourses)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//add adminstrator
const AddAdmin = async (req, res) => {
    const{Username, Password} = req.body
    //adds credentials to db
    try{
        const Admin = await admin.create({Username, Password})
        res.status(200).json(Admin)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//add Instructor
const AddInstructor = async (req, res) => {
    const{Username, Password} = req.body
    //adds credentials to db
    try{
        const Instructor = await instructor.create({Username, Password})
        res.status(200).json(Instructor)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//add Trainee
const AddTrainee = async (req, res) => {
    const{Username, Password} = req.body
    //adds credentials to db
    try{
        const Trainee = await trainee.create({Username, Password})
        res.status(200).json(Trainee)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}





const registerForCourse = async (studentEmail, courseId) => {
  const Student = await student.findOne({ Email: studentEmail });

  const Course = await course.findById(courseId);

  if (!Student) {
    return { error: 'Student does not exist' };
  }

  if (!Course) {
    return { error: 'Course does not exist' };
  }


  if (Student.registeredCourses.includes(Course._id)) {
    return { error: 'Student is already registered for this course' };
  }


  Student.registeredCourses.push(Course._id);
  await Student.save();

  Course.registeredStudents.push(Student._id);
  await Course.save();

  return { message: 'Student registered for course successfully' };
};





  const downloadCoursePDF = async (req, res) => {
    const { id } = req.params;
  
    const course = await CourseModel.findById(id);
  
    if (!course) {
      return res.status(404).send('Course not found');
    }
  
    if (!course.pdf) {
      return res.status(404).send('Course has no PDF file');
    }
  
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="' + course.pdf.name + '"');
  
    res.send(course.pdf.file);
  };

  async function getBalance(req, res)  {
    try {
      const studentId = req.get('studentId');
  
      const Student = await student.findById(studentId);
  
      if (!Student) {
        return res.status(304).json({ success: false, error: 'Student not found' });
      }
  
      res.json({ success: true, balance: Student.walletBalance });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
  async function updateBalance(req, res) {
    try {
      const studentId = req.get('studentId');
      const { action, amount } = req.body;

      if (!['deposit', 'purchase'].includes(action)) {
        return res.status(400).json({ success: false, error: 'Invalid action' });
      }
      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ success: false, error: 'Invalid amount' });
      }
  
      let Student;
  
      if (action === 'deposit') {
        Student = await student.findByIdAndUpdate(
          studentId,
          { $inc: { walletBalance: amount } },
          { new: true }
        );
      } else if (action === 'purchase') {
        Student = await student.findById(studentId);
        if (Student.walletBalance < amount) {
          return res.status(400).json({ success: false, error: 'Insufficient funds' });
        }
  
        Student = await student.findByIdAndUpdate(
          studentId,
          { $inc: { walletBalance: -amount } },
          { new: true }
        );
      }
  
      res.json({ success: true, student });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };


  
  
  
  
  
  
  
  
  
  


  



  
  
  


  
 

  







module.exports ={
    GetCourse,
    GetCourses,
    CreateCourse,
    AddAdmin,
    AddInstructor,
    AddTrainee,
    InstCreateCourse,
    InstGetCourses,
    registerForCourse,
    downloadCoursePDF,
    getBalance,
    updateBalance,
}

