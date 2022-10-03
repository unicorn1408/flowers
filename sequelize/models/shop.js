'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Address, Bouquet}) {
      // define association here
      this.hasOne(Address, {foreignKey: 'shop_id', as: 'address'})
      this.hasMany(Bouquet, {foreignKey: 'shop_id', as: 'bouquets'})
    }

    toJSON() {
      return {...this.get(), id: undefined }
    }
  }
  Shop.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Shop must have a name'},
        notEmpty: {msg: 'Name must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'shops',
    modelName: 'Shop',
  });
  return Shop;
};