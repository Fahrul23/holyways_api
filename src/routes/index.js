const express = require('express');
const{ Login, Register } = require('../controllers/Auth');
const { addFund, editFund, deleteFund, editDonateFund, getFunds, detailFund } = require('../controllers/Fund');
const {getUsers, deleteUser} = require('../controllers/User');
const {Auth} = require('../middlewares/Auth')
const {uploadFile} = require('../middlewares/uploadFile')
const router = express.Router()


// Auth
router.post('/login', Login)
router.post('/register', Register)

// Users
router.get('/users', Auth, getUsers)
router.delete('/user/:id', Auth, deleteUser)

// Funds
router.get('/funds', getFunds)
router.get('/fund/:id',detailFund)
router.post('/fund', Auth, uploadFile('thumbnail'), addFund)
router.patch('/fund/:id', Auth, uploadFile('thumbnail'), editFund)
router.delete('/fund/:id', Auth, deleteFund)
router.patch('/fund/:fundId/:userId', Auth, editDonateFund)

module.exports = router