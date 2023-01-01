const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const InstructorSchema = new Schema({
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
InstructorSchema.statics.signup = async function(FirstName, Lastname, Email, Password)  {

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
    const Instructor = await this.create({FirstName, Lastname, Email, Password: Hash})

    return Instructor
}

//login
InstructorSchema.statics.login = async function(Email, Password) {
    const instructor = await this.findOne({Email})

    if (!instructor){
        throw Error('Email is incorrect or does not exist')
    }

    const success = await bcrypt.compare(Password, instructor.Password)

    if(!success){
        throw Error('Password incorrect')
    }

    return instructor
}

module.exports = mongoose.model('Instructor', InstructorSchema)