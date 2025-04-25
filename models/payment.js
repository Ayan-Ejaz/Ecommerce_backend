"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      transactionId: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      paymentDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      paymentType: {
        type: DataTypes.ENUM("credit", "cash"),
        defaultValue: "cash",
      },
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
