const jwt = require('jsonwebtoken')
const Admin = require('../Models/AdminModel')

const RequireAuth = async (req, res, next) => {
    
    //Verify admin is logged in
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: 'log in yla'})
    }

    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.Konafa_bel_laban)
        req.admin = await Admin.findOne({_id}).select('_id')
        next()

    } catch (error){
        console.log(error)
        res.status(401).json({error: 'Request unauthorized'})
    }
}

module.exports = RequireAuth
