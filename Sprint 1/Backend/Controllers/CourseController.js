const course = require('../Models/CourseModel')
const admin = require('../Models/AdminModel')
const instructor = require('../Models/InstructorModel')
const trainee = require('../Models/TraineeModel')
const instcourse = require('../Models/InstCourses')

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
        //const{_id} = req.Student
       // console.log(_id)
   
    var totRat = ''
    const rating = req.body
     var sum = 0

    // console.log(rating.cid)
    await CourseModel.findById(rating.cid).then(function(doc){rat = doc.totalRating})
    totRat = rat.concat(rating.newRating + " ")
     await CourseModel.findByIdAndUpdate(rating.cid,{totalRating: totRat})
     const num = totRat.split(" ")
          num.forEach((element, index) => {
            if(index != num.length-1)
            sum += parseInt(element)
           
      });
         sum = sum/(num.length-1)
      
    await CourseModel.findByIdAndUpdate(rating.cid,{Rating: sum}).then(function(doc){console.log(doc)})
      
   // let alreadyRated= CourseModel.Rating.find((studId)=> studId.postedBy.toString()===_id.toString());
    // if(alreadyRated){
    //     console.log ('smth')
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



module.exports ={
    GetCourse,
    GetCourses,
    CreateCourse,
    AddAdmin,
    AddInstructor,
    AddTrainee,
    InstCreateCourse,
    InstGetCourses,
    rateCourse

}