// Throws an exception 
const errorGenerator = function(req,res,next){
    const error = new Error('404 Resource Not found')
    error.statis = 404;
    next(error);
}

// Error Handler

const errorHandler = function(err,req,res,next){
    if(err.status){
        return res.status(err.status).json({ message: err.message });
    }

    res.status(500).json({ message: 'Internal Server Error' });
}
module.exports = {errorGenerator,errorHandler}