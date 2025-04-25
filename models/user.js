"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
      Contact: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          len: {
            args: [11, 11],
            msg: "Contact must be 11 digits long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
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
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
