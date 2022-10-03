const express = require('express');

const router = express.Router();
const Bouquet = require('./db/models/bouquet')
const Shop = require('./db/models/shop')

router.get('/', (req, res) => {
   console.log('test')

   res.send('test')
})

router.get('/bouquet/:id', async (req, res) => {
     try {
      const {id} = req.params;
      const bouquet = await Bouquet.query().findById(id);
      res.json(bouquet)
   } catch (err) {
      console.log(err)
      res.status(500).json(err)
   }
})

router.get('/shop/:id', async(req, res) => {
      try {     
      const {id} = req.params;
      const shop = await Shop.query().findById(id);
      res.json(shop)
   } catch (err) {
      console.log(err)
      res.status(500).json(err)
   }
})

module.exports = router;
