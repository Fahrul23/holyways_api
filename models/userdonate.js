'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userDonate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  userDonate.init({
    fundId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    donateAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    proofAttachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userDonate',
  });
  return userDonate;
};