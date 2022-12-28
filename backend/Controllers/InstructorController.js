const Instructor = require('../Models/InstructorModel')
const jsonwebtoken = require('jsonwebtoken')

const GenerateToken = (_id) => {
    return jsonwebtoken.sign({_id} , process.env.Konafa_bel_laban, {expiresIn: '1d'})
}
//login
const InstructorLogin = async (req, res) => {
    const {Email, Password} = req.body
    try{
        const instructor = await Instructor.login(Email, Password)
    
        //Tokenization
        const token = GenerateToken(instructor._id)
    
        res.status(200).json({Email, token})
    } catch(error){
        res.status(400).json({Error: error.message})
    }
}


//sign up
const InstructorSignup = async (req, res) => {
const {FirstName, Lastname, Email, Password} = req.body

try{
    const instructor = await Instructor.signup(FirstName, Lastname, Email, Password)

    //Tokenization
    const token = GenerateToken(instructor._id)

    res.status(200).json({Email, token})
} catch(error){
    res.status(400).json({Error: error.message})
}

}

const GetInstructor = async (req, res) => {
    const instructor = await Instructor.find({}).sort({createdAt: -1})

    res.status(200).json(instructor)
}

module.exports = {InstructorLogin, InstructorSignup, GetInstructor}