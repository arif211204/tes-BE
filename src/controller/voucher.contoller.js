const sendResponse = require('../utils/sendResponse');
const { ResponseError } = require('../errors');
const { Sequelize, sequelize, Voucher, Product } = require('../models');

const voucherController = {
  getVouchers: async (req, res) => {
    try {
      const voucherData = await Voucher.findAll({
        include: [{ model: Product, attributes: { exclude: ['image'] } }],
      });

      sendResponse({ res, statusCode: 200, data: voucherData });
    } catch (error) {
      sendResponse({ res, error });
    }
  },

  createVoucher: async (req, res) => {
    try {
      const { code, name, diskon, productId, status } = req.body;
  
   
      if (status && !['active', 'inactive'].includes(status)) {
        throw new ResponseError('Invalid status value', 400);
      }
  
      await sequelize.transaction(async (t) => {
        const [voucherData, isCreated] = await Voucher.findOrCreate({
          where: { code },
          defaults: { code, name, diskon, status }, 
          transaction: t,
        });
  
        if (!isCreated)
          throw new ResponseError('Voucher code already exists', 400);
  
        if (productId && productId.length > 0) {
          const productsData = await Product.findAll({
            attributes: ['id'],
            where: { id: productId },
            transaction: t,
          });
  
          if (productsData.length !== productId.length)
            throw new ResponseError('Invalid productIds', 400);
  
          await voucherData.setProducts(productId, { transaction: t });
        }
  
        const result = await Voucher.findByPk(voucherData.code, {
          include: [{ model: Product }],
          transaction: t,
        });
  
        sendResponse({ res, statusCode: 201, data: result });
      });
    } catch (error) {
      sendResponse({ res, error });
    }
  }
  
};

module.exports = voucherController;
