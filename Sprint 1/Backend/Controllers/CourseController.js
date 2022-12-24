const course = require('../Models/CourseModel')
const admin = require('../Models/AdminModel')
const instructor = require('../Models/InstructorModel')
const trainee = require('../Models/TraineeModel')
const instcourse = require('../Models/InstCourses')
const student = require('../Models/Studentmodel')

const mongoose = require('mongoose')
const CourseModel = require('../Models/CourseModel')
<<<<<<< Updated upstream
const Studentmodel = require('../Models/Studentmodel')
=======


const multer = require('multer');

const upload = multer({
  dest: 'upload/',
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    },
  }),
});


>>>>>>> Stashed changes

//Get all courses

const GetCourses = async (req, res) => {
    const Courses = await course.find({}).sort({createdAt: -1})

    res.status(200).json(Courses)
}

const InstGetCourses = async (req, res) => {
    const InstCourse = await course.find({}).sort({createdAt: -1})

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
    const{title, subtitle, price, summary, Subject, TA} = req.body
    //adds course to db
    try{
        const Course = await course.create({title, subtitle, price, summary, Subject, TA})
        res.status(200).json(Course)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

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

const rateCourse = async (req,res)=>{
    try{
<<<<<<< Updated upstream
     var value;
     var total;
    const rating = req.body

   
          var tr = {score:rating.newRating,postedBy: rating.email} // POSSIBLE SOL
      
     await CourseModel.find({'totalRating.postedBy':rating.email,_id:rating.cid}).then(function(doc){
        if(doc.length===0){
             CourseModel.findByIdAndUpdate(rating.cid,{$push:{totalRating:tr}},function(err,succ){
                if(err){
                            console.log(err)
                        }
                        else{
                             console.log(succ)
                         }
                       })
        }
        else{
            
            console.log('u done it m8')

        }
        //console.log(doc)
    })


 

    const cid = rating.cid


 CourseModel.aggregate([
     {$match:{_id:mongoose.Types.ObjectId(cid)}},
     {$addFields: { totalRating: {$sum:'$totalRating.score'}}}
    
 ]).exec((err, result) => {
    if (err) {
         console.log(err)
     }
    

   let total = result[0].totalRating //The sum of all ratings
   console.log(value,total)
   CourseModel.aggregate([
    {$match:{_id:mongoose.Types.ObjectId(cid)}},
    {$project:{totalRating:{$size:'$totalRating'}}}
   ]).exec((err,res)=>{
    let value = res[0].totalRating
    console.log(value,total)
    value = total/value
    console.log(value,total)
    CourseModel.findByIdAndUpdate(cid,{Rating:value}).then(function(doc){console.log(doc)})
   })
}) 
=======
        //const{_id} = req.Student
       // console.log(_id)
    console.log('hereyo')
    const rating = req.body
    CourseModel.findOne({title:'ddd'}).then(function(doc){console.log(doc)})
  
    // console.log(rating.cid)
       
     await CourseModel.findByIdAndUpdate(rating.cid,{totalRating:rating.newRating})
       CourseModel.findOne({title:'ddd'}).then(function(doc){console.log(doc)})
   // let alreadyRated= CourseModel.Rating.find((studId)=> studId.postedBy.toString()===_id.toString());
    // if(alreadyRated){
    //     console.log('smth')
    // }
    // else{
    //     console.log('ojkahuishi')
    //     course.Rating
    // }
}
    catch(error){
        res.status(400).json({Error: error.message})
    }
}

const uploadPDF = async (req,res)=>{
    const pdf = req.file;
    console.log(pdf);
  
    // Update the course document in the database
    try {
      const course = await CourseModel.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            exercises: {
              filename: pdf.originalname,
              path: pdf.path,
              uploadDate: Date.now()
            }
          }
        },
        { new: true }
      );
  
      res.status(200).json({ message: 'PDF file added successfully', course });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const Coursetitle = async (req, res) => {
    try {
      const courses = await Course.find({}, 'title');
      res.status(200).send(courses);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  const registerForCourse = async (studentEmail, courseId) => {
    // Find the student by email
    const Student = await student.findOne({ Email: studentEmail });
  
    // Find the course by its ID
    const Course = await course.findById(courseId);
  
    // Check if the student or course does not exist
    if (!Student) {
      return { error: 'Student does not exist' };
    }
  
    if (!Course) {
      return { error: 'Course does not exist' };
    }
  
    // Check if the student is already registered for the course
    if (Student.registeredCourses.includes(Course._id)) {
      return { error: 'Student is already registered for this course' };
    }
  
    // Add the course to the student's list of registered courses
    Student.registeredCourses.push(Course._id);
    await Student.save();
  
    // Add the student to the course's list of registered students
    Course.registeredStudents.push(Student._id);
    await Course.save();
  
    return { message: 'Student registered for course successfully' };
  };

  const registeredCourses = async (req, res) => {
    // Find the student by their email
    const { email } = req.query;
    const Student = await student.findOne({ Email: email });
    if (!Student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
  
    // Find all courses that the student is registered for
    const RegisteredCourses = await course.find({ _id: { $in: Student.registeredCourses } });
    res.status(200).json(RegisteredCourses);
  };
  
  
  


  
 

  
>>>>>>> Stashed changes




<<<<<<< Updated upstream
}
    catch(error){
        res.status(400).json({Error: error.message})
    }
}
=======
>>>>>>> Stashed changes



module.exports ={
    GetCourse,
    GetCourses,
    CreateCourse,
    AddAdmin,
    AddInstructor,
    AddTrainee,
    InstCreateCourse,
    InstGetCourses,
<<<<<<< Updated upstream
    rateCourse

}
=======
    rateCourse,
    uploadPDF,
    Coursetitle,
    upload,
    registerForCourse,
    registeredCourses
}

>>>>>>> Stashed changes
