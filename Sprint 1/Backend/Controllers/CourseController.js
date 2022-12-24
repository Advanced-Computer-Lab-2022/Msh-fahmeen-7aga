const course = require('../Models/CourseModel')
const admin = require('../Models/AdminModel')
const instructor = require('../Models/InstructorModel')
const trainee = require('../Models/TraineeModel')
const instcourse = require('../Models/InstCourses')

const mongoose = require('mongoose')
const CourseModel = require('../Models/CourseModel')
const Studentmodel = require('../Models/Studentmodel')
const { findByIdAndDelete } = require('../Models/CourseModel')

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
        const InstCourses = await course.create({title, subtitle, price, summary, Subject})
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
            
            console.log('Already rated')

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
    CourseModel.findByIdAndUpdate(cid,{$push:{Rating:value}}).then(function(doc){console.log(doc)})
    })
}) 




}
    catch(error){
        res.status(400).json({Error: error.message})
    }
}

const setPromotion = async (req,res) =>{
     const prom = req.body
     const newPrice =  prom.oldPrice - (prom.discount/100) * prom.oldPrice 
     var pr = {oldPrice:prom.oldPrice, discount:prom.discount, until:prom.until}
     await CourseModel.findByIdAndUpdate(prom.cid,{Promotion:pr})
     await CourseModel.findByIdAndUpdate(prom.cid,{hasPromo:true})
     await CourseModel.findByIdAndUpdate(prom.cid,{price:newPrice.toFixed(2)})
     CourseModel.findById(prom.cid).then(function(doc){console.log(doc)})
    
     

}

const checkPromotion = async (req,res)=>{
    const cid = req.body
    var flag;
    const currentTime = new Date().toDateString()
    
    await CourseModel.findById(cid.cid).then(function(doc)
    {if((doc.Promotion.until).toDateString()<currentTime){
        flag = 0;
     CourseModel.findByIdAndUpdate(cid.cid,{price:doc.Promotion.oldPrice})
    .then(CourseModel.findByIdAndUpdate(cid.cid,{hasPromo:false})).then(function(doc){console.log(doc)})
    }})
    if(flag===0){
        await CourseModel.findByIdAndUpdate(cid.cid,{hasPromo:false})
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
    rateCourse,
    setPromotion,
    checkPromotion

}