const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const api = require('../routes/router');
const {DemoMiddleware} = require('../middleware/demo');
const { errorGenerator, errorHandler } = require('../errors/errorHandler');
const { AdminAuth, userAuth } = require('../middleware/Auth');
const app = express();

/*
* 
*/
app.use(express.json())
app.use([cors(),morgan('short')])
app.use(cookieParser());
app.use('/api', api)
app.use([errorGenerator,errorHandler])
app.get('/health', function(req,res){
    res.json({message:"Server is ready"})
})



module.exports = app;