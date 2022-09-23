const router =  require('express').Router()
const user = require('../api/user/index')
const blog = require('../api/blog/index')
const DemoMiddleware = require('../middleware/demo')

router.use('/user',user)
router.use('/blog', blog)

module.exports = router