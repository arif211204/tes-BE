const express = require('express')
const PaymentyController = require('../controller/paymentType.ccontroller')

const routes = express.Router()

routes.get('/', PaymentyController.getAllPaymentTypes)
routes.post('/',PaymentyController.createPaymentType)


module.exports = routes;
