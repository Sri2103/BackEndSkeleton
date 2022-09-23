
const { register, login,updateRole } = require('./userControllers');

const router = require('express').Router();
router.post('/register', register)
router.post('/login', login)
router.post('/updateRole', updateRole)
module.exports = router