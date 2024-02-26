'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Product.associate = function(models) {
            Product.belongsToMany(models.Voucher, { through: 'ProductVoucher' });
        };
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    Price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};