"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Carrier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Carrier.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      contact: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          is: {
            args: /^[0-9]{11}$/,
            msg: "Contact must be 11 digits",
          },
        },
      },
      Address: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          isValidAddress(value) {
            if (!value.city || value.state) {
              throw new Error("Address must include City and State");
            }
          },
        },
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
          key: "id",
        },
      },
      status: {
        type: DataTypes.ENUM("busy", "free"),
      },
    },
    {
      sequelize,
      modelName: "Carrier",
    }
  );
  return Carrier;
};
