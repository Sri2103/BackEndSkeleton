require('dotenv').config()
const User = require('../../DB/Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.jwtSecret
/**
 * to get jswSecret use below string in terminal
 * 
 * node
 * require('crypto').randomBytes(35).toString('hex')
 */
exports.register = async (req,res,next) =>{
    const {userName, password} = req.body;
    if (password && password.length <6){
        return res.status(400).json({message:"Password is less than six characters"})
    }
    bcrypt.hash(password, 10).then(async(hash) =>{
        await User.create({
            userName,
            password:hash
        })
         .then(user =>{
            const maxAge = 3 * 60 * 60;
            const token = jwt.sign({
                id: user._id,
                userName: user.userName,
                role: user.role,
             },jwtSecret, { 
                expiresIn:maxAge 
                });
            res.cookie("token", token,{
                httpOnly: true,
                maxAge: maxAge*1000
            });
             res.status(201).json({
                    message:"User created successfully",
                    user
            }) 
        })
        .catch(err => res.status(400).json({message:"User not created successfully", error: err.message}))
    })    
}

exports.login = async (req, res, next) =>{
    const {userName, password} = req.body;
    if (!userName || !password) return res.status(401).json({message:"userName or password is not provided"})
    try {       
    const user = await User.findOne({userName})
    if (!user) {
        return res.status(401)
            .json({ "message":"Login failed", error:"User not found"})
    }else{
        bcrypt.compare(password, user.password)
            .then(result => {
                if(result){
                    const maxAge = 3 * 60 * 60 ;
                    const token = jwt.sign({id: user._id,userName: user.userName, rolee:user.role}, jwtSecret,{
                       expiresIn: maxAge      
                    })
                res.cookie("token", token,{
                    httpOnly: true,
                    maxAge: maxAge*1000,
                })
                res.status(201).json({message:"Login Successful", user})
            }else{
            res.staus(400).json({message:"Login Failed",})
        }
    })
  }

    }catch(err){
        res.status(400).json({
            "message": "An error occured",
            "error":err.message,
        })
    }
}

exports.updateRole = async (req, res, next) =>{
    const {role, id} = req.body;
    // verify if role and ID are present in the request
    if(role && id){
        if (role === "Admin"){
            await User.findById(id).then((user)=>{
                user.role = role;
                user.save((err) =>{
                    if (err){
                        res.status("400").json({ message:"Error occured", error: err.message})
                        process.exit(1)
                    }else{
                        res.status(201).json({message:"Updated Successful",user})
                    }
                })
            })
        }
    }else{
        res.status(400).json({message: "role and id are not provided"})
    }
}

exports.deleteUser = async(req, res, next) => {
    const {id} = req.body;
    await User.findById(id).then((user)=> user.remove())
        .then(user => res.status(201).json({message:"user Deleted", user}))
        .catch(err => res.status(500).json({message: "An error occured", error: err.message}))
}

exports.getUsers = async(req,res,next) => {
    await User.find({})
        .then(users => {
            const userFunction = users.map(user =>{
                const container = {}
                container.username = user.userName;
                container.role = user.role;
                return container;
            })
            res.status(200).json({user: userFunction})
        })
        .catch(err => res.status(400).json({message: "Not successfull", error: err.message}))
}