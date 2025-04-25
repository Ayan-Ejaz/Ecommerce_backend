"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
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
      carrier: {
        type: DataTypes.INTEGER,
        references: {
          model: "carrier",
          key: "id",
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "delivered"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
