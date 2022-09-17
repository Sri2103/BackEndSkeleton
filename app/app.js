const getAppHealthChecker = require('../controller/app')
const express = require('express');

const app = express();
app.get('/health',  getAppHealthChecker)

module.exports = app;