const router = require('express').Router()

const getAppHealthChecker = require('../controller/app')
const getHomeController = require('../controller/BlogRoute')

router.get('/health',  getAppHealthChecker)
router.get('/', getHomeController)

module.exports = router