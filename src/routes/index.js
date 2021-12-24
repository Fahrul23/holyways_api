const express = require('express');
const{ Login, Register } = require('../controllers/Auth');
const {getUsers, deleteUser} = require('../controllers/User');
const {Auth} = require('../middlewares/Auth')
const router = express.Router()

// Auth
router.post('/login', Login)
router.post('/register', Register)

// Users
router.get('/users', Auth, getUsers)
router.delete('/user/:id', Auth, deleteUser)


module.exports = router