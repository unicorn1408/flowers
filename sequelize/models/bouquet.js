'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bouquet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shop, Flower}) {
      // define association here 
      this.belongsTo(Shop, {foreignKey: 'shop_id', as: 'shop'})
      this.belongsToMany(Flower, {through: 'composition', as: 'flowers'})
    }

    toJSON() {
      return {...this.get(), id: undefined, shop_id: undefined}
    }
  }
  Bouquet.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    bouquet_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'There must be an bouquet name'},
        notEmpty: {msg: 'Bouquet name must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'bouquets',
    modelName: 'Bouquet',
  });

  return Bouquet;
};