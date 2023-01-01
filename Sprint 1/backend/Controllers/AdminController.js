const Admin = require('../Models/AdminModel')
const jsonwebtoken = require('jsonwebtoken')

const GenerateToken = (_id) => {
    return jsonwebtoken.sign({_id} , process.env.Konafa_bel_laban, {expiresIn: '1d'})
}
//login
const AdminLogin = async (req, res) => {
    const {Email, Password} = req.body
    try{
        const admin = await Admin.login(Email, Password)
    
        //Tokenization
        const token = GenerateToken(admin._id)
    
        res.status(200).json({Email, token})
    } catch(error){
        res.status(400).json({Error: error.message})
    }
}


//sign up
const AdminSignup = async (req, res) => {
const {FirstName, Lastname, Email, Password} = req.body

try{
    const admin = await Admin.signup(FirstName, Lastname, Email, Password)

    //Tokenization
    const token = GenerateToken(admin._id)

    res.status(200).json({Email, token})
} catch(error){
    res.status(400).json({Error: error.message})
}

}

const GetAdmin = async (req, res) => {
    const admin = await Admin.find({}).sort({createdAt: -1})

    res.status(200).json(admin)
}


  

module.exports = {AdminLogin, AdminSignup, GetAdmin}
