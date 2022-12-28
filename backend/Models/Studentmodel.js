const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const StudentSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    Lastname: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    }
}, {timestamps: true})

//Signup
StudentSchema.statics.signup = async function(FirstName, Lastname, Username, Email, Password)  {

    //Validation
    if(!FirstName || !Lastname || !Username || !Email || !Password){
        throw Error('Please fill all fields')
    }
    if(!validator.isEmail(Email)){
        throw Error('Please enter a valid Email.')
    }
    if(!validator.isStrongPassword(Password)){
        throw Error('Please use stronger Password')
    }

    const Emailexists = await this.findOne({Email, Username})

    if (Emailexists){
        throw Error('Credential already in use')
    }

    const Security = await bcrypt.genSalt(8)
    const Hash = await bcrypt.hash(Password, Security)
    const Student = await this.create({FirstName, Lastname, Username, Email, Password: Hash})

    return Student
}

//login
StudentSchema.statics.login = async function(Email, Password) {
    const student = await this.findOne({Email})

    if (!student){
        throw Error('Email is incorrect or does not exist')
    }

    const success = await bcrypt.compare(Password, student.Password)

    if(!success){
        throw Error('Password incorrect')
    }

    return student
}

module.exports = mongoose.model('Student', StudentSchema)