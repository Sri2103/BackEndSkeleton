require('dotenv').config();
const Mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI

const connectDB = async() =>{
    await Mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log("Connected to MongoDB")
}

module.exports = connectDB