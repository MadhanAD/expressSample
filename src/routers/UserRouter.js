const express = require('express')

const userModel = require('./../models/UserModel')
const Logger =  require('./../utils/Logger')
const TAG ='UserRouter '

const router = express.Router()

router.get('/getUser/:userId', (req,res,next) => {
    // userModel.insertUser(req,res,next)
})

router.get('/getAllUser',(req,res,next) => {
    userModel.getAllUsers(req,res,next)
})

router.post('/addUser',(req,res,next) => {
    userModel.insertUser(req,res,next)
})


module.exports = router