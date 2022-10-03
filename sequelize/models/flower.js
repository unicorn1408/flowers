'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Bouquet}) {
      // define association here
      this.belongsToMany(Bouquet, {through: 'composition', as: 'bouquets'})
    }
  }
  Flower.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    flower_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'There must be an flower name'},
        notEmpty: {msg: 'Flower name must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'flowers',
    modelName: 'Flower',
  });
  return Flower;
};