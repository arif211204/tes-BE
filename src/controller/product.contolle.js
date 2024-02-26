const { Product } = require('../models');
const sendResponse = require('../utils/sendResponse');
const { ResponseError } = require('../errors');

const productController = {
    getAllProduct: async (req, res) => {
        try {
            const data = await Product.findAll()
            sendResponse({res, statusCode:200, data:data})
        } catch (error) {
            sendResponse({res, error})

        }
    },
    getProductById: async (req, res) => {
        try {
            const data = await Product.findByPk(req.params.id)
            if (!data) throw new ResponseError('product not found', 404)
            sendResponse({res, statusCode:200, data: data})
        } catch (error) {
            sendResponse({res, error})

        }
    },
    createNewProduct: async (req, res) => {
        try {
            const data = { ...req.body }
            const newProduct = await Product.create(data)
            sendResponse({res, statusCode:200,data:newProduct})
        } catch (error) {
            sendResponse({res, error})
        }
    },
    updateProduct: async (req, res) => {
        try {
            const [data] = await Product.update(req.body, { where: { id: req.params.id }})
            if (data === 0) throw ResponseError('product not found', 404)
            sendResponse({res, statusCode:200,})
        } catch (error) {
            sendResponse({res, error})
        }
    },
    deletedProduct: async (req, res) => {
        try {
            const data = await Product.destroy({ where: { id: req.params.id } })
            if (!data) throw new ResponseError('product not found', 404)
            sendResponse({res, statusCode:200})
        } catch (error) {
        }
    }
}
module.exports = productController