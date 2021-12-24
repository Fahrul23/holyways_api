const express = require('express')
const{ Login } = require('../controllers/Auth');

const router = express.Router()

// Auth
router.post('/login', Login)

module.exports = router