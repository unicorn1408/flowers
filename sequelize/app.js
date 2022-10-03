const express = require('express');

const {sequelize, Shop, Address, Bouquet, Flower} = require('./models');

const app = express();
app.use(express.json())

app.post('/shops', async(req, res) => {
   const {name} = req.body;

   try {
      const shop = await Shop.create({name})

      return res.json(shop)
   } catch (err) {
      console.log(err)
      return res.status(500).json(err)
   }
})

app.get('/shops', async (req, res) => {
   try {
      const shops = await Shop.findAll({include: 'address'})

      return res.json(shops)
   } catch(err) {
      console.log(err)
      return res.status(500).json({err: 'something went wrong'})
   }
})

app.get('/shops/:uuid', async (req, res) => {
   const uuid = req.params.uuid
   try {
      const shop = await Shop.findOne({
         where: {uuid},
         include: 'address'
      })

      return res.json(shop)
   } catch(err) {
      console.log(err)
      return res.status(500).json({err: 'something went wrong'})
   }
})

app.put('/shops/:uuid', async (req, res) => {
   const uuid = req.params.uuid
   
   const {name} = req.body
   try {
      const shop = await Shop.findOne({where: {uuid}})

      shop.name = name

      console.log(shop)
      await shop.save()

      return res.json(shop)
   } catch(err) {
      console.log(err)
      return res.status(500).json({err: 'something went wrong'})
   }
})

app.delete('/shops/:uuid', async (req, res) => {
   const uuid = req.params.uuid
   try {
      const shop = await Shop.findOne({where: {uuid}})

      await shop.destroy()
      return res.json({message: 'Shop is deleted'})
   } catch(err) {
      console.log(err)
      return res.status(500).json({err: 'something went wrong'})
   }
})

app.post('/addresses', async(req, res) => {
   const {shopUuid, address} = req.body
   try {
      const shop = await Shop.findOne({
         where: {uuid: shopUuid},
      })

      const newAddress = await Address.create({
         address, shop_id: shop.id
      })

      return res.json(newAddress)
   } catch(err) {
      console.log(err)
      res.status(500).json(err)
   }
})

app.get('/addresses', async(req, res) => {
   try {
      const addresses = await Address.findAll({include: 'shop'})

      return res.json(addresses)
   } catch(err) {
      console.log(err)
      res.status(500).json(err)
   }
})

app.post('/bouquets', async(req, res) => {
   const {shopUuid, bouquet_name} = req.body
   try {
      const shop = await Shop.findOne({
         where: {uuid: shopUuid},
      })

      const newBouquet = await Bouquet.create({
         bouquet_name, shop_id: shop.id
      })

      return res.json(newBouquet)
   } catch(err) {
      console.log(err)
      res.status(500).json(err)
   }
})

app.get('/bouquets', async(req, res) => {
   try {
      const bouquets = await Bouquet.findAll({include: 'shop'})

      return res.json(bouquets)
   } catch(err) {
      console.log(err)
      res.status(500).json(err)
   }
})

app.post('/flowers', async(req, res) => {
   const {flower_name} = req.body
   try {
      const newFlower = await Flower.create({
         flower_name
      })

      return res.json(newFlower)
   } catch(err) {
      console.log(err)
      res.status(500).json(err)
   }
})

app.post('/flowertobouquet', async(req, res) => {
   const {flowerUuid, bouquetUuid} = req.body
   try {
      const bouquet = await Bouquet.findOne({
         where: {uuid: bouquetUuid},
      })
   
      const flower = await Flower.findOne({
         where: {uuid: flowerUuid},
      })
   
      await flower.addBouquet(bouquet.id)
   
      const flowerInBouquet = await Flower.findOne({
         uuid: flower.uuid,
         include: 'bouquets'
      })
      
      return res.json(flowerInBouquet)
   } catch (err) {
      console.log(err)
      res.status(500).json(err)
   }

})

app.listen(3000, async () => {
   console.log('server started')
   await sequelize.authenticate()
})
