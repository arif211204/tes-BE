const express = require('express')
const vouchersController = require('../controller/voucher.contoller')

const routes = express.Router()

routes.get('/',vouchersController.getVouchers)
routes.post('/',vouchersController.createVoucher)


module.exports = routes;
