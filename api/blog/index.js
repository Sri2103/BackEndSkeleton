const router = require('express').Router()
const { DemoMiddleware } = require('../../middleware/demo');
const { blogHome } = require('./blogControllers');

// const getHomeController = require('./BlogRoute')
router.post('/', DemoMiddleware, blogHome  )

module.exports = router
