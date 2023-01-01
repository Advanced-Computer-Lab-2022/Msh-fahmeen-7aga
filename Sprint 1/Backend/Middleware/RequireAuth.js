const jwt = require('jsonwebtoken')
const Student = require('../Models/Studentmodel')

const RequireAuth = async (req, res, next) => {
    
    //Verify student is logged in
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'authorization failed'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.Konafa_bel_laban)
        req.student = await Student.findOne({_id}).select('_id')
        next()

    } catch (error){
        console.log(error)
        res.status(401).json({error: 'Request unauthorized'})
    }
}

module.exports = RequireAuth