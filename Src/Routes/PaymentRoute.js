const express = require('express')
const router = express.Router()
const {
    PaymentController
} = require('../Controller/PaymentController')

router.post('/checkout', PaymentController)

module.exports = router;