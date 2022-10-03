const {Model} = require('objection')

class Bouquet extends Model {
   static get  tableName() {
      return 'bouquets'
   }
}

module.exports = Bouquet;