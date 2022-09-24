
const { AdminAuth } = require('../../middleware/Auth');
const { register, login,updateRole, deleteUser, getUsers } = require('./userControllers');

const router = require('express').Router();
router.post('/register',  register)
router.post('/login', login)
router.put('/updateRole', AdminAuth, updateRole)
router.delete('/deleteUser', AdminAuth, deleteUser)
router.get('/getUsers', getUsers)
module.exports = router