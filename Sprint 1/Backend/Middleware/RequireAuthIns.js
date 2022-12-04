const jwt = require('jsonwebtoken')
const Instructor = require('../Models/InstructorModel')

const RequireAuth = async (req, res, next) => {
    
    //Verify instructor is logged in
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'log in yla'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.Konafa_bel_laban)
        req.instructor = await Instructor.findOne({_id}).select('_id')
        next()

    } catch (error){
        console.log(error)
        res.status(401).json({error: 'Request unauthorized'})
    }
}

module.exports = RequireAuth