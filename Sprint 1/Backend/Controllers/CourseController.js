const course = require('../Models/CourseModel')
const admin = require('../Models/AdminModel')
const instructor = require('../Models/InstructorModel')
const trainee = require('../Models/TraineeModel')
const instcourse = require('../Models/InstCourses')

const mongoose = require('mongoose')

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



module.exports ={
    GetCourse,
    GetCourses,
    CreateCourse,
    AddAdmin,
    AddInstructor,
    AddTrainee,
    InstCreateCourse,
    InstGetCourses
}