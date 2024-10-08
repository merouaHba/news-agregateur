const express = require('express')
const router = express.Router()

const { register,
    login,
    logout, getUserDetails } = require('../controllers/authController')
const { authenticateUser } = require('../middlewares/authentication')

router.post('/register', register)
router.post('/login', login)
router.delete('/logout', authenticateUser, logout);
router.get('/user', authenticateUser, getUserDetails);



module.exports = router