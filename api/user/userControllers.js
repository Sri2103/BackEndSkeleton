const { json } = require('express');
const User = require('../../DB/Models/user');
exports.register = async (req,res,next) =>{
    const {userName, password} = req.body;
    if (password && password.length <6){
        return res.status(400).json({message:"Password is less than six characters"})
    }

    try {
        await User.create({userName, password}).then(user => res.status(200).json({
            message:"User created successfully",
            user
        }) )
    }catch(err){
        res.status(401).json({message:"User not created successfully", error: err.message})
    }
}

exports.login = async (req, res, next) =>{
    const {userName, password} = req.body;
    if (!userName || !password) return res.status(401).json({message:"userName or password is not provided"})
    try {
        
    const user = await User.findOne({userName, password})
    if (!user) return res.status(401).json(
        {   "message":"Login failed",
            error:"User not found"})
    }catch(err){
        res.status(400).json({
            "message": "An error occured",
            "error":err.message,
        }
        )
      

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