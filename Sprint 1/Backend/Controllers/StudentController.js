const Student = require('../Models/Studentmodel')
const jsonwebtoken = require('jsonwebtoken')
const Studentmodel = require('../Models/Studentmodel')
const CourseModel = require('../Models/CourseModel')


const GenerateToken = (_id) => {
    return jsonwebtoken.sign({_id} , process.env.Konafa_bel_laban, {expiresIn: '1d'})
}
//login
const StudentLogin = async (req, res) => {
    const {Email, Password} = req.body
    try{
        const student = await Student.login(Email, Password)
    
        //Tokenization
        const token = GenerateToken(student._id)
        
        res.status(200).json({Email, token})
    } catch(error){
        res.status(400).json({Error: error.message})
    }
}


//sign up
const StudentSignup = async (req, res) => {
const {FirstName, Lastname, Username, Email, Password} = req.body

try{
    const student = await Student.signup(FirstName, Lastname, Username, Email, Password)

    //Tokenization
    const token = GenerateToken(student._id)

    res.status(200).json({Email, token})
} catch(error){
    res.status(400).json({Error: error.message})
}

}


module.exports = {StudentLogin, StudentSignup}