const DemoMiddleware = function(req,res,next){
    console.log("Check as a Middleware")
    next()
}
module.exports = {DemoMiddleware}