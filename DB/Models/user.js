const Mongoose = require('mongoose')

const UserSchema = new Mongoose.Schema({
    userName:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        minLength:6,
        required: true,
    },
    role:{
        type: String,
        default: "Basic",
        required: true,
    }
})

const User = Mongoose.model('User', UserSchema,"users")
module.exports = User
