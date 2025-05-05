

const express = require('express');
const {getAllUsers,createUser,login,auth,adminAuth} = require('../controllers/userController')

const router  = express.Router()

router.get('/users',adminAuth,getAllUsers)
router.get('/auth',auth)
router.get('/adminAuth',adminAuth)
router.post('/createUser',createUser)
router.post('/login',login)





module.exports=router;
  
