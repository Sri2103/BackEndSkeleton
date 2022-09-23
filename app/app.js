const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const api = require('../routes/router');
const {DemoMiddleware} = require('../middleware/demo');
const { errorGenerator, errorHandler } = require('../errors/errorHandler');
const app = express();

/*
* 
*/
app.use(express.json())
app.use([cors(),morgan('short')])
app.use('/api', api)
app.use([errorGenerator,errorHandler])
app.use(cookieParser());
app.get('/health', function(req,res){
    res.json({message:"Server is ready"})
})



module.exports = app;