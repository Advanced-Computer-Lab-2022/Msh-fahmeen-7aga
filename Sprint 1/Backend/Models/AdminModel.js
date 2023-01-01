const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const AdminSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
}, {timestamps: true})

//Signup
AdminSchema.statics.signup = async function(FirstName, Lastname, Email, Password)  {

    //Validation
    if(!FirstName || !Lastname || !Email || !Password){
        throw Error('Please fill all fields')
    }
    if(!validator.isEmail(Email)){
        throw Error('Please enter a valid Email.')
    }
    if(!validator.isStrongPassword(Password)){
        throw Error('Please use stronger Password')
    }

    const Emailexists = await this.findOne({Email})

    if (Emailexists){
        throw Error('Credential already in use')
    }

    const Security = await bcrypt.genSalt(8)
    const Hash = await bcrypt.hash(Password, Security)
    const Admin = await this.create({FirstName, Lastname, Email, Password: Hash})

    return Admin
}

//login
AdminSchema.statics.login = async function(Email, Password) {
    const admin = await this.findOne({Email})

    if (!admin){
        throw Error('Email is incorrect or does not exist')
    }

    const success = await bcrypt.compare(Password, admin.Password)

    if(!success){
        throw Error('Password incorrect')
    }

    return admin
}

module.exports = mongoose.model('Admin', AdminSchema)
