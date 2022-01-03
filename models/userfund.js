'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userFund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        
    }
  };
  userFund.init({
    userId: DataTypes.INTEGER,
    fundId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userFund',
  });
  return userFund;
};