'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Voucher.belongsToMany(models.Product, { through: 'ProductVoucher' });
    }
    
  }
  Voucher.init({
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    diskon: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      status: DataTypes.ENUM('active', 'inactive')
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};