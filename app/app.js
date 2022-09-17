const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('../routes/router');
const DemoMiddleware = require('../middleware/demo');
const { errorGenerator, errorHandler } = require('../errors/errorHandler');
const app = express();
app.use([DemoMiddleware,cors(),morgan('tiny'),router,errorGenerator,errorHandler])


module.exports = app;