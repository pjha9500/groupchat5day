const express = require('express')
const router=express.Router()
const messageController=require('../controllers/message')
const authenticateController = require('../authenticate/authenticate')


router.post('/addMessage',authenticateController.authenticateToken,messageController.addMessage)
router.get('/getMessage',authenticateController.authenticateToken,messageController.getMessages)
module.exports=router