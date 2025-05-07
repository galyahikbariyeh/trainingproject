const express = require('express');
const {getPaymentPage,processPayment} = require('../controllers/payController')

const router  = express.Router()

router.get('/pay',getPaymentPage)
router.post('/processPayment',processPayment)






module.exports=router;