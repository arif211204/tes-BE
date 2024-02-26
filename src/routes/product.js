const express = require('express')
const productsController = require('../controller/product.contolle')

const routes = express.Router()

routes.get('/',productsController.getAllProduct)
routes.get('/:id',productsController.getProductById)
routes.post('/',productsController.createNewProduct)
routes.patch('/:id',productsController.updateProduct)
routes.delete('/:id',productsController.deletedProduct)

module.exports = routes;
