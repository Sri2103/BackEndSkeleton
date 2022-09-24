require('dotenv').config()
const jwt = require('jsonwebtoken');
const jwtToken = process.env.jwtToken

//Admin Authentication
exports.AdminAuth = (req,res,next) => {
    const {token} = req.cookies.token;
    if(token){
        jwt.verify(token, jwtToken,(error, decodedToken) =>{
            if(error) {
                return res.status(401).json({message:"Not Authorized"})
            }else{
                if(decodedToken.role !== "Admin"){
                    return res.status(401).json({message:"Not authorized"})
                }else{
                    next()
                }
            }
        })
    }else{
        res.status(401).json({message:"Not authorized, token not available"})
    }
}
//Basic AUthentication
exports.userAuth = (req,res,next) =>{
    const token = req.cookies.token
   if(token){
        jwt.verify(token, jwtToken,(error, decodedToken) =>{
            if(error) {
                return res.status(401).json({message:"Not authorized"})
            }else{
                if(decodedToken.role !== "Basic"){
                    res.status(401).json({message:"Not authorized"})
                }else{
                    next()
                }
            }
        })
   }else{
    res.status(401).json({message:"Not authorized, token not available"})
   }
}