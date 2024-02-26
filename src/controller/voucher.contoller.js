const sendResponse = require('../utils/sendResponse');
const { ResponseError } = require('../errors');
const { Sequelize, sequelize, Voucher, Product } = require('../models');

const voucherController = {
  getVouchers: async (req, res) => {
    try {
      const voucherData = await Voucher.findAll({
        include: [{ model: Product }],
      });

      sendResponse({ res, statusCode: 200, data: voucherData });
    } catch (error) {
      sendResponse({ res, error });
    }
  },

  createVoucher: async (req, res) => {
    try {
      const { kode, diskon, ProductVoucher, status } = req.body;

      if (status && !['active', 'inactive'].includes(status)) {
        throw new ResponseError('Invalid status value', 400);
      }

      await sequelize.transaction(async (t) => {
        const [voucherData, isCreated] = await Voucher.findOrCreate({
          where: { kode },
          defaults: { kode, diskon, status },
          transaction: t,
        });

        if (!isCreated)
          throw new ResponseError('Voucher code already exists', 400);

        if (ProductVoucher && ProductVoucher.length > 0) {
          const productsData = await Product.findAll({
            attributes: ['id'],
            where: { id: ProductVoucher },
            transaction: t,
          });

          if (productsData.length !== ProductVoucher.length)
            throw new ResponseError('Invalid productIds', 400);

          // Associate products with the voucher
          await voucherData.setProducts(productsData, { transaction: t });
        }

        // Fetch the result with associated products
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
