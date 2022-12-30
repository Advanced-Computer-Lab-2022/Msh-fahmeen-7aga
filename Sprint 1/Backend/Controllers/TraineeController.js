const Trainee = require('../Models/TraineeModel')
const jsonwebtoken = require('jsonwebtoken')

const Course = require('../Models/CourseModel')

const GenerateToken = (_id) => {
return jsonwebtoken.sign({_id} , process.env.Konafa_bel_laban, {expiresIn: '1d'})
}
//login
const TraineeLogin = async (req, res) => {
const {Email, Password} = req.body
try{
const trainee = await Trainee.login(Email, Password)
    //Tokenization
    const token = GenerateToken(trainee._id)

    res.status(200).json({Email, token})
} catch(error){
    res.status(400).json({Error: error.message})
}
}

//sign up
const TraineeSignup = async (req, res) => {
const {FirstName, Lastname, Email, Password} = req.body

try{
const trainee = await Trainee.signup(FirstName, Lastname, Email, Password)

//Tokenization
const token = GenerateToken(trainee._id)

res.status(200).json({Email, token})

} catch(error){
    res.status(400).json({Error: error.message})
    }
    
    }
    
    const GetTrainee = async (req, res) => {
    const trainee = await Trainee.find({}).sort({createdAt: -1})

    res.status(200).json(trainee)

}



  

module.exports = {TraineeLogin, TraineeSignup, GetTrainee}