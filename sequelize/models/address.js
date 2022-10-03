'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Shop}) {
      // define association here
      this.belongsTo(Shop, {foreignKey: 'shop_id', as: 'shop'})
    }

    toJSON() {
      return {...this.get(), id: undefined, shop_id: undefined}
    }
  }
  
  Address.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'There must be an address'},
        notEmpty: {msg: 'Address must not be empty'}
      }
    }
  }, {
    sequelize,
    tableName: 'addresses',
    modelName: 'Address',
  });
  return Address;
};