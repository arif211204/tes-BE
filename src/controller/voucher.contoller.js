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
      await sequelize.transaction(
        {
          isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE,
        },
        async (t) => {
          const [voucherData, isCreated] = await Voucher.findOrCreate({
            where: { code: req.body.code },
            defaults: req.body,
            fields: ['code', 'name', 'diskon'],
            transaction: t,
          });
          if (!isCreated)
            throw new ResponseError('voucher code already exist', 400);

          if (req.body?.productId && req.body.productId.length > 0) {
            req.body.productId = [...new Set(req.body.productId)];

            const productsData = await Product.findAll({
              attributes: ['id'],
              where: { id: req.body.productId },
              transaction: t,
            });
            if (productsData?.length !== req.body.productId.length)
              throw new ResponseError('invalid productId', 400);

            await voucherData.setProducts(req.body.productId, {
              transaction: t,
            });
          }

          const result = await Voucher.findByPk(voucherData.code, {
            include: [{ model: Product}],
            transaction: t,
          });

          sendResponse({ res, statusCode: 201, data: result });
        }
      );
    } catch (error) {
      sendResponse({ res, error });
    }
  },
};

module.exports = voucherController;
