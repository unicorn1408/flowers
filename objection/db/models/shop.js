const {Model} = require('objection')

class Shop extends Model {
   static get  tableName() {
      return 'shop'
   }

   static get relationMappings() {
      const Address = require('./address')
      return {
         address: {
            relation: Model.HasManyRelation,
            modelClass: Address,
            join: {
               from: 'addresses.shop_id',
               to: 'shop.id'
            }
         }
      }
   }

}

module.exports = Shop;